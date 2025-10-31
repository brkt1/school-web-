import { PinturaEditor } from '@pqina/react-pintura';
import { getEditorDefaults, PinturaDefaultImageWriterResult, PinturaImageState } from '@pqina/pintura';

import '@pqina/pintura/pintura.css';
import { useRef, useState } from 'react';
import { cn } from '@/utils/cn';
import ImageManipulator from '../ImageManipulator';

interface ImageEditorProps {
    src: string
    value?: PinturaImageState
    onChange?: (value: PinturaImageState) => void;
    onlyImage?: boolean,
    handleProcess?: (result: PinturaDefaultImageWriterResult) => void
}

function ImageEditor({src, value, onChange, onlyImage = false, handleProcess}: ImageEditorProps) {

    const [imageView, setImageView] = useState<string>()
    return (
        <div className='flex w-full h-full'>
            <PinturaEditor className={cn('w-full', onlyImage ? 'hidden' : '')}
                {...getEditorDefaults()}
                imageState={value}
                src={src}
                onProcess={(res) => {
                    try {
                        setImageView(URL.createObjectURL(res.dest))
                        console.log("Status",URL.createObjectURL(res.dest))
                        onChange && onChange(res.imageState)
                        console.log(handleProcess)
                        handleProcess && handleProcess(res)
                    } catch (error) {
                        console.error("Error processing image:", error);
                    }
                }
                }
            />
           {value && <ImageManipulator className={cn('', onlyImage ? '' : '')} src={src} properties={value} />}
        </div>
    );
}

export default ImageEditor;