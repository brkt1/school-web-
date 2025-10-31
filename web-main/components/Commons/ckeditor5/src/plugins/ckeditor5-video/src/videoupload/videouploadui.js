import { Plugin } from 'ckeditor5/src/core';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import videoUploadIcon from '../../theme/icons/video.svg';
import {createVideoTypeRegExp} from "./utils";

export default class VideoUploadUI extends Plugin {
    init() {
        const editor = this.editor;

        const componentCreator = locale => {
            const view = new ButtonView( locale );
            const command = editor.commands.get('uploadVideo');
            const videoTypes = editor.config.get('video.upload.types');
            const videoMediaTypesRegExp = createVideoTypeRegExp(videoTypes);

            view.set({
                acceptedType: videoTypes.map(type => `video/${type}`).join(','),
                allowMultipleFiles: editor.config.get('video.upload.allowMultipleFiles')
            });

            view.set({
                label:'Upload Video',
                icon: videoUploadIcon,
                tooltip: true
            });


            // view.buttonView.bind('isEnabled').to(command);

            view.on('done', (evt, files) => {
                const videosToUpload = Array.from(files).filter(file => videoMediaTypesRegExp.test(file.type));

                if (videosToUpload.length) {
                    editor.execute('uploadVideo', { files: videosToUpload });
                }
            });

            return view;
        };

        editor.ui.componentFactory.add( 'uploadVideo', componentCreator );
        editor.ui.componentFactory.add( 'videoUpload', componentCreator );

    }
}
