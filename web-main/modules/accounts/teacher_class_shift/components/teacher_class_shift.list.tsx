"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import type { MenuProps, TableProps } from "antd";
import { Button, Dropdown, Input, Popconfirm, Table } from "antd";
import "@ant-design/v5-patch-for-react-19";
import { TeacherClassShift } from "../teacher_class_shift.model";
import useTeacherClassShiftService from "../teacher_class_shift.service";
import { enumToTextValueArray, getEnumName } from "@/utils/object";
import { formatTo12Hour, toDateAndTime } from "@/utils/timeUtils";
import Link from "next/link";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { ColumnsType, TableParams } from "@/utils/table/table.model";
import { getRequestParams } from "@/utils/table/table.utils";
import { IoMdMore } from "react-icons/io";
import { Days } from "../../student/student.enum";
import ClassRoomSearchInput from "@/modules/organization/class_room/components/class_room.search";
import InstitutionSearchInput from "@/modules/organization/institution/components/institution.search";
import TeacherSearchInput from "../../teacher/components/teacher.search";
import ClassRoomShiftSearchInput from "@/modules/organization/class_room_shift/components/class_room_shift.search";
import { Navigations } from "@/utils/common_models/commons.model";
import { TableRowSelection } from "antd/es/table/interface";

interface TeacherClassShifListProps extends Partial<TeacherClassShift>, Navigations {
  active?: boolean
  has_action?: boolean;
}

const TeacherClassShiftList: React.FC<TeacherClassShifListProps> = ({has_action=true, ...props}) => {
  const [data, setData] = useState<TeacherClassShift[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
    sorter: [],
  });

  const service = useTeacherClassShiftService();
  const requestParams = useMemo(() => getRequestParams({ ...tableParams, searchText, ...props  }), [tableParams, searchText]);

  const fetchData = useCallback(() => {
    setLoading(true);
    service.getTeacherClassShifts(requestParams)
      .then((res) => {
        setData(res?.data?.results);
        const newTotal = res?.data?.count;
        setTableParams((prev) => {
          if (prev.pagination?.total === newTotal) return prev;
          return { ...prev, pagination: { ...prev.pagination, total: newTotal } };
        });
      })
      .finally(() => setLoading(false));
  }, [requestParams]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if(props.active){
      fetchData()
    }
  }, 
  [props.active])

  const handleDelete = useCallback((id: string) => {
    service.deleteTeacherClassShift(id).then(() => fetchData());
  }, []);

  const getMenuItems = useCallback((item: TeacherClassShift): MenuProps["items"] => [
    {
      label: <Link className="flex gap-0.5 items-baseline"  href={`/admin/accounts/teacher_class_shifts/${item.id}/edit`}><FaEdit />Edit</Link>,
      key: "edit",
    },
    {
      label: (
        <Popconfirm title="Are you sure to delete?" onConfirm={() => handleDelete(item.id)}>
          <div className="flex gap-0.5 items-baseline cursor-pointer"><FaTrash style={{ color: "red" }} />Delete</div>
        </Popconfirm>
      ),
      key: "delete",
    },
  ], [handleDelete]);

  const columns: ColumnsType<TeacherClassShift> = useMemo(() => [
        {
        key: "teacher",
        title: "Teacher",
        dataIndex: "teacher",
        render: (_, row) => row.teacher_detail.user_detail.full_name,
        filterDropdown: ({ setSelectedKeys, confirm }) => (
          <div style={{ padding: 8 }}>
            <TeacherSearchInput
              onChange={(value) => {
                setSelectedKeys(value ? [value] : []);
                confirm();
              }}
              style={{ width: 200 }}
              allowClear
            />
          </div>
        ),
        sorter: { multiple: 1 },
        },

        {
        key: "institution",
        title: "Institution",
        dataIndex: "institution",
        render: (_, row) => row.institution_detail.name,
        filterDropdown: ({ setSelectedKeys, confirm }) => (
          <div style={{ padding: 8 }}>
            <InstitutionSearchInput
              onChange={(value) => {
                setSelectedKeys(value ? [value] : []);
                confirm();
              }}
              style={{ width: 200 }}
              allowClear
            />
          </div>
        ),
        sorter: { multiple: 1 },
        },

        {
        key: "class_room",
        title: "Class Room",
        dataIndex: "class_room",
        render: (_, row) => row.class_room_detail.name,
        sorter: { multiple: 1 },
        filterDropdown: ({ setSelectedKeys, confirm }) => (
          <div style={{ padding: 8 }}>
            <ClassRoomSearchInput
              onChange={(value) => {
                setSelectedKeys(value ? [value] : []);
                confirm();
              }}
              style={{ width: 200 }}
              allowClear
            />
          </div>
        ),
        },

        {
        key: "class_room_shift",
        title: "Class Room Shift",
        dataIndex: "class_room_shift",
        render: (_, row) => `${row.class_room_shift_detail.package_detail.name} - ${getEnumName(Days, row.class_room_shift_detail.shift_days)} (${formatTo12Hour(row.class_room_shift_detail.start_time)} - ${formatTo12Hour(row.class_room_shift_detail.end_time)})`,
        sorter: { multiple: 1 },
        filterDropdown: ({ setSelectedKeys, confirm }) => (
          <div style={{ padding: 8 }}>
            <ClassRoomShiftSearchInput
              onChange={(value) => {
                setSelectedKeys(value ? [value] : []);
                confirm();
              }}
              style={{ width: 200 }}
              allowClear
            />
          </div>
        ),
        },

        {
        key: "create_date",
        title: "Create Date",
        dataIndex: "create_date",
        render: (_, row) => toDateAndTime(row.create_date),
        sorter: { multiple: 1 },
        },

        {
        key: "update_date",
        title: "Update Date",
        dataIndex: "update_date",
        render: (_, row) => toDateAndTime(row.update_date),
        sorter: { multiple: 1 },
        },

    
  ], [getMenuItems]);

  useEffect(() => {
      if(has_action){
    columns.push({
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Dropdown menu={{ items: getMenuItems(record) }} trigger={["click"]}>
          <Button icon={<IoMdMore />} />
        </Dropdown>
      ),
    },)
  }
  }, [])

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

 const handleMultipleDelete = () => {
    selectedRowKeys.forEach(selectedRowKey => {
      handleDelete(selectedRowKey as string)
setSelectedRowKeys([])
    })
  }

const rowSelection: TableRowSelection<TeacherClassShift> = {

    selectedRowKeys,    
onChange: onSelectChange,
selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE],
  };

  const handleTableChange: TableProps<TeacherClassShift>["onChange"] = (pagination, filters, sorter) => {
    setTableParams({ pagination, filters, sorter });
  };

  const handleSearch = useCallback((value: string) => {
    setSearchText(value);
    setTableParams((prev) => ({
      ...prev,
      pagination: { ...prev.pagination, current: 1 },
    }));
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full flex justify-between">
        <Input.Search placeholder="Search..." enterButton className="max-w-sm" onSearch={handleSearch} />
        {has_action && <Button href={`/admin/accounts/teacher_class_shifts/create`} type="primary" icon={<FaPlus />}>Add</Button>}
      </div>
      <div>{selectedRowKeys.length > 0 && (
        <Popconfirm
          title="Are you sure to delete selected?"
          onConfirm={handleMultipleDelete}
          okText="Yes"
          cancelText="No"
          className="w-fit"
        >
          <div className="flex gap-1 items-center text-red-600 cursor-pointer border px-2 py-1 hover:text-white hover:bg-red-600 rounded-sm">
            <FaTrash className="mr-2" />
            <span>Delete</span>
          </div>
        </Popconfirm>
      )}</div>
<Table
        scroll={{x: 'max-content'}}
        columns={columns}
        rowKey={record => record.id}
        dataSource={data}
        pagination={tableParams.pagination}
rowSelection={rowSelection}
        loading={loading}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default TeacherClassShiftList;
