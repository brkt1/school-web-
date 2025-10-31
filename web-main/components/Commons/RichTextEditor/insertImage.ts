// utils/insertImage.ts
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export function insertImage(editor: ClassicEditor, imageUrl: string) {
    const imageUtils = editor.plugins.get('ImageUtils');
    (imageUtils as any).insertImage({ src: imageUrl });
}

export function insertVideo(editor: ClassicEditor, videoUrl: string) {
    const videoUtils = editor.plugins.get('VideoUtils') as any;
    videoUtils.insertVideo({src: videoUrl})
    // imageUtils.
    // imageUtils.({ src: imageUrl });
    // const videoElement = editor.document.createElement('VideoInser');
    // editor.model.insertContent(content)
}

export function insertDocumentLink(editor: ClassicEditor, documentUrl: string, linkText: string = 'Click to view document') {
    editor.model.change(writer => {
        // Create the link element with text inside
        const position = editor.model.document.selection.getFirstPosition();
        const textNode = writer.createText(linkText, { linkHref: documentUrl });

        // Insert the link text into the editor content
        writer.insert(textNode, position!);
    });
}