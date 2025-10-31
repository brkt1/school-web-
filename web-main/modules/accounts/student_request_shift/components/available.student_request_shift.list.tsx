"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import type { TableProps } from "antd";
import { Button, Input, Popconfirm, Table } from "antd";
import "@ant-design/v5-patch-for-react-19";
import { enumToTextValueArray, getEnumName } from "@/utils/object";
import { formatTo12Hour, toDateAndTime } from "@/utils/timeUtils";
import { FaTrash } from "react-icons/fa";
import { ColumnsType, TableParams } from "@/utils/table/table.model";
import { getRequestParams } from "@/utils/table/table.utils";
import { Navigations } from "@/utils/common_models/commons.model";
import UserSearchInput from "@/modules/auth/user/components/user.search";
import { Days } from "../../student/student.enum";
import { ClassRoomShift } from "@/modules/organization/class_room_shift/class_room_shift.model";
import useStudentService from "../../student/student.service";
import ClassRoomSearchInput from "@/modules/organization/class_room/components/class_room.search";
import InstitutionSearchInput from "@/modules/organization/institution/components/institution.search";
import useStudentClassShiftService from "../../student_class_shift/student_class_shift.service";
import { StudentClassShift } from "../../student_class_shift/student_class_shift.model";
import PackageSearchInput from "@/modules/lookup/package/components/package.search";
import { TableRowSelection } from "antd/es/table/interface";

interface AvailableStudentRequestShiftListProps extends Partial<ClassRoomShift>, Navigations {
  student: string
  active?: boolean
}

const AvailableStudentRequestShiftList: React.FC<AvailableStudentRequestShiftListProps> = (props) => {
  const [data, setData] = useState<ClassRoomShift[]>([]);
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

  const service = useStudentService();
  const studentclassshiftService = useStudentClassShiftService()
  const requestParams = useMemo(() => getRequestParams({ ...tableParams, searchText, ...props }), [tableParams, searchText]);

  const fetchData = useCallback(() => {
    setLoading(true);
    service.getStudentAvailableShifts(props.student)
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
    if (props.active) {
      fetchData()
    }
  },
    [props.active])

  const assignClass = (class_room_shift: ClassRoomShift) => {
    setLoading(true)
    studentclassshiftService.addStudentClassShift({ ...class_room_shift, student: props.student, institution: class_room_shift.class_room_detail.institution, class_room_shift: class_room_shift.id } as unknown as StudentClassShift)
      .then((value) => {
        fetchData()
      })
  }


  const columns: ColumnsType<ClassRoomShift> = useMemo(() => [
    {
      key: "class_room__institution",
      title: "Institution",
      dataIndex: "class_room__institution",
      render: (_, row) => row.class_room_detail.institution_detail.name,
      sorter: { multiple: 1 },
      filterDropdown: ({ setSelectedKeys, confirm }) => (
        <div style={{ padding: 8 }}>
          <InstitutionSearchInput
            defaultOpen
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
      key: "class_room",
      title: "Class Room",
      dataIndex: "class_room",
      render: (_, row) => row.class_room_detail.name,
      sorter: { multiple: 1 },
      filterDropdown: ({ setSelectedKeys, confirm }) => (
        <div style={{ padding: 8 }}>
          <ClassRoomSearchInput
            defaultOpen
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
      key: "shift_days",
      title: "Shift Days",
      dataIndex: "shift_days",
      render: (_, row) => getEnumName(Days, row.shift_days),
      sorter: { multiple: 1 },
      filters: enumToTextValueArray(Days),
    },
    {
      key: "package",
      title: "Package",
      dataIndex: "package",
      render: (_, row) => row.package_detail.name,
      sorter: { multiple: 1 },
      filterDropdown: ({ setSelectedKeys, confirm }) => (
        <div style={{ padding: 8 }}>
          <PackageSearchInput
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
      key: "start_time",
      title: "Start Time",
      dataIndex: "start_time",
      render: (_, row) => formatTo12Hour(row.start_time),
      sorter: { multiple: 1 },
    },

    {
      key: "end_time",
      title: "End Time",
      dataIndex: "end_time",
      render: (_, row) => formatTo12Hour(row.end_time),
      sorter: { multiple: 1 },
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

    {
      key: "created_by",
      title: "Created By",
      dataIndex: "created_by",
      render: (_, row) => row.created_by_detail?.full_name,
      filterDropdown: ({ setSelectedKeys, confirm }) => (
        <div style={{ padding: 8 }}>
          <UserSearchInput
            defaultOpen
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
      key: "updated_by",
      title: "Updated By",
      dataIndex: "updated_by",
      render: (_, row) => row.updated_by_detail?.full_name,
      filterDropdown: ({ setSelectedKeys, confirm }) => (
        <div style={{ padding: 8 }}>
          <UserSearchInput
            defaultOpen
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
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button type="primary" onClick={() => assignClass(record)}>Assign</Button>
      ),
    },
  ], []);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleMultipleDelete = () => {
    selectedRowKeys.forEach(selectedRowKey => {
      // handleDelete(selectedRowKey as string)
      setSelectedRowKeys([])
    })
  }

  const rowSelection: TableRowSelection<ClassRoomShift> = {

    selectedRowKeys,
    onChange: onSelectChange,
    selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE],
  };

  const handleTableChange: TableProps<ClassRoomShift>["onChange"] = (pagination, filters, sorter) => {
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
        {/* <Button href={props.add_navigation || `/admin/accounts/student_request_shifts/create`} type="primary" icon={<FaPlus />}>Add</Button> */}
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
        scroll={{ x: 'max-content' }}
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

export default AvailableStudentRequestShiftList;
