import {
	areAllValuesInArray,
	checkIfValueExistInArray,
	checkIfValueExistsInArray,
	deleteValueFromArray,
	getByKey,
} from "@/utils/array";
import {
	DownOutlined,
	UpOutlined,
} from "@ant-design/icons";
import {
	Card,
	Checkbox,
	Dropdown,
	Space,
	Table,
	TableProps,
} from "antd";
import { AnyObject } from "antd/es/_util/type";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { ReactNode, useEffect, useState } from "react";
import { EditableRow } from "./EditableRow";
import { EditableCell } from "./EditableCell";

type ExtendedObject<T> = {
	header: keyof T;
	editable?: boolean;
	updateRowSelected?: (row: React.Key[]) => void;
};

type ExtendedTableProps<T> = TableProps<T> & ExtendedObject<T>;

const CustomTable = <T extends AnyObject = AnyObject>(
	props: ExtendedTableProps<T>
) => {
	const components = {
		body: {
		  row: EditableRow,
		  cell: EditableCell,
		},
	  };
	const excludeContent = ["action", props.header];
	const [cards, setCards] = useState<ReactNode[] | undefined>([]);
	const [expandedIndex, setExpandedIndex] = useState<number>();

	const buildInSelection = {
		SELECTION_ALL: {
			key: "SELECTION_ALL",
			label: "Select all data",
			text: "Select all data",
			onSelect: () => selectAll(),
		},
		SELECTION_INVERT: {
			key: "SELECTION_INVERT",
			text: "Invert current page",
			label: "Invert current page",
			onSelect: () => invertSelection(),
		},
		SELECTION_NONE: {
			key: "SELECTION_NONE",
			text: "Clear all data",
			label: "Clear all data",
			onSelect: () => clearData(),
		},
	};

	const statusItems = props.rowSelection
		? (props.rowSelection?.selections as [])?.map((val: any) => {
				if (val == "SELECT_ALL") {
					return buildInSelection["SELECTION_ALL"];
				} else if (val == "SELECT_INVERT") {
					return buildInSelection["SELECTION_INVERT"];
				} else if (val == "SELECT_NONE") {
					return buildInSelection["SELECTION_NONE"];
				} else {
					return { ...val, label: val.text };
				}
		  })
		: [];

	const selectAll = () => {
		const selection = props.dataSource?.map((data) => data.id);
		props.dataSource &&
			props.updateRowSelected &&
			props.updateRowSelected(selection as []);
	};

	const clearData = () => {
		props.updateRowSelected && props.updateRowSelected([]);
	};

	const invertSelection = () => {
		const dataSource = props.dataSource?.map((val) => val.id);
		const selection = dataSource?.filter(
			(data) =>
				!checkIfValueExistInArray(props.rowSelection?.selectedRowKeys, data)
		);
		selection != undefined &&
			props.updateRowSelected &&
			props.updateRowSelected(selection);
	};

	const handleMenuClick = (key: string) => {
		const menu = statusItems.find((item) => item?.key == key);
		menu?.onSelect && menu.onSelect();
	};

	const handleMenuCheckbox = (event: CheckboxChangeEvent) => {
		if (event.target.checked) {
			selectAll();
		} else {
			clearData();
		}
	};

	const handleCheckBoxChange = (event: CheckboxChangeEvent, value: T) => {
		event.preventDefault();
		const selections = props.rowSelection?.selectedRowKeys || [];
		const val = value[props.rowKey as string];

		if (event.target.checked && props.updateRowSelected) {
			selections?.push(val);
			props.updateRowSelected([...selections]);
		} else if (props.updateRowSelected) {
			props.updateRowSelected(deleteValueFromArray(selections, val));
		}
	};

	const renderChild = (record: T, index: number) => {
		return props.expandable?.expandedRowRender!(record, index, 10, true);
	};

	const card = () => {
		return props.dataSource?.map((value, idx) => {
			const action = props.columns && getByKey(props.columns, "key", "action");
			const title =
				props.columns && getByKey(props.columns, "key", props.header);
			const isChecked = checkIfValueExistInArray(
				props.rowSelection?.selectedRowKeys || [],
				value[props.rowKey as string]
			);

			const ren = (
				action?.render ? action.render(value, value, idx) : <></>
			) as ReactNode;
			const titleRen = (
				title?.render ? title.render(value, value, idx) : <></>
			) as ReactNode;

			const header = (
				<div className="flex items-center">
					{props.updateRowSelected && (
						<Checkbox
							className="mr-2"
							onChange={(e) => handleCheckBoxChange(e, value)}
							checked={isChecked}
							key={idx}
						></Checkbox>
					)}
					{titleRen}
				</div>
			);
			return (
				<Card
					key={idx}
					size="small"
					styles={{header: {border: 'none'}}}
					title={header}
					className={`card-table shadow-xl ${props.expandable?.expandedRowRender ? 'pt-3' : 'py-3'}`}
					extra={ren}
					actions={props.expandable?.expandedRowRender && [
						expandedIndex == idx ? (
							<UpOutlined
								key="setting"
								onClick={(e) => setExpandedIndex(undefined)}
							/>
						) : (
							<DownOutlined
								key="setting"
								onClick={(e) => setExpandedIndex(idx)}
							/>
						),
					]}
				>
					{expandedIndex == idx && <div className="ml-8">{renderChild(value, idx)}</div>}
				</Card>
			);
		});
	};

	const cardContent = (data: T) => {
		return props.columns?.map((value, idx) => {
			if (!checkIfValueExistInArray(excludeContent, value.key as string)) {
				const ren = (
					value.render ? value.render(data[value.key! as string], data, idx) : <></>
				) as ReactNode;
				return (
					ren && (
						<div className="p-1" key={idx}>
							<p className="mb-0 ">{value.title as string}</p>
							<div className="pl-4 text-sm text-text-secondary dark:text-dark-text-secondary">{ren}</div>
						</div>
					)
				);
			}
		});
	};

	useEffect(() => {
		setCards(card());
	}, [props.dataSource, props.rowSelection?.selectedRowKeys, expandedIndex]);

	const modifiedColumns = () => {
		return props.columns?.map((col: any) => {
			if (!col.detail_input) {
			  return col;
			}
			return {
			  ...col,
			  onCell: (record: any) => ({
				record,
				...col
			  }),
			};
		  })
	}
	

	const modifiedProps = () => {
		return {
			...props,
			components: props.editable ? components : props.components,
			columns: props.editable ? modifiedColumns(): props.columns
		}
	}

	return (
		<>
			<Table
  className="hidden md:block" {...modifiedProps()} />
			<div className="md:hidden">
				{!statusItems?.length ? (
					""
				) : (
					<div>
						<Checkbox
							className="ml-2"
							onChange={(e) => handleMenuCheckbox(e)}
							indeterminate={
								!areAllValuesInArray(
									props.dataSource as [],
									"id",
									props.rowSelection?.selectedRowKeys
								) &&
								checkIfValueExistsInArray(
									props.dataSource as [],
									"id",
									props.rowSelection?.selectedRowKeys
								)
							}
							checked={areAllValuesInArray(
								props.dataSource as [],
								"id",
								props.rowSelection?.selectedRowKeys
							)}
						></Checkbox>
						<Dropdown
							menu={{
								items: statusItems,
								onClick: (props) => handleMenuClick(props.key),
							}}
							key={"text"}
						>
							<a onClick={(e) => e.preventDefault()}>
								<Space>
									<DownOutlined />
								</Space>
							</a>
						</Dropdown>
					</div>
				)}
				{cards}
			</div>
		</>
	);
};

export default CustomTable;
