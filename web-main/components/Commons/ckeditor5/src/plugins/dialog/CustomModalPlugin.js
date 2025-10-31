// src/ckeditor-plugins/CustomModalPlugin.js

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import imageIcon from '@ckeditor/ckeditor5-core/theme/icons/image.svg';


export default class CustomModalPlugin extends Plugin {
    init() {
        const editor = this.editor;

        editor.ui.componentFactory.add('customModal', locale => {
            const view = new ButtonView(locale);

            view.set({
                label: 'Open Modal',
                withText: false,
                tooltip: true,
                icon: imageIcon
            });

            // Add event listener to open modal
            view.on('execute', () => {
                // Trigger the function to open the modal
                editor.execute('openCustomModal');
            });

            return view;
        });

        // Add the command to the editor
        editor.commands.add('openCustomModal', new OpenModalCommand(editor));
    }
}

class OpenModalCommand extends Plugin {
    execute() {
        // This function can be customized to handle your modal logic
        if (this._openModal) {
            this._openModal();
        }
    }

    setModalFunction(openModal) {
        this._openModal = openModal;
    }
}
