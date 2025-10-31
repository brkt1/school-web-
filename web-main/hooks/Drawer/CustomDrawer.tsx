import { Drawer } from "antd";
import { ReactElement } from "react";

interface InputProps {
    width: number;
    open: boolean;
    closable: boolean;
    handleClosable: (value: boolean) => void
    handleClose: () => void
    children?: ReactElement
}

export function CustomDrawer (props: InputProps) {
    
    return (
		<Drawer
			width={props.width}
			onClose={props.handleClose}
			open={props.open}
			closable={false}
			
			className="p-0"
			destroyOnClose
		>
			{props.children}
		</Drawer>
	);
}