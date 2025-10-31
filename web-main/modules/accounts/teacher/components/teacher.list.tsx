"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import type { MenuProps, TableProps } from "antd";
import { Button, Dropdown, Input, Popconfirm, Table } from "antd";
import "@ant-design/v5-patch-for-react-19";
import { Teacher } from "../teacher.model";
import useTeacherService from "../teacher.service";
import { enumToTextValueArray, getEnumName } from "@/utils/object";
import { toDateAndTime } from "@/utils/timeUtils";
import Link from "next/link";
import { FaEdit, FaPlus, FaTimes, FaTrash } from "react-icons/fa";
import { ColumnsType, TableParams } from "@/utils/table/table.model";
import { getRequestParams } from "@/utils/table/table.utils";
import { IoMdMore } from "react-icons/io";
import { ClassLevel, PaymentStatus, TeacherType } from "../../student/student.enum";
import InstitutionSearchInput from "@/modules/organization/institution/components/institution.search";
import RegionSearchInput from "@/modules/organization/region/components/region.search";
import CitySearchInput from "@/modules/organization/city/components/city.search";
import { TeacherRequestStatus } from "../teacher.enum";
import { FaCheck } from "react-icons/fa6";
import { GenderType } from "@/modules/auth/user/user.enum";
import { User } from "@/modules/auth/user/user.model";
import { TableRowSelection } from "antd/es/table/interface";

const TeacherList: React.FC = () => {
  const [data, setData] = useState<Teacher[]>([]);
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

  const service = useTeacherService();
  const requestParams = useMemo(() => getRequestParams({ ...tableParams, searchText }), [tableParams, searchText]);

  const fetchData = useCallback(() => {
    setLoading(true);
    service.getTeachers(requestParams)
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

  const handleDelete = useCallback((id: string) => {
    service.deleteTeacher(id).then(() => fetchData());
  }, []);

  const handleApprove = useCallback((id: string) => {
    service.approveTeacher(id).then(() => fetchData());
  }, []);

  const handleReject = useCallback((id: string) => {
    service.rejectTeacher(id).then(() => fetchData());
  }, []);

  const getMenuItems = useCallback((item: Teacher): MenuProps["items"] => [
    {
      label: <Link className="flex gap-0.5 items-baseline"  href={`/admin/accounts/teachers/${item.id}/edit`}><FaEdit />Edit</Link>,
      key: "edit",
    },
    {
      label: (
        <Popconfirm title="Are you sure to accept?" onConfirm={() => handleApprove(item.id)}>
          <div className="flex gap-0.5 items-baseline cursor-pointer"><FaCheck style={{ color: "green" }} />Accept</div>
        </Popconfirm>
      ),
      key: "accept",
    },
    {
      label: (
        <Popconfirm title="Are you sure to reject?" onConfirm={() => handleReject(item.id)}>
          <div className="flex gap-0.5 items-baseline cursor-pointer"><FaTimes style={{ color: "red" }} />Reject</div>
        </Popconfirm>
      ),
      key: "reject",
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

  const columns: ColumnsType<Teacher> = useMemo(() => [

         {
        key: "user",
        title: "User",
        dataIndex: "user",
        render: (_, row) => <Link href={`/admin/accounts/teachers/${row.id}`}>{row.user_detail?.full_name}</Link>,
        sorter: { multiple: 1 },
      },

      {
        key: "gender",
        title: "Gender",
        dataIndex: "gender",
        render: (_, row) => getEnumName(GenderType, row.user_detail?.gender),
        sorter: { multiple: 1 },
      },

       {
        key: "phone_number",
        title: "Phone Number",
        dataIndex: "phone_number",
        render: (_, row) => row.user_detail?.phone_number as string,
        sorter: { multiple: 1 },
      },
        // {
        // key: "institution",
        // title: "Institution",
        // dataIndex: "institution",
        // render: (_, row) => row.institution_detail?.name,
        // filterDropdown: ({ setSelectedKeys, confirm }) => (
        //           <div style={{ padding: 8 }}>
        //             <InstitutionSearchInput
        //               onChange={(value) => {
        //                 setSelectedKeys(value ? [value] : []);
        //                 confirm();
        //               }}
        //               style={{ width: 200 }}
        //               allowClear
        //             />
        //           </div>
        //         ),
        // sorter: { multiple: 1 },
        // },
         {
        key: "email",
        title: "Email",
        dataIndex: "email",
        render: (_, row) => row.user_detail?.email,
        },

        {
        key: "level_of_teaching_detail",
        title: "Level of Teaching",
        dataIndex: "level_of_teaching_detail",
        render: (_, row) => row.level_of_teaching_detail?.name,
        sorter: { multiple: 1 },
        filters: enumToTextValueArray(ClassLevel),
        },
        {
          key: "cv",
          title: "CV",
          dataIndex: "cv",
          render: (_, row) => {return row?.cv && <Link target="_blank" href={row?.cv}>CV</Link>},
        },

        {
        key: "region",
        title: "Region",
        dataIndex: "region",
        render: (_, row) => row.region_detail.name,
        filterDropdown: ({ setSelectedKeys, confirm }) => (
                  <div style={{ padding: 8 }}>
                    <RegionSearchInput
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
        key: "city",
        title: "City",
        dataIndex: "city",
        render: (_, row) => row.city_detail.name,
        filterDropdown: ({ setSelectedKeys, confirm }) => (
                  <div style={{ padding: 8 }}>
                    <CitySearchInput
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

        // {
        // key: "teacher_type",
        // title: "Teacher Type",
        // dataIndex: "teacher_type",
        // render: (_, row) => getEnumName(TeacherType, row.teacher_type),
        // sorter: { multiple: 1 },
        // filters: enumToTextValueArray(TeacherType),
        // },
        {
        key: "request_status",
        title: "Request Status",
        dataIndex: "request_status",
        render: (_, row) => getEnumName(TeacherRequestStatus, row.request_status),
        sorter: { multiple: 1 },
        filters: enumToTextValueArray(TeacherRequestStatus),
        },
        {
        key: "application_fee",
        title: "Application Fee",
        dataIndex: "application_fee",
        render: (_, row) => getEnumName(PaymentStatus, row.application_fee_detail?.status),
        sorter: { multiple: 1 },
        filters: enumToTextValueArray(PaymentStatus),
        },
        //         {
        // key: "create_date",
        // title: "Create Date",
        // dataIndex: "create_date",
        // render: (_, row) => toDateAndTime(row.create_date),
        // sorter: { multiple: 1 },
        // },

        // {
        // key: "update_date",
        // title: "Update Date",
        // dataIndex: "update_date",
        // render: (_, row) => toDateAndTime(row.update_date),
        // sorter: { multiple: 1 },
        // },
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

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

 const handleMultipleDelete = () => {
    selectedRowKeys.forEach(selectedRowKey => {
      handleDelete(selectedRowKey as string)
setSelectedRowKeys([])
    })
  }

const rowSelection: TableRowSelection<Teacher> = {

    selectedRowKeys,    
onChange: onSelectChange,
selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE],
  };

  const handleTableChange: TableProps<Teacher>["onChange"] = (pagination, filters, sorter) => {
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
        <Button href={`/admin/accounts/teachers/create`} type="primary" icon={<FaPlus />}>Add</Button>
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

export default TeacherList;
