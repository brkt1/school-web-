"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import type { MenuProps, TableProps } from "antd";
import { Button, Dropdown, Input, Popconfirm, Table } from "antd";
import "@ant-design/v5-patch-for-react-19";
import { StudentClassShift } from "../student_class_shift.model";
import useStudentClassShiftService from "../student_class_shift.service";
import { enumToTextValueArray, getEnumName } from "@/utils/object";
import { toDateAndTime } from "@/utils/timeUtils";
import Link from "next/link";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { ColumnsType, TableParams } from "@/utils/table/table.model";
import { getRequestParams } from "@/utils/table/table.utils";
import { IoMdMore } from "react-icons/io";
import { Navigations } from "@/utils/common_models/commons.model";
import UserSearchInput from "@/modules/auth/user/components/user.search";
import StudentSearchInput from "../../student/components/student.search";
import ClassRoomSearchInput from "@/modules/organization/class_room/components/class_room.search";
import ClassRoomShiftSearchInput from "@/modules/organization/class_room_shift/components/class_room_shift.search";
import InstitutionSearchInput from "@/modules/organization/institution/components/institution.search";
import {StudentShiftStatus} from '../student_class_shift.enum';

interface StudentClassShiftListProps extends Partial<StudentClassShift>, Navigations {
  active?: boolean
  has_action?: boolean;
}

const StudentClassShiftList: React.FC<StudentClassShiftListProps> = ({has_action=true, ...props}) => {
  const [data, setData] = useState<StudentClassShift[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
    sorter: [],
  });

  const service = useStudentClassShiftService();
  const requestParams = useMemo(() => getRequestParams({ ...tableParams, searchText, ...props }), [tableParams, searchText]);

  const fetchData = useCallback(() => {
    setLoading(true);
    service.getStudentClassShifts(requestParams)
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
    service.deleteStudentClassShift(id).then(() => fetchData());
  }, []);

  const getMenuItems = useCallback((item: StudentClassShift): MenuProps["items"] => [
    {
      label: <Link className="flex gap-0.5 items-baseline" href={`${props.list_navigation || "/admin/accounts/student_class_shifts"}/${item.id}/edit`}><FaEdit />Edit</Link>,
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

  const columns: ColumnsType<StudentClassShift> = useMemo(() => [
        {
        key: "student",
        title: "Student",
        dataIndex: "student",
        render: (_, row) => row.student_detail.user_detail.full_name,
        filterDropdown: ({setSelectedKeys, confirm }) => (
          <div style={{ padding: 8 }}>
            <StudentSearchInput
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
        key: "institution",
        title: "Institution",
        dataIndex: "institution",
        render: (_, row) => row.institution_detail.name,
        filterDropdown: ({setSelectedKeys, confirm }) => (
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
        sorter: { multiple: 1 },
        },

        {
        key: "class_room",
        title: "Class Room",
        dataIndex: "class_room",
        render: (_, row) => row.class_room_detail.name,
        filterDropdown: ({setSelectedKeys, confirm }) => (
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
        sorter: { multiple: 1 },
        },

        {
        key: "class_room_shift",
        title: "Class Room Shift",
        dataIndex: "class_room_shift",
        render: (_, row) => row.class_room_shift_detail.class_room_detail.name,
        filterDropdown: ({setSelectedKeys, confirm }) => (
          <div style={{ padding: 8 }}>
            <ClassRoomShiftSearchInput
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
        key: "status",
        title: "Status",
        dataIndex: "status",
        render: (_, row) => getEnumName(StudentShiftStatus, row.status),
        sorter: { multiple: 1 },
        filters: enumToTextValueArray(StudentShiftStatus),
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
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Dropdown menu={{ items: getMenuItems(record) }} trigger={["click"]}>
          <Button icon={<IoMdMore />} />
        </Dropdown>
      ),
    },
  ], [getMenuItems]);

  //  useEffect(() => {
  //       if(has_action){
  //         columns.pop()
  //     columns.push({
  //       title: "Actions",
  //       key: "actions",
  //       render: (_, record) => (
  //         <Dropdown menu={{ items: getMenuItems(record) }} trigger={["click"]}>
  //           <Button icon={<IoMdMore />} />
  //         </Dropdown>
  //       ),
  //     },)
  //   }
  //   }, [])

  const handleTableChange: TableProps<StudentClassShift>["onChange"] = (pagination, filters, sorter) => {
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
        {has_action && <Button href={props.add_navigation || `/admin/accounts/student_class_shifts/create`} type="primary" icon={<FaPlus />}>Add</Button>}
      </div>
      <Table
        scroll={{x: 'max-content'}}
        columns={columns}
        rowKey={record => record.id}
        dataSource={data}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default StudentClassShiftList;
