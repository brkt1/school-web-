import React, { useEffect, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import "./index.css";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { ClassicEditor } from "@ckeditor/ckeditor5-editor-classic";
import { insertDocumentLink, insertImage, insertVideo } from "./insertImage";
import { cn } from "@/utils/cn";

interface RichTextEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  readonly?: boolean;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  placeholderClassName?: string
}

const RichTextEditor = ({ value, onChange, readonly, disabled, placeholder = 'Type or Past you content', className, placeholderClassName }: RichTextEditorProps) => {
//   const filePickerRef = useRef<FilePickerComponentHandle>(null);
  const editorRef = useRef<ClassicEditor>(null);

//   const showModal = () => {
//     if (filePickerRef.current) {
//       filePickerRef.current.pick();
//     }
//   };

//   const handleImageInput = (file: FileType) => {
//     if (editorRef.current && file.content_type == ContentType.IMAGE) {
//       insertImage(editorRef.current, file.file_url);
//     }
//     if (editorRef.current && file.content_type == ContentType.VIDEO) {
//       insertVideo(editorRef.current, file.file_url);
//     }
//     if (editorRef.current && file.content_type == ContentType.DOCUMENT) {
//       insertDocumentLink(editorRef.current, file.file_url, file.file_name);
//     }
//   };

  const checkVideo = () => {
    const videos = document.getElementsByTagName('video')
    for(let video of videos){
     video.setAttribute("controls", "true")
    }
  }

  useEffect(() => {
    checkVideo()
  }, [value])

  return (
    <div className={cn(readonly ? 'read-only-editor' : 'h-full flex-1', className)}>
      {placeholder != 'Type or Past you content' && <p className={cn("font-bold py-1 px-2", placeholderClassName)}>{placeholder}</p>}
      <CKEditor
        editor={Editor.Editor as any}
        data={value}
        config={
          {
            removePlugins: ['Title'],
            placeholder,
          }
        }
        disabled={disabled}
        onChange={(event: any, editor: { getData: () => any }) => {
          const data = editor.getData();
          onChange && onChange(data);
        }}
        onAfterDestroy={(editor) => {
         editor.destroy()
        }}
        onReady={(editor) => {
          editorRef.current = editor as any;
          if (readonly) {
            editor.enableReadOnlyMode("my-feature");
          }
          const command = editor.commands.get("openCustomModal");
        //   if (command) {
        //     (command as any).setModalFunction(showModal);
        //   }
        }}

      />
      {/* <FilePicker
        visible={false}
        ref={filePickerRef}
        onClose={handleImageInput}
      /> */}
    </div>
  );
};

export default RichTextEditor;
