"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import type { MenuProps, TableProps } from "antd";
import { Button, Dropdown, Image, Input, Popconfirm, Table } from "antd";
import "@ant-design/v5-patch-for-react-19";
import { News } from "../news.model";
import useNewsService from "../news.service";
import { enumToTextValueArray, getEnumName } from "@/utils/object";
import { toDateAndTime } from "@/utils/timeUtils";
import Link from "next/link";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { ColumnsType, TableParams } from "@/utils/table/table.model";
import { getRequestParams } from "@/utils/table/table.utils";
import { IoMdMore } from "react-icons/io";
import { TableRowSelection } from "antd/es/table/interface";

const NewsList: React.FC = () => {
  const [data, setData] = useState<News[]>([]);
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

  const service = useNewsService();
  const requestParams = useMemo(() => getRequestParams({ ...tableParams, searchText }), [tableParams, searchText]);

  const fetchData = useCallback(() => {
    setLoading(true);
    service.getNewss(requestParams)
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
    service.deleteNews(id).then(() => fetchData());
  }, []);

  const getMenuItems = useCallback((item: News): MenuProps["items"] => [
    {
      label: <Link className="flex gap-0.5 items-baseline"  href={`/admin/engagement/newss/${item.id}/edit`}><FaEdit />Edit</Link>,
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

  const columns: ColumnsType<News> = useMemo(() => [

        
       {
        key: "image",
        title: "Image",
        dataIndex: "image",
        render: (_, row) => <Image height={50} src={row.image} />,
        sorter: { multiple: 1 },
        },
        {
        key: "title",
        title: "Title",
        dataIndex: "title",
        render: (_, row) => <Link href={`/admin/engagement/newss/${row.id}`}>{row.title}</Link>,
        sorter: { multiple: 1 },
        },

        // {
        // key: "main_content",
        // title: "Main Content",
        // dataIndex: "main_content",
        // sorter: { multiple: 1 },
        // },

 

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

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

 const handleMultipleDelete = () => {
    selectedRowKeys.forEach(selectedRowKey => {
      handleDelete(selectedRowKey as string)
setSelectedRowKeys([])
    })
  }

const rowSelection: TableRowSelection<News> = {

    selectedRowKeys,    
onChange: onSelectChange,
selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE],
  };

  const handleTableChange: TableProps<News>["onChange"] = (pagination, filters, sorter) => {
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
        <Button href={`/admin/engagement/newss/create`} type="primary" icon={<FaPlus />}>Add</Button>
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

export default NewsList;
