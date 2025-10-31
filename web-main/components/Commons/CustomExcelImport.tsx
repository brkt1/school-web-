
import React, { useState } from "react";
import { Button, Upload, UploadProps, message } from "antd";
import { isVisible } from "@/utils/visibility";
import useAuthorization from "@/utils/authorization";
import { UploadOutlined } from "@ant-design/icons";
import { RcFile, UploadChangeParam, UploadFile } from "antd/es/upload";
import { AxiosResponse } from "axios";

interface excelProps {
    title:string;
    customRequest:(formData:FormData)=>Promise<AxiosResponse<any, any>>;
    permission:string
}

const CustomExcelImport = ({title, customRequest, permission}:excelProps) => {
	const [uploading, setUploading] = useState(false);

	const authorize = useAuthorization();
	const handleUpload = (file:RcFile) => {
		const formData = new FormData();
		formData.append('file', file as  Blob);
		setUploading(true);
		try{
			const res = customRequest(formData)
			console.log("res:", res)
			res.then(() => {
				message.success(`${file.name} file uploaded successfully`);
			  })
			  .catch((error) => {
				console.log(error);
			  })
			  .finally(() => {
				setUploading(false);
			  });
		}catch(err){
			console.log("error:", err)
		}
	  };

    const props: UploadProps = {
		name: 'file',
		action:(file:RcFile)=>{
			handleUpload(file)
			return "";
		},
		beforeUpload: (excelFile:RcFile) => {
			const isExcel = excelFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
			if (!isExcel) {
				message.error(`${excelFile.name} is not a excel file`);
				return Upload.LIST_IGNORE;
			}
			const isLt2M = excelFile.size / 1024 / 1024 < 2;
			if (!isLt2M) {
			  message.error('Image must smaller than 2MB!');
			  return Upload.LIST_IGNORE;
			}
			return isExcel;
		  },

		maxCount:1,
		progress: {
			strokeColor: {
			  '0%': '#108ee9',
			  '100%': '#87d068',
			},
			size: 8,
			format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
		  },
	  };
    return (<>
        <Upload   
                {...props}
                >
                <Button
                className={`px-3 block h-12 text-custom_blue-900 bg-custom_gray-200 rounded-lg ${isVisible(authorize.canCreate(`${permission}`))}`}

                icon={<UploadOutlined />}>Import {title} Excel</Button>
        </Upload>
        </>
    )
}

export default CustomExcelImport