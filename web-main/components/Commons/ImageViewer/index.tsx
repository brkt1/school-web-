import { forwardRef, useImperativeHandle, useState } from "react";
import { Image } from 'antd';

export interface ImageComponentHandle {
  view: (url: string) => void;
}

interface ImageViewProps {}

const ImageViewer = forwardRef<ImageComponentHandle, ImageViewProps>(
  (_, ref) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");

    useImperativeHandle(ref, () => ({
        view: (url: string) => {
          setPreviewImage(url)
          setPreviewOpen(true)
        },
      }));

    return (
      <Image
        wrapperStyle={{ display: "none" }}
        preview={{
          visible: previewOpen,
          onVisibleChange: (visible) => setPreviewOpen(visible),
          afterOpenChange: (visible) => !visible && setPreviewImage(""),
        }}
        src={previewImage}
      />
    );
  }
);

export default ImageViewer;
