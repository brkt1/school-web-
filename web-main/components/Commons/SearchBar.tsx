import { SearchComponentProps } from "@/hooks/search";
import useScreenSize from "@/hooks/useScreenSize";
import { toggleList } from "@/utils/array";
import { componentType } from "@/utils/common_models/commons.model";
import { FilterOutlined, SearchOutlined } from "@ant-design/icons";
import { Card, DatePicker, Dropdown, MenuProps, Switch } from "antd";
import React, { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import FloatInput from "./FloatInput";
import TextSearch from "./TextSearch";
import { cn } from "@/utils/cn";
import { FloatSelect } from "./FloatLabel/component/FloatSelect";
import { FloatDatePicker } from "./FloatLabel/component/FloatDatePicker";
type propsType = {
	components: SearchComponentProps[];
	filteredData: any;
	handleChange: (key: any, value: any) => void;
	className?: string
};

const SearchBar = (props: propsType) => {
	const {isMobile} = useScreenSize();

	const addTextComponent = (prop: SearchComponentProps) => {
		return (
				<TextSearch prop_key={prop.key} {...prop} handleChange={props.handleChange}/>
		);
	};

	const addDatePicker = (prop: SearchComponentProps) => {
		return <FloatDatePicker className="p-3 w-full sm:w-60" key={prop.key} placeholder={prop.placeholder} onChange={(e) => props.handleChange(prop.key, e?.toDate().toISOString().split("T")[0])}  format="MMM DD YYYY" />
	}

	const addSearchInput = (prop: SearchComponentProps) => {
		return <FloatSelect
							key={prop.key}
							className="flex items-center bg-gray-F7 w-full sm:w-60 min-w-60"
							placeholder={prop.placeholder}
							options={prop.options}
							allowClear={!prop.disableClear}
							onClear={() => props.handleChange(prop.key, undefined)}
							value={props.filteredData[prop.key]}
							showSearch
							onSearch={prop.search}
							onFocus={() => prop.search!("")}
							onSelect={(e) => props.handleChange(prop.key, e)}
						/>
	}

	const addToggleInput = (prop: SearchComponentProps) => {
		return <div className="flex gap-1 items-center border-solid border-gray-300 border-2  rounded-md p-1 " key={prop.key}>
				<Switch 
					checkedChildren="Yes"
					unCheckedChildren="No"
					
					onChange={(e) => props.handleChange(prop.key, e)}
				/>
				<div className="text-text-secondary dark:text-dark-text-secondary">{prop.placeholder}</div>
			</div>
	}

	const addDropDownInput = (prop: SearchComponentProps) => {
		return <FloatSelect
							key={prop.key}
							className="flex items-center bg-gray-F7 w-full sm:w-60 min-w-60"
							placeholder={prop.placeholder}
							onClear={() => props.handleChange(prop.key, undefined)}
							options={prop.options}
							allowClear={!prop.disableClear}
							value={props.filteredData[prop.key]}
							onSelect={(e) => props.handleChange(prop.key, e)}
						/>
	}

	const compFunction = {
		[componentType.TEXT]: addTextComponent,
		[componentType.DROPDOWN]: addDropDownInput,
		[componentType.DATE]: addDatePicker,
		[componentType.SEARCH]: addSearchInput,
		[componentType.TOGGLE]: addToggleInput,
	};

	const [elements, setElements] = useState<React.ReactNode[]>();	

	const [visibleComponents, setVisibleComponents] = useState([props.components?.[0].key])
	const [searchOptions, setSearchOptions] = useState<MenuProps["items"]>([]);


	const toggle = (key: string) => {
		setVisibleComponents(toggleList(visibleComponents, key))
	}

	const onClose = (key: string) => {
		toggle(key);
		props.handleChange(key, undefined);
	}

	const mobileView = (comp: SearchComponentProps) => (
			<div className="relative">
				<div className="w-[98%]">{compFunction[comp.type](comp)}</div>
				{comp.key != visibleComponents[0] && 
				<AiOutlineCloseCircle onClick={() => onClose(comp.key)}  className="w-5 h-5 absolute z-10 -top-2 right-0 text-red-700" />}
			</div>);
	
	const isVisible = (comp: SearchComponentProps) => visibleComponents.some(value => value == comp.key && !comp.hidden)
	
	const optionTemplate = (value: SearchComponentProps) => ({
		label:value.placeholder, 
		key: value.key, 
		onClick: () =>toggle(value.key)
	})

	const mobElements = () => {
		setSearchOptions(props.components.filter((comp) => !isVisible(comp))?.map(optionTemplate))
		return  props?.components.filter(isVisible)?.map(mobileView);
	}
	

	useEffect(() => {
		let els = isMobile ? mobElements() : props.components.filter(comp=> !comp.hidden)?.map((component, i) => compFunction[component.type]({...component}))	
		setElements(els);

	}, [props?.components, visibleComponents, isMobile]);


	return (
		<Card className={cn("flex mx-0 mb-2  gap-2 p-4 rounded-lg mt-4", props.className)}>
			<div className="flex flex-col justify-start sm:flex-row gap-4 items-stretch ">
				{elements}
			</div>
			{isMobile && searchOptions?.length != 0  ? <Dropdown className="boack self-end mb-3" menu={{items: searchOptions}} ><FilterOutlined className="scale-125  p-1 rounded-full" /></Dropdown> : <div className="w-6"></div> }
		</Card>	
	);
}

export default SearchBar;
