// import useFile from "@/app/[locale]/admin/resources/folder/file/file.api";
// import { ContentType } from "@/app/[locale]/admin/resources/folder/file/file.model";
// import { commonURL } from "@/utils/api/api";
// import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
// import { Button, Upload } from "antd";
// import { RcFile } from "antd/es/upload";
// import { useTranslations } from "next-intl";

// interface FileUploadProps {
//   folder_id?: string;
//   onClose: () => void;
// }

// const FileUpload = ({ folder_id, onClose }: FileUploadProps) => {
//   let file_url;
//   if (!folder_id) {
//     file_url = `${commonURL}file`;
//   } else {
//     file_url = `${commonURL}file/folder/${folder_id}/files`;
//   }

//   const fileService = useFile();
//   const t = useTranslations("Resource");

//   const uploadFiles = (file: RcFile) => {
//     fileService.uploadFile(file, folder_id, ContentType.IMAGE).then((value) => {
//       onClose();
//     });
//     return "";
//   };

//   const props = {
//     action: uploadFiles,
//     multiple: true,
//   };
//   return (
//     <Upload {...props} fileList={[]}>
//       {/* <Button icon={<UploadOutlined />}>File</Button> */}
//       <Button type="primary">
//         <PlusOutlined /> {t("file_upload")}
//       </Button>
//     </Upload>
//   );
// };

// export default FileUpload;
