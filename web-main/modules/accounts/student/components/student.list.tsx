"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import type { MenuProps, TableProps } from "antd";
import { Button, Dropdown, Input, Popconfirm, Table } from "antd";
import "@ant-design/v5-patch-for-react-19";
import { Student } from "../student.model";
import useStudentService from "../student.service";
import { enumToTextValueArray, getEnumName } from "@/utils/object";
import { toDateAndTime } from "@/utils/timeUtils";
import Link from "next/link";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { ColumnsType, TableParams } from "@/utils/table/table.model";
import { getRequestParams } from "@/utils/table/table.utils";
import { IoMdMore } from "react-icons/io";
import { StudentType, PaymentStatus, ClassLevel, Shift } from "../student.enum";
import RegionSearchInput from "@/modules/organization/region/components/region.search";
import CitySearchInput from "@/modules/organization/city/components/city.search";
import InstitutionSearchInput from "@/modules/organization/institution/components/institution.search";
import { TableRowSelection } from "antd/es/table/interface";

const StudentList: React.FC = () => {
  const [data, setData] = useState<Student[]>([]);
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
  const requestParams = useMemo(
    () => getRequestParams({ ...tableParams, searchText }),
    [tableParams, searchText]
  );

  const fetchData = useCallback(() => {
    setLoading(true);
    service
      .getStudents(requestParams)
      .then((res) => {
        setData(res?.data?.results);
        const newTotal = res?.data?.count;
        setTableParams((prev) => {
          if (prev.pagination?.total === newTotal) return prev;
          return {
            ...prev,
            pagination: { ...prev.pagination, total: newTotal },
          };
        });
      })
      .finally(() => setLoading(false));
  }, [requestParams]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = useCallback((id: string) => {
    service.deleteStudent(id).then(() => fetchData());
  }, []);

  const getMenuItems = useCallback(
    (item: Student): MenuProps["items"] => [
      {
        label: (
          <Link href={`/admin/accounts/students/${item.id}/edit`}>
            <FaEdit />
            Edit
          </Link>
        ),
        key: "edit",
      },
      {
        label: (
          <Popconfirm
            title="Are you sure to delete?"
            onConfirm={() => handleDelete(item.id)}
          >
            <div className="flex gap-0.5 items-baseline cursor-pointer">
              <FaTrash style={{ color: "red" }} />
              Delete
            </div>
          </Popconfirm>
        ),
        key: "delete",
      },
    ],
    [handleDelete]
  );

  const columns: ColumnsType<Student> = useMemo(
    () => [
      {
        key: "user",
        title: "User",
        dataIndex: "user",
        render: (_, row) => <Link href={`/admin/accounts/students/${row.id}`}>{row.user_detail.full_name}</Link>,
        sorter: { multiple: 1 },
      },

      {
        key: "grade",
        title: "Grade",
        dataIndex: "grade",
        sorter: { multiple: 1 },
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

      {
        key: "woreda",
        title: "Woreda",
        dataIndex: "woreda",
        sorter: { multiple: 1 },
      },

      {
        key: "parents_phonenumber",
        title: "Parents Phonenumber",
        dataIndex: "parents_phonenumber",
        sorter: { multiple: 1 },
      },

      {
        key: "student_type",
        title: "Student Type",
        dataIndex: "student_type",
        render: (_, row) => getEnumName(StudentType, row.student_type),
        sorter: { multiple: 1 },
        filters: enumToTextValueArray(StudentType),
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
    ],
    [getMenuItems]
  );

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

 const handleMultipleDelete = () => {
    selectedRowKeys.forEach(selectedRowKey => {
      handleDelete(selectedRowKey as string)
setSelectedRowKeys([])
    })
  }

const rowSelection: TableRowSelection<Student> = {

    selectedRowKeys,    
onChange: onSelectChange,
selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE],
  };

  const handleTableChange: TableProps<Student>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
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
        <Input.Search
          placeholder="Search..."
          enterButton
          className="max-w-sm"
          onSearch={handleSearch}
        />
        <Button
          href={`/admin/accounts/students/create`}
          type="primary"
          icon={<FaPlus />}
        >
          Add
        </Button>
      </div>
      <Table
        scroll={{ x: "max-content" }}
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={data}
        pagination={tableParams.pagination}
rowSelection={rowSelection}
        loading={loading}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default StudentList;
