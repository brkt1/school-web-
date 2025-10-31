import React, { cloneElement, forwardRef, ReactElement, ReactNode, useEffect, useImperativeHandle, useRef, useState } from "react";
import { PinturaImageState } from '@pqina/pintura';
import _ from 'lodash'
import { cn } from "@/utils/cn";

interface ImageManipulatorProps {
  src: string;
  properties?: PinturaImageState;
  className?: string;
  children?: any
}

export interface ImageManipulatorComponentHandle {
  getFile: () => any
}

const ImageManipulator = forwardRef<ImageManipulatorComponentHandle, ImageManipulatorProps>(({ src, properties, className, children }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [width, setWidth] = useState<number>()
  const [height, setHeight] = useState<number>()
  const [imageUrl, setImageURL] = useState<string>()
  const [dest, setDest] = useState<string>()

  useEffect(() => {
    const fetchImage = async () => {
      try {
        // Fetch the remote image as a Blob
        const response = await fetch(src);
        if (!response.ok) {
          throw new Error('Failed to fetch image');
        }

        // Convert the image response into a Blob
        const blob = await response.blob();
        
        // Create a Blob URL from the Blob
        const url = URL.createObjectURL(blob);
        
        // Set the image URL to be used by <img>
        setImageURL(url);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchImage();
  }, []);
  

  useEffect(() => {
    if (imageUrl) {
        
      const img = new Image();
      img.onload = () => {
        // Image loaded successfully, proceed to draw
        drawImage(img);
        setWidth(img.width);
        setHeight(img.height);
      };
      img.onerror = (e) => {
        console.error("Error loading image", e);
      };
      img.crossOrigin = 'Anonymous'; // Allows cross-origin images
      img.src = imageUrl;
    }
  }, [imageUrl, properties]);

  const dataURItoBlob = (dataURI: string) => {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString?.length);
    for (var i = 0; i < byteString?.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
}

useImperativeHandle(ref, () => ({
  getFile: async () => {
    try {
      const canvas = canvasRef.current;
      if (!canvas) return;

      // Wrapping canvas.toBlob in a Promise to use async/await
      const blob = await new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Failed to create blob"));
          }
        }, 'image/jpeg');
      });

      return blob;
    } catch (error) {
      console.error("Error generating blob: ", error);
    }
  },
}));

  const drawImage = async (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Apply background color only if explicitly provided
    if (properties?.backgroundColor) {
      ctx.fillStyle = properties.backgroundColor.join();
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else {
      // Ensure a transparent or white background if none provided
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Save current state for transformations
    ctx.save();

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Apply transformations
    ctx.translate(centerX, centerY);
    if (properties?.rotation) {
      ctx.rotate(((properties.rotation * 90 / 1.5707963267948983) * Math.PI) / 180);
    }
    if (properties?.flipX || properties?.flipY) {
      ctx.scale(properties.flipX ? -1 : 1, properties.flipY ? -1 : 1);
    }
    ctx.translate(-centerX, -centerY);

    // Draw cropped image
    if (properties?.crop) {
      const { x, y, width, height } = properties.crop;
      ctx.drawImage(
        img,
        x,
        y,
        width,
        height,
        0,
        0,
        canvas.width,
        canvas.height
      );
    } else {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }

    // Restore canvas state
    ctx.restore();

    // Draw annotations
    if (properties?.annotation) {
      properties.annotation.forEach((shape) => {
        ctx.fillStyle = shape.color?.join() || "black";
        ctx.fillRect(shape.x as number, shape.y as number, shape.width as number, shape.height as number);
      });
    }

    // Apply vignette only if explicitly set
    if (properties?.vignette) {
      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        canvas.width / 4,
        centerX,
        centerY,
        canvas.width / 2
      );
      gradient.addColorStop(0, "transparent");
      gradient.addColorStop(1, "black");
      ctx.fillStyle = gradient;
      ctx.globalAlpha = properties.vignette;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1;
    }

    // Log the base64 data URL
  };

  return (
    <div>
    <canvas
      ref={canvasRef}
      width={properties?.targetSize?.width || width}
      height={properties?.targetSize?.height || height}
      className={cn("w-full h-full hidden", className)}
      style={{ border: "1px solid black" }}
    ></canvas>
    <div>{typeof children === 'function' ? children(dest) : children}</div>
    </div>
  );
});

export default ImageManipulator;
