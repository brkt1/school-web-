import { Card } from "antd"
import { ReactNode } from "react";
import {CaretDownOutlined, CaretUpOutlined} from '@ant-design/icons'

interface DashboardCardProps {
    title: string
    value: string | number,
    icon: ReactNode,
    icon_color: string,
    icon_bg: string,
    change_in_percent?: number
    description?: string;
}

const DashboardCard = (props: DashboardCardProps) => {
    return <Card hoverable className="shadow-xl basis-80 p-3 flex flex-col gap-1 flex-1">
        <div className="text-lg">{props.title}</div>
        <div className="flex justify-between">
            <div className="text-2xl font-bold">{props.value}</div>
            <div className={`p-3 ${props.icon_bg} rounded-full w-12 h-12 flex items-center justify-center text-3xl ${props.icon_color}`}>{props.icon}</div>
        </div>
        {props.change_in_percent && <div className={`${props.change_in_percent < 0 ? 'text-red-7' :'text-green-7'}`}>
            <span>{props.change_in_percent ? <CaretDownOutlined />: <CaretUpOutlined />}</span> {props.change_in_percent}%
        </div>}
        {props.description && <div>{props.description}</div>}
  </Card>
}

export default DashboardCard;