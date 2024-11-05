"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const quill_1 = __importDefault(require("quill"));
const Action_1 = __importDefault(require("./Action"));
const AlignFormats_1 = require("./align/AlignFormats");
const ToolbarButton_1 = __importDefault(require("./toolbar/ToolbarButton"));
class AttributeAction extends Action_1.default {
    modal;
    targetElement = null;
    constructor(formatter) {
        super(formatter);
        this.toolbarButtons = [
            new ToolbarButton_1.default('attribute', this.onClickHandler, this.formatter.options.toolbar)
        ];
        this.modal = this.createModal();
    }
    onCreate() {
        this.targetElement = this.formatter.currentSpec?.getTargetElement();
    }
    onDestroy() {
        this.targetElement = null;
        this.modal.element.remove();
    }
    onClickHandler = () => {
        this.showAltTitleModal();
    };
    showAltTitleModal() {
        if (this.targetElement) {
            this.modal.altInput.value = this.targetElement.getAttribute('alt') || '';
            this.modal.titleInput.value = this.targetElement.getAttribute('title') || '';
            document.body.append(this.modal.element);
        }
    }
    hideAltTitleModal() {
        this.modal.element.remove();
    }
    setAltTitle() {
        if (this.targetElement) {
            const alt = this.modal.altInput.value;
            const title = this.modal.titleInput.value;
            if (alt) {
                this.targetElement.setAttribute('alt', alt);
            }
            else {
                this.targetElement.removeAttribute('alt');
            }
            if (title) {
                this.targetElement.setAttribute('title', title);
            }
            else {
                this.targetElement.removeAttribute('title');
            }
            // Update align format if applied
            const blot = quill_1.default.find(this.targetElement);
            const imageAlignment = blot?.parent?.formats()[AlignFormats_1.ImageAlign.attrName]?.align;
            if (blot && imageAlignment) {
                blot.parent?.format(AlignFormats_1.ImageAlign.attrName, false);
                blot.format(AlignFormats_1.ImageAlign.attrName, {
                    align: imageAlignment,
                    title: title
                });
            }
        }
    }
    createModal() {
        const uuid = Array.from(crypto.getRandomValues(new Uint8Array(5)), (n) => String.fromCharCode(97 + (n % 26))).join('');
        // Create modal background
        const modal = document.createElement('div');
        modal.id = `${uuid}-modal`;
        modal.setAttribute('data-blot-formatter-modal', '');
        // Create modal container
        const modalContainer = document.createElement('div');
        // Create form element
        const form = document.createElement('form');
        form.id = `${uuid}-form`;
        // Create label for alt
        const labelAlt = document.createElement('label');
        labelAlt.setAttribute('for', 'alt');
        labelAlt.textContent = this.formatter.options.overlay.labels?.alt || this.formatter.options.image.altTitleModalOptions.labels.alt;
        // Create textarea for alt
        const textareaAlt = document.createElement('textarea');
        textareaAlt.name = 'alt';
        textareaAlt.rows = 3;
        // Create label for title
        const labelTitle = document.createElement('label');
        labelTitle.setAttribute('for', 'title');
        labelTitle.textContent = this.formatter.options.overlay.labels?.title || this.formatter.options.image.altTitleModalOptions.labels.title;
        // Create textarea for title
        const textareaTitle = document.createElement('textarea');
        textareaTitle.name = 'title';
        textareaTitle.rows = 3;
        // Create submit button
        const buttonDiv = document.createElement('div');
        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.innerHTML = this.formatter.options.image.altTitleModalOptions.icons.submitButton;
        buttonDiv.appendChild(submitButton);
        // Append elements to the form
        form.appendChild(labelAlt);
        form.appendChild(textareaAlt);
        form.appendChild(labelTitle);
        form.appendChild(textareaTitle);
        form.appendChild(buttonDiv);
        // Create cancel button
        const cancelButton = document.createElement('button');
        cancelButton.id = `${uuid}-cancel`;
        cancelButton.type = 'button';
        cancelButton.innerHTML = this.formatter.options.image.altTitleModalOptions.icons.cancelButton;
        // styles
        if (this.formatter.options.image.altTitleModalOptions.styles) {
            Object.assign(modal.style, this.formatter.options.image.altTitleModalOptions.styles.modalBackground);
            Object.assign(modalContainer.style, this.formatter.options.image.altTitleModalOptions.styles.modalContainer);
            Object.assign(labelAlt.style, this.formatter.options.image.altTitleModalOptions.styles.label);
            Object.assign(textareaAlt.style, this.formatter.options.image.altTitleModalOptions.styles.textarea);
            Object.assign(labelTitle.style, this.formatter.options.image.altTitleModalOptions.styles.label);
            Object.assign(textareaTitle.style, this.formatter.options.image.altTitleModalOptions.styles.textarea);
            Object.assign(submitButton.style, this.formatter.options.image.altTitleModalOptions.styles.submitButton);
            Object.assign(cancelButton.style, this.formatter.options.image.altTitleModalOptions.styles.cancelButton);
        }
        // Append form and cancel button to the modal container
        modalContainer.appendChild(form);
        modalContainer.appendChild(cancelButton);
        // Append modal container to the modal background
        modal.appendChild(modalContainer);
        // event listeners
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            this.setAltTitle();
            this.hideAltTitleModal();
        });
        form.addEventListener('cancel', () => { this.hideAltTitleModal(); });
        modal.addEventListener('pointerdown', (event) => {
            if (event.target === modal) {
                this.hideAltTitleModal();
            }
        });
        cancelButton.addEventListener('click', () => { this.hideAltTitleModal(); });
        return {
            element: modal,
            form: form,
            altInput: textareaAlt,
            titleInput: textareaTitle,
            cancelButton: cancelButton
        };
    }
}
exports.default = AttributeAction;
