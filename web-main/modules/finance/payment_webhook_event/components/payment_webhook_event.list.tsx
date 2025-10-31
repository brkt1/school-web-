"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import type { MenuProps, TableProps } from "antd";
import { Button, Dropdown, Input, Popconfirm, Table } from "antd";
import "@ant-design/v5-patch-for-react-19";
import { PaymentWebhookEvent } from "../payment_webhook_event.model";
import usePaymentWebhookEventService from "../payment_webhook_event.service";
import { enumToTextValueArray, getEnumName } from "@/utils/object";
import { toDateAndTime } from "@/utils/timeUtils";
import Link from "next/link";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { ColumnsType, TableParams } from "@/utils/table/table.model";
import { getRequestParams } from "@/utils/table/table.utils";
import { IoMdMore } from "react-icons/io";
import { Navigations } from "@/utils/common_models/commons.model";
import PaymentSearchInput from "../../payment/components/payment.search";
import { TableRowSelection } from "antd/es/table/interface";

interface PaymentWebhookEventListProps extends Partial<PaymentWebhookEvent>, Navigations {

}

const PaymentWebhookEventList: React.FC<PaymentWebhookEventListProps> = (props) => {
  const [data, setData] = useState<PaymentWebhookEvent[]>([]);
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

  const service = usePaymentWebhookEventService();
  const requestParams = useMemo(() => getRequestParams({ ...tableParams, searchText, ...props }), [tableParams, searchText]);

  const fetchData = useCallback(() => {
    setLoading(true);
    service.getPaymentWebhookEvents(requestParams)
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
    service.deletePaymentWebhookEvent(id).then(() => fetchData());
  }, []);

  const getMenuItems = useCallback((item: PaymentWebhookEvent): MenuProps["items"] => [
    {
      label: <Link className="flex gap-0.5 items-baseline" href={`${props.list_navigation || "/admin/finance/payment_webhook_events"}/${item.id}/edit`}><FaEdit />Edit</Link>,
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

  const columns: ColumnsType<PaymentWebhookEvent> = useMemo(() => [

        {
        key: "payment",
        title: "Payment",
        dataIndex: "payment",
        render: (_, row) => row.payment_detail.ref_number,
        filterDropdown: ({setSelectedKeys, confirm }) => (
          <div style={{ padding: 8 }}>
            <PaymentSearchInput
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
        key: "event_type",
        title: "Event Type",
        dataIndex: "event_type",
        sorter: { multiple: 1 },
        },

        {
        key: "status",
        title: "Status",
        dataIndex: "status",
        sorter: { multiple: 1 },
        },

        {
        key: "payload",
        title: "Payload",
        dataIndex: "payload",
        sorter: { multiple: 1 },
        },

        {
        key: "received_at",
        title: "Received At",
        dataIndex: "received_at",
        render: (_, row) => toDateAndTime(row.received_at),
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

const rowSelection: TableRowSelection<PaymentWebhookEvent> = {

    selectedRowKeys,    
onChange: onSelectChange,
selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE],
  };

  const handleTableChange: TableProps<PaymentWebhookEvent>["onChange"] = (pagination, filters, sorter) => {
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
        <Button href={props.add_navigation || `/admin/finance/payment_webhook_events/create`} type="primary" icon={<FaPlus />}>Add</Button>
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

export default PaymentWebhookEventList;
