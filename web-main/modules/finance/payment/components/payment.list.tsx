"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import type { MenuProps, TableProps } from "antd";
import { Button, Dropdown, Input, message, Popconfirm, Table } from "antd";
import "@ant-design/v5-patch-for-react-19";
import { Payment, PaymentSummary } from "../payment.model";
import usePaymentService from "../payment.service";
import { enumToTextValueArray, getEnumName } from "@/utils/object";
import { toDateAndTime } from "@/utils/timeUtils";
import Link from "next/link";
import { FaEdit, FaPlus, FaRedo, FaTrash } from "react-icons/fa";
import { ColumnsType, TableParams } from "@/utils/table/table.model";
import { getRequestParams } from "@/utils/table/table.utils";
import { IoMdMore } from "react-icons/io";
import { Navigations } from "@/utils/common_models/commons.model";
import StudentSearchInput from "@/modules/accounts/student/components/student.search";
import TeacherSearchInput from "@/modules/accounts/teacher/components/teacher.search";
import UserSearchInput from "@/modules/auth/user/components/user.search";
import { PaymentStatus } from "@/modules/accounts/student/student.enum";
import { PaymentPurpose } from "../../fee_package/fee_package.enum";
import { useRouter } from "next/navigation";
import { FaPrint } from "react-icons/fa6";
import { TableRowSelection } from "antd/es/table/interface";
import { DatePicker } from "antd";
import FeePackageSearchInput from "../../fee_package/components/fee_package.search";
import { Select } from "antd";

const { Option } = Select;
const { RangePicker } = DatePicker;

interface PaymentListProps extends Partial<Payment>, Navigations {

}

const groupOptions = [
  { label: "Date", value: "date" },
  { label: "Month", value: "month" },
  { label: "Year", value: "year" },
  { label: "Status", value: "status" },
  { label: "Fee Package", value: "fee_package" },
  { label: "Payment For", value: "payment_for" },
];

const PaymentList: React.FC<PaymentListProps> = (props) => {
  const router = useRouter();
  const [data, setData] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<PaymentSummary>();
  const [columnsResponse, setColumnsResponse] = useState<{ title: string, key: string }[]>();
  const [searchText, setSearchText] = useState("");
  const [groupBy, setGroupBy] = useState<string[] | undefined>(undefined);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
    sorter: [],
  });

  useEffect(() => {
    setTableParams((prev) => ({...prev, sorter: [], filters: undefined}))
  }, [groupBy])

  const service = usePaymentService();
  const requestParams = useMemo(() => getRequestParams({ ...tableParams, searchText, ...props, group_by: groupBy }), [tableParams, searchText, groupBy]);

  const fetchData = useCallback(() => {
    setLoading(true);
    service.getPayments(requestParams)
      .then((res) => {
        setData(res?.data?.results.results);
        setSummary(res?.data?.results?.totals)
        setColumnsResponse(res?.data?.results?.columns)
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
    service.deletePayment(id).then(() => fetchData());
  }, []);

  const retryPayment = useCallback((id: string) => {
    service.retryPayment(id).then((value) => {
      if (value.data.checkout_url) {
        router.push(value.data.checkout_url);
      } else {
        message.success("You have successfully applied");
      }
    });
  }, []);

  const receiptPrint = useCallback((id: string) => {
    service.getReceipt(id).then((value) => {

    })
  }, []);



  const getMenuItems = useCallback((item: Payment): MenuProps["items"] => [
    {
      label: (
        <Popconfirm title="Are you sure to retry?" onConfirm={() => retryPayment(item.id)}>
          <div className="flex gap-0.5 items-baseline cursor-pointer"><FaRedo style={{ color: "green" }} />Retry</div>
        </Popconfirm>
      ),
      key: "retry",
    },
  ], [retryPayment]);

  const formatTitle = (key?: string) => {
    switch (key) {
      case "status":
        return "Status";
      case "fee_package":
        return "Package";
      case "payment_for":
        return "Reason";
      case "date":
      case "month":
      case "year":
        return key.charAt(0).toUpperCase() + key.slice(1);
      default:
        return key && key.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase());
    }
  };

  const columns: ColumnsType<Payment> = useMemo(() => {
    const baseColumns: ColumnsType<Payment> = [
      { key: "amount", title: "Price", dataIndex: "amount", sorter: { multiple: 1 } },
      // { key: "tot_amount", title: "TOT", dataIndex: "tot_amount", sorter: { multiple: 1 } },
      { key: "vat_amount", title: "VAT", dataIndex: "vat_amount", sorter: { multiple: 1 } },
      { key: "total_amount", title: "Total", dataIndex: "total_amount", sorter: { multiple: 1 } },
    ];

    const groupColumns: ColumnsType<Payment> =
      columnsResponse?.map((col, index) => {
        if (col.key.startsWith("group_")) {
          const original = groupBy?.[parseInt(col.key.split("_")[1], 10)];
          return {
            key: col.key,
            dataIndex: col.key,
            title: formatTitle(original),
            sorter: { multiple: 1 },
            render: (value: any) => {
              if (!value) return "";

              switch (original) {
                case "year":
                  return new Date(value).getFullYear();

                case "month": {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
                  // → e.g. "Aug 2025"
                }

                case "date": {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" });
                  // → e.g. "08/24/2025"
                }

                default:
                  return value;
              }
            },
          };
        }
        else if (col.key == 'status') {
          return { key: "status", title: "Status", dataIndex: "status", render: (_, row) => getEnumName(PaymentStatus, row.status),
          sorter: { multiple: 1 }, filters: enumToTextValueArray(PaymentStatus), filterMode: "menu",
          };
        }
        else if (col.key == 'payment_for') {
          return { key: "payment_for", title: "Reason", dataIndex: "payment_for", render: (_, row) => getEnumName(PaymentPurpose, row.payment_for), sorter: { multiple: 1 }, filters: enumToTextValueArray(PaymentPurpose), filterMode: "menu", };
        }
        else if(col.key == 'fee_package'){
          return { key: "fee_package", title: "Package", dataIndex: "fee_package", render: (_, row) => row.fee_package_detail?.name,
        filterDropdown: ({ setSelectedKeys, confirm }) => (<div style={{ padding: 8 }}> <FeePackageSearchInput onChange={(value) => { setSelectedKeys(value ? [value] : []); confirm(); }} style={{ width: 200 }} allowClear /> </div>), sorter: { multiple: 1 },
       };
        }
        return { key: col.key, dataIndex: col.key, title: col.title, sorter: { multiple: 1 } };
      }) || [];

    if (groupBy != null && groupBy.length > 0) {
      return [...groupColumns];
    }

    return [
      { key: "ref_number", title: "Ref Number", dataIndex: "ref_number", sorter: { multiple: 1 } },
      { key: "user", title: "User", dataIndex: "user", render: (_, row) => row.user_detail?.full_name, filterDropdown: ({ setSelectedKeys, confirm }) => (<div style={{ padding: 8 }}> <UserSearchInput onChange={(value) => { setSelectedKeys(value ? [value] : []); confirm(); }} style={{ width: 200 }} allowClear /> </div>), sorter: { multiple: 1 }, },
      { key: "payment_for", title: "Reason", dataIndex: "payment_for", render: (_, row) => getEnumName(PaymentPurpose, row.payment_for), sorter: { multiple: 1 }, filters: enumToTextValueArray(PaymentPurpose), filterMode: "menu", },
      { key: "fee_package", title: "Package", dataIndex: "fee_package", render: (_, row) => row.fee_package_detail?.name,
        filterDropdown: ({ setSelectedKeys, confirm }) => (<div style={{ padding: 8 }}> <FeePackageSearchInput onChange={(value) => { setSelectedKeys(value ? [value] : []); confirm(); }} style={{ width: 200 }} allowClear /> </div>), sorter: { multiple: 1 },
       },
      ...baseColumns,
      { key: "invoice_no", title: "Invoice No", dataIndex: "invoice_no", sorter: { multiple: 1 } },
      { key: "payment_date", title: "Date", dataIndex: "payment_date", render: (_, row) => toDateAndTime(row.payment_date), sorter: { multiple: 1 } },
      { key: "status", title: "Status", dataIndex: "status", render: (_, row) => getEnumName(PaymentStatus, row.status),
        sorter: { multiple: 1 }, filters: enumToTextValueArray(PaymentStatus), filterMode: "menu",
       },
      {
        title: "Actions",
        key: "actions",
        render: (_, record) =>
          record.status === PaymentStatus.PAID ? (
            <Button type="link" target="_blank" href={record.receipt} icon={<FaPrint />}>
              Receipt
            </Button>
          ) : (
            <Button onClick={() => retryPayment(record.id)} icon={<FaRedo />}>
              Retry
            </Button>
          ),
      },
    ];
  }, [groupBy, columnsResponse, retryPayment]);


  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleMultipleDelete = () => {
    selectedRowKeys.forEach(selectedRowKey => {
      handleDelete(selectedRowKey as string)
      setSelectedRowKeys([])
    })
  }

  const rowSelection: TableRowSelection<Payment> = {

    selectedRowKeys,
    onChange: onSelectChange,
    selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE],
  };

  const handleTableChange: TableProps<Payment>["onChange"] = (pagination, filters, sorter) => {
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
        <div className="gap-x-3 flex">
          <Select
            mode="multiple"
            placeholder="Group By"
            style={{ minWidth: 200 }}
            value={groupBy}
            onChange={(values: string[]) => setGroupBy(values)}
          >
            {groupOptions.map((opt) => (
              <Option key={opt.value} value={opt.value}>
                {opt.label}
              </Option>
            ))}
          </Select>
          <Button
            type="primary"
            onClick={() => service.downloadPaymentsExcel(requestParams)}
          >
            Download Excel
          </Button>
        </div>
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
        summary={(pageData) => {
          return (
            <Table.Summary.Row>
              <Table.Summary.Cell key={""} index={0}></Table.Summary.Cell>
              {(columnsResponse || columns)?.map((col, idx) => {
                // First cell: show "Totals" label
                console.log(col)
                if (idx === 0) return (
                  <Table.Summary.Cell key={col.key} index={idx} className="font-bold">
                    Totals
                  </Table.Summary.Cell>
                );

                const numericKeys = ["sum_amount", "sum_vat", "sum_total_amount", "count",  "amount", "vat_amount", "total_amount"];
                if (numericKeys.includes(col?.key?.toString() || "")) {
                  return (
                    <Table.Summary.Cell key={col.key} index={idx}>
                      {summary?.[col?.key?.toString() || ""] ?? 0}
                    </Table.Summary.Cell>
                  );
                }

                return <Table.Summary.Cell key={col.key} index={idx}></Table.Summary.Cell>;
              })}
            </Table.Summary.Row>
          );
}}
      />
    </div>
  );
};

export default PaymentList;
