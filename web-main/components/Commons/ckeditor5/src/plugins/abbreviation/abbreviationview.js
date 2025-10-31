/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import {
	View,
	LabeledFieldView,
	createLabeledInputText,
	ButtonView,
	submitHandler,
} from '@ckeditor/ckeditor5-ui';
import { icons } from '@ckeditor/ckeditor5-core';

export default class FormView extends View {
	constructor( locale ) {
		super( locale );

		this.abbrInputView = this._createInput( 'Add abbreviation' );
		this.titleInputView = this._createInput( 'Add title' );

		this.saveButtonView = this._createButton( 'Save', icons.check, 'ck-button-save' );
		// Submit type of the button will trigger the submit event on entire form when clicked 
        // (see submitHandler() in render() below).
		this.saveButtonView.type = 'submit';

		this.cancelButtonView = this._createButton( 'Cancel', icons.cancel, 'ck-button-cancel' );

		// Delegate ButtonView#execute to FormView#cancel
		this.cancelButtonView.delegate( 'execute' ).to( this, 'cancel' );

		this.childViews = this.createCollection( [
			this.abbrInputView,
			this.titleInputView,
			this.saveButtonView,
			this.cancelButtonView
		] );

		this.setTemplate( {
			"tag": "body",
			"children": [
			  {
				"tag": "div",
				"attributes": {
				  "role": "dialog",
				  "aria-labelledby": ":rc:",
				  "aria-modal": "true",
				  "class": "ant-modal css-dev-only-do-not-override-j9bb5n",
				  "style": "width: 520px; transform-origin: 137.5px -218.5px;"
				},
				"children": [
				  {
					"tag": "div",
					"attributes": {
					  "tabindex": "0",
					  "aria-hidden": "true",
					  "style": "width: 0px; height: 0px; overflow: hidden; outline: none;"
					}
				  },
				  {
					"tag": "div",
					"attributes": {
					  "tabindex": "-1",
					  "style": "outline: none;"
					},
					"children": [
					  {
						"tag": "div",
						"attributes": {
						  "class": "ant-modal-content"
						},
						"children": [
						  {
							"tag": "button",
							"attributes": {
							  "type": "button",
							  "aria-label": "Close",
							  "class": "ant-modal-close"
							},
							"children": [
							  {
								"tag": "span",
								"attributes": {
								  "class": "ant-modal-close-x"
								},
								"children": [
								  {
									"tag": "span",
									"attributes": {
									  "role": "img",
									  "aria-label": "close",
									  "class": "anticon anticon-close ant-modal-close-icon"
									},
									"children": [
									  {
										"tag": "svg",
										"attributes": {
										  "fill-rule": "evenodd",
										  "viewBox": "64 64 896 896",
										  "focusable": "false",
										  "data-icon": "close",
										  "width": "1em",
										  "height": "1em",
										  "fill": "currentColor",
										  "aria-hidden": "true"
										},
										"children": [
										  {
											"tag": "path",
											"attributes": {
											  "d": "M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"
											}
										  }
										]
									  }
									]
								  }
								]
							  }
							]
						  },
						  {
							"tag": "div",
							"attributes": {
							  "class": "ant-modal-header"
							},
							"children": [
							  {
								"tag": "div",
								"attributes": {
								  "class": "ant-modal-title",
								  "id": ":rc:"
								},
								"children": [
								  {
									"text": "Language"
								  }
								]
							  }
							]
						  },
						  {
							"tag": "div",
							"attributes": {
							  "class": "ant-modal-body"
							},
							"children": [
							  {
								"tag": "form",
								"attributes": {
								  "class": "ant-form ant-form-horizontal css-dev-only-do-not-override-j9bb5n"
								},
								"children": [
								  {
									"tag": "div",
									"attributes": {
									  "class": "ant-form-item css-dev-only-do-not-override-j9bb5n"
									},
									"children": [
									  {
										"tag": "div",
										"attributes": {
										  "class": "ant-row ant-form-item-row css-dev-only-do-not-override-j9bb5n"
										},
										"children": [
										  {
											"tag": "div",
											"attributes": {
											  "class": "ant-col ant-form-item-label css-dev-only-do-not-override-j9bb5n"
											},
											"children": [
											  {
												"tag": "label",
												"attributes": {
												  "for": "name",
												  "class": "ant-form-item-required",
												  "title": "Name"
												},
												"children": [
												  {
													"text": "Name"
												  }
												]
											  }
											]
										  },
										  {
											"tag": "div",
											"attributes": {
											  "class": "ant-col ant-form-item-control css-dev-only-do-not-override-j9bb5n"
											},
											"children": [
											  {
												"tag": "div",
												"attributes": {
												  "class": "ant-form-item-control-input"
												},
												"children": [
												  {
													"tag": "div",
													"attributes": {
													  "class": "ant-form-item-control-input-content"
													},
													"children": [
													  {
														"tag": "input",
														"attributes": {
														  "id": "name",
														  "aria-required": "true",
														  "class": "ant-input css-dev-only-do-not-override-j9bb5n ant-input-outlined",
														  "type": "text",
														  "value": ""
														}
													  }
													]
												  }
												]
											  }
											]
										  }
										]
									  }
									]
								  },
								  {
									"tag": "div",
									"attributes": {
									  "class": "ant-form-item css-dev-only-do-not-override-j9bb5n"
									},
									"children": [
									  {
										"tag": "div",
										"attributes": {
										  "class": "ant-row ant-form-item-row css-dev-only-do-not-override-j9bb5n"
										},
										"children": [
										  {
											"tag": "div",
											"attributes": {
											  "class": "ant-col ant-form-item-label css-dev-only-do-not-override-j9bb5n"
											},
											"children": [
											  {
												"tag": "label",
												"attributes": {
												  "for": "code",
												  "class": "ant-form-item-required",
												  "title": "Code"
												},
												"children": [
												  {
													"text": "Code"
												  }
												]
											  }
											]
										  },
										  {
											"tag": "div",
											"attributes": {
											  "class": "ant-col ant-form-item-control css-dev-only-do-not-override-j9bb5n"
											},
											"children": [
											  {
												"tag": "div",
												"attributes": {
												  "class": "ant-form-item-control-input"
												},
												"children": [
												  {
													"tag": "div",
													"attributes": {
													  "class": "ant-form-item-control-input-content"
													},
													"children": [
													  {
														"tag": "input",
														"attributes": {
														  "id": "code",
														  "aria-required": "true",
														  "class": "ant-input css-dev-only-do-not-override-j9bb5n ant-input-outlined",
														  "type": "text",
														  "value": ""
														}
													  }
													]
												  }
												]
											  }
											]
										  }
										]
									  }
									]
								  }
								]
							  }
							]
						  },
						  {
							"tag": "div",
							"attributes": {
							  "class": "ant-modal-footer"
							},
							"children": [
							  {
								"tag": "button",
								"attributes": {
								  "type": "button",
								  "class": "ant-btn css-dev-only-do-not-override-j9bb5n ant-btn-default"
								},
								"children": [
								  {
									"tag": "span",
									"children": [
									  {
										"text": "Cancel"
									  }
									]
								  }
								]
							  },
							  {
								"tag": "button",
								"attributes": {
								  "type": "button",
								  "class": "ant-btn css-dev-only-do-not-override-j9bb5n ant-btn-primary"
								},
								"children": [
								  {
									"tag": "span",
									"children": [
									  {
										"text": "OK"
									  }
									]
								  }
								]
							  }
							]
						  }
						]
					  }
					]
				  },
				  {
					"tag": "div",
					"attributes": {
					  "tabindex": "0",
					  "aria-hidden": "true",
					  "style": "width: 0px; height: 0px; overflow: hidden; outline: none;"
					}
				  }
				]
			  }
			]
		  });
	}

	render() {
		super.render();

		// Submit the form when the user clicked the save button or pressed enter in the input.
		submitHandler( {
			view: this
		} );
	}

	focus() {
		// this.childViews.first.focus();
	}

	_createInput( label ) {
		const labeledInput = new LabeledFieldView( this.locale, createLabeledInputText );

		labeledInput.label = label;

		return labeledInput;
	}

	_createButton( label, icon, className ) {
		const button = new ButtonView();

		button.set( {
			label,
			icon,
			tooltip: true,
			class: className
		} );

		return button;
	}
}