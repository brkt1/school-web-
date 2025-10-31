// import { FileType } from "@/app/[locale]/admin/resources/folder/file/file.model";
// import { host } from "./api/api";

// export function getFileUrl(file_url: string){
//     return file_url
// }

// export function getSettingOrFileUrl<T extends {thumbnail?: FileType, file?: FileType, image?: FileType}>(model: T, file_type: 'thumbnail' | 'file' | 'image'){
//     if(!model[file_type]){
//         return;
//     }
//     if(model[file_type].filtered_settings?.length){
//         return model[file_type].filtered_settings[0].file_url
//     }
//     return model[file_type].file_url
// }

// export function getSettingOrFileUrlBySubType<T extends {thumbnail?: FileType, file?: FileType, image?: FileType}>(model: T, file_type: 'thumbnail' | 'file' | 'image', sub_type: number){
//     if(model == null || !model[file_type]){
//         return;
//     }
//     if(model[file_type].filtered_settings?.length){
//         const filtered_settings = model[file_type].filtered_settings.filter(setting => setting.image_subtype = sub_type)
//         if(filtered_settings.length){
//             return filtered_settings[0].file_url
//         }
//     }
//     return model[file_type].file_url
// }

// export function getFileType(url: string): Promise<string | null> {
//     return fetch(url, { method: 'HEAD' })
//       .then((response) => {
//         if (!response.ok) {
//           return null;
//         }
//         const contentType = response.headers.get('content-type');
//         console.log('contentType ',contentType);
        
//         return contentType;
//       })
//       .catch((error) => {
//         console.error('Error checking file type:', error);
//         return null;
//       });
//   }
  