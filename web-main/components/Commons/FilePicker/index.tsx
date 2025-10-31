// "use client";
// import { Button, Modal, Image } from "antd";
// import { PlusOutlined, ArrowUpOutlined } from "@ant-design/icons";
// import {
//   forwardRef,
//   useEffect,
//   useImperativeHandle,
//   useRef,
//   useState,
// } from "react";
// import { useTranslations } from "next-intl";
// import useHandleError from "@/utils/api/handleError";
// import {
//   ContentType,
//   contentTypeOptions,
//   FilePermanentType,
//   FileType,
// } from "@/app/[locale]/admin/resources/folder/file/file.model";
// import useFile from "@/app/[locale]/admin/resources/folder/file/file.api";
// import useFolder from "@/app/[locale]/admin/resources/folder/folder.api";
// import SearchBar from "../SearchBar";
// import paginator from "@/hooks/paginator";
// import { SearchComponentProps } from "@/hooks/search";
// import { componentType } from "@/utils/common_models/commons.model";
// import {
//   FolderFileType,
//   FolderType,
//   FolderTypeSearchModel,
// } from "@/app/[locale]/admin/resources/folder/folder.model";
// import usePaginator from "@/hooks/paginator";
// import FileUpload from "../FileUpload";
// import { Link } from "@/navigation";
// import { host } from "@/utils/api/api";
// import ImageViewer, { ImageComponentHandle } from "../ImageViewer";
// import { FaFolder } from "react-icons/fa";
// import { IoIosDocument } from "react-icons/io";
// import { FaVideo } from "react-icons/fa6";
// import { getFileUrl } from "@/utils/file_utils";
// import { FloatSelect } from "../FloatLabel";
// import FolderEdit from "@/app/[locale]/admin/resources/folder/folder.edit";

// interface FilePickerProps {
//   onClose: (file: FileType) => void;
//   visible?: boolean
// }

// export interface FilePickerComponentHandle {
//   pick: () => void;
// }

// const contentType = {
//   [ContentType.DOCUMENT]: <IoIosDocument className="w-20 h-20 text-blue-500" />,
//   [ContentType.VIDEO]: <FaVideo className="w-20 h-20 text-blue-500" />,
// };

// const FilePicker = forwardRef<FilePickerComponentHandle, FilePickerProps>(
//   ({ onClose, visible }, ref) => {
//     const [open, setOpen] = useState(false);
//     const [confirmLoading, setConfirmLoading] = useState(false);
//     const errorHandler = useHandleError();
//     const [folderData, setFolderData] = useState<FolderFileType[]>([]);
//     const t = useTranslations("Resource");
//     const file = useFile();
//     const [currentFolder, setCurrentFolder] = useState<FolderType>();
//     const imageRef = useRef<ImageComponentHandle>(null);
//     const folder = useFolder();
//     const [draggedFile, setDraggedFile] = useState<FileType | null>(null);
//     const paginator = usePaginator<FolderTypeSearchModel>({
//       parent_id: "",
//       ps: undefined,
//       ordering: {
//         sc: "folder_name",
//         so: 'ascend'
//       }
//     });

//     const handleDragStart = (file: FileType) => {
//       setDraggedFile(file);
//     };

//     const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
//       event.preventDefault();
//     };

//     const handleDrop = async (folderId: string) => {
//       if (draggedFile) {
//         try {
//           await file.updateFile(draggedFile.id, {
//             file_name: draggedFile.file_name,
//             folder_id: folderId,
//           } as any);
//           setDraggedFile(null);
//           searchFolder(); // Refresh the folder view
//         } catch (error) {
//         }
//       }
//     };

//     const components: SearchComponentProps[] = [
//       {
//         placeholder: "Search",
//         key: "search",
//         type: componentType.TEXT,
//       },
//     ];

//     useImperativeHandle(ref, () => ({
//       pick: () => {
//         setOpen(true);
//       },
//     }));

//     const searchFolder = () => {
//       folder.getFolders(paginator.filterData).then((values) => {
//         setFolderData(values.results);
//         paginator.setTotal(values.count);
//         if(values.results){
//           if(values.results[0].type == 'FOLDER'){
//           setCurrentFolder((values.results[0].data as FolderType).parent)
//         } else {
//           setCurrentFolder((values.results[0].data as FileType).folder)
//         }
//         }
//       });
//     };

//     const handleOk = () => {
//       setOpen(false);
//       paginator.setFilterData({ parent_id: "" });
//     };

//     const handleCancel = () => {
//       setOpen(false);
//       paginator.setFilterData({ parent_id: "" });
//     };

//     const viewImage = (image: string) => {
//       if (imageRef.current) {
//         imageRef.current.view(image);
//       }
//     };

//     const handleFileInput = (file: FileType) => {
//       onClose(file)
//       setOpen(false)
//     }

//     const handleContentTypeChange = (value: number) => {
//       paginator.handleChange('content_type', value)
//     }

//     useEffect(() => {
//       if (open) {
//         searchFolder();
//       }
//     }, [open, paginator.filterData]);

//     return (
//       <div>
//         <ImageViewer ref={imageRef} />
//         <Button className={visible == false ? 'hidden' : ''} type="primary" onClick={() => setOpen(true)}>
//           <PlusOutlined /> {t("file_picker")}
//         </Button>
//         <Modal
//           title={t("file_picker")}
//           centered
//           width={"80%"}
//           height={"80%"}
//           open={open}
//           onOk={() => handleOk}
//           confirmLoading={confirmLoading}
//           onCancel={handleCancel}
//           className="custom-modal scroll-tab"
//           classNames={{content: 'h-full flex-1 flex flex-col', body: 'h-full flex flex-col overflow-y-auto'}}
//         >
//           <div className="flex justify-between items-center gap-2 flex-wrap mx-10 my-5">
//             <div className="flex gap-2">
//               {(paginator.filterData as FolderTypeSearchModel)?.parent_id &&
//                 currentFolder && (
//                   <Button
//                     onClick={() =>
//                       paginator.setFilterData({
//                         parent_id: currentFolder.parent?.id || "",
//                       })
//                     }
//                   >
//                     <ArrowUpOutlined />
//                   </Button>
//                 )}
//               <SearchBar
//                 filteredData={paginator.filterData}
//                 components={components}
//                 handleChange={paginator.handleChange}
//                 className="m-0 p-0"
//               />
//               <FloatSelect onChange={handleContentTypeChange} placeholder={t("content_type")} options={contentTypeOptions}></FloatSelect>
//             </div>
//             <div className="flex gap-2">
//             <FolderEdit onClose={searchFolder} parent_id={(paginator.filterData as FolderTypeSearchModel).parent_id} />
//             <FileUpload
//               onClose={searchFolder}
//               folder_id={
//                 (paginator.filterData as FolderTypeSearchModel).parent_id
//               }
//             />
//             </div>
//           </div>
//           <div className="flex flex-wrap gap-2 gap-x-4 flex-1 overflow-y-auto">
//             {folderData?.map(({ type, data }, index) => {
//               return (
//                 <div key={index} className="flex flex-col items-center rounded-lg max-w-32 min-w-32 p-2">
//                   {type == "FOLDER" && (
//                     <div
//                       onDragOver={handleDragOver}
//                       onDrop={() => handleDrop(data.id)}
//                       onDoubleClick={() => {
//                         setCurrentFolder(data);
//                         paginator.setFilterData({ parent_id: data.id });
//                       }}
//                       className="flex flex-col items-center justify-end rounded-lg cursor-pointer hover:opacity-80"
//                     >
//                       <FaFolder className="w-20 h-20 text-blue-500" />
//                       <div className="flex-col items-center hidden gap-x-4 sm:flex w-full">
//                         <div className="font-semibold">
//                           {data.folder_name}
//                           {/* <Button className="text-white font-extrabold text-xl" type="link" onClick={() => paginator.setFilterData({parent_id: data.id})}>
//                             {data.folder_name}
//                           </Button> */}
//                         </div>
//                       </div>
//                       <div className="flex-col gap-x-4 sm:hidden">
//                         <div className="font-semibold">{data.folder_name}</div>
//                       </div>
//                     </div>
//                   )}
//                   {type == "FILE" && (
//                     <div draggable onDragStart={() => handleDragStart(data)} onDoubleClick={() => handleFileInput(data)} className="max-w-32 min-w-32 flex flex-col items-center cursor-pointer hover:opacity-80">
//                       <div className="flex-col hidden gap-x-4 sm:flex w-full">
//                         <div className="font-semibold">
//                           {data.content_type == ContentType.IMAGE ? (
//                             <div className="flex flex-col items-center">
//                               <Image
//                                 className="h-20"
//                                 src={getFileUrl(data.file_url)}
//                                 preview={false}
//                               />
//                               <span className="break-word whitespace-normal break-all">
//                                 {data.file_name}
//                               </span>
//                             </div>
//                           ) : (
//                             <div>
//                               {
//                                 contentType[
//                                   data.content_type || ContentType.DOCUMENT
//                                 ]
//                               }
//                               <span className="break-words whitespace-normal text-black">
//                                 {data.file_name}
//                               </span>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                       <div className="flex-col gap-x-4 sm:hidden">
//                         <div className="font-semibold">
//                           {data.folder?.folder_name}
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         </Modal>
//       </div>
//     );
//   }
// );

// export default FilePicker;
