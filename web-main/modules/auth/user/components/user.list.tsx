"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import type { MenuProps, TableProps } from "antd";
import { Button, Dropdown, Input, Popconfirm, Table } from "antd";
import type { FilterValue, SorterResult, TablePaginationConfig, TableRowSelection } from "antd/es/table/interface";
import "@ant-design/v5-patch-for-react-19";
import { User } from "../user.model";
import useUserService from "../user.service";
import { UserType } from "../user.enum";
import { enumToTextValueArray, getEnumName } from "@/utils/object";
import { toDateAndTime } from "@/utils/timeUtils";
import Link from "next/link";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import UserSearchInput from "./user.search";
import { ColumnsType, TableParams } from "@/utils/table/table.model";
import { getRequestParams } from "@/utils/table/table.utils";
import { IoMdMore } from "react-icons/io";

const UserList: React.FC = () => {
  const [data, setData] = useState<User[]>([]);
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

  const userService = useUserService();

  const requestParams = useMemo(
    () => getRequestParams({ ...tableParams, searchText }),
    [tableParams, searchText]
  );

  const fetchData = useCallback(() => {
    setLoading(true);
    userService
      .getUsers(requestParams)
      .then((res) => {
        setData(res?.data?.results);
        const newTotal = res?.data?.count;

        setTableParams((prev) => {
          if (prev.pagination?.total === newTotal) return prev;
          return {
            ...prev,
            pagination: {
              ...prev.pagination,
              total: newTotal,
            },
          };
        });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [requestParams]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        await userService.deleteUser(id);
        fetchData();
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    },
    []
  );

  const getMenuItems = useCallback(
    (user: User): MenuProps["items"] => [
      {
        label: (
          <Link
            className="flex gap-0.5 items-baseline"
            href={`/admin/users/${user.id}/edit`}
          >
            <FaEdit />
            Edit
          </Link>
        ),
        key: "edit",
      },
      {
        label: (
          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => handleDelete(user.id)}
            okText="Yes"
            cancelText="No"
          >
            <div className="flex gap-0.5 items-baseline cursor-pointer">
              <FaTrash style={{ marginRight: 8, color: "red" }} />
              Delete
            </div>
          </Popconfirm>
        ),
        key: "delete",
      },
    ],
    [handleDelete]
  );

  const columns: ColumnsType<User> = useMemo(
    () => [
      {
        key: "username",
        title: "Username",
        dataIndex: "username",
        sorter: { multiple: 1 },
        render: (_, { id, username }) => <Link href={`/admin/users/${id}`}>{username}</Link>,
      },
      {
        key: "first_name",
        title: "First Name",
        dataIndex: "first_name",
        sorter: { multiple: 2 },
      },
      {
        key: "middle_name",
        title: "Middle Name",
        dataIndex: "middle_name",
        sorter: { multiple: 3 },
      },
      {
        key: "last_name",
        title: "Last Name",
        dataIndex: "last_name",
        sorter: { multiple: 4 },
      },
      {
        key: "email",
        title: "Email",
        dataIndex: "email",
        sorter: { multiple: 5 },
      },
      {
        key: "date_joined",
        title: "Date Joined",
        dataIndex: "date_joined",
        render: (_, { date_joined }) => toDateAndTime(date_joined),
        sorter: { multiple: 6 },
      },
      {
        key: "last_login",
        title: "Last Login",
        dataIndex: "last_login",
        render: (_, { last_login }) => toDateAndTime(last_login),
        sorter: { multiple: 7 },
        filterDropdown: ({ setSelectedKeys, confirm }) => (
          <div style={{ padding: 8 }}>
            <UserSearchInput
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
        key: "user_type",
        title: "User Type",
        dataIndex: "user_type",
        render: (_, { user_type }) => getEnumName(UserType, user_type),
        sorter: { multiple: 8 },
        filters: enumToTextValueArray(UserType),
        filterMode: "menu",
      },
      {
        title: "Actions",
        key: "actions",
        render: (_text, record) => (
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

const rowSelection: TableRowSelection<User> = {

    selectedRowKeys,    
onChange: onSelectChange,
selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE],
  };

  const handleTableChange: TableProps<User>["onChange"] = useCallback(
  (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<User> | SorterResult<User>[]
  ) => {
    setTableParams((prev) => ({
      ...prev,
      pagination,
      filters,
      sorter,
    }));
  },
  []
);

  const handleSearch = useCallback((value: string) => {
    setSearchText(value);
    setTableParams((prev) => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        current: 1,
      },
    }));
  }, []);

  const handleMultipleDelete = () => {
    selectedRowKeys.forEach(selectedRowKey => {
      handleDelete(selectedRowKey as string)
setSelectedRowKeys([])
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full flex justify-between">
        <Input.Search
          placeholder="Search by..."
          enterButton
          className="max-w-sm"
          onSearch={handleSearch}
        />
        <Button href={`/admin/users/create`} type="primary" icon={<FaPlus />}>
          Add
        </Button>
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
      <Table<User>
        scroll={{x: 'max-content'}}
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

export default UserList;
