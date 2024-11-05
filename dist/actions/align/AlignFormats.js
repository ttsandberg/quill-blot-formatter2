"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageAlign = exports.IframeAlign = exports.InlineBlot = void 0;
const quill_1 = __importDefault(require("quill"));
exports.InlineBlot = quill_1.default.import('blots/inline');
const parchment = quill_1.default.import('parchment');
const { ClassAttributor, Scope } = parchment;
class IframeAlignAttributor extends ClassAttributor {
    constructor() {
        super('iframeAlign', 'ql-iframe-align', {
            scope: Scope.BLOCK,
            whitelist: ['left', 'center', 'right'],
        });
    }
    add(node, value) {
        if (node instanceof HTMLElement) {
            if (typeof value === 'object') {
                super.add(node, value.align);
                node.dataset.blotAlign = value.align;
            }
            else {
                super.add(node, value);
                node.dataset.blotAlign = value;
            }
            const width = node.getAttribute('width');
            if (width) {
                node.style.setProperty('--resize-width', width);
                node.dataset.relativeSize = `${width.endsWith('%')}`;
            }
            else {
                node.style.removeProperty('--resize-width');
                node.dataset.relativeSize = 'false';
            }
            return true;
        }
        else {
            return false;
        }
    }
    remove(node) {
        if (node instanceof HTMLElement) {
            super.remove(node);
            delete node.dataset.blotAlign;
        }
    }
    value(node) {
        const className = super.value(node);
        const width = (node instanceof HTMLElement) ?
            node.style.getPropertyValue('--resize-width') || node.getAttribute('width') || '' :
            '';
        return {
            align: className,
            width: width,
            relativeSize: `${width.endsWith('%')}`
        };
    }
}
const IframeAlign = new IframeAlignAttributor();
exports.IframeAlign = IframeAlign;
class ImageAlignAttributor extends ClassAttributor {
    constructor() {
        super('imageAlign', 'ql-image-align', {
            scope: Scope.INLINE,
            whitelist: ['left', 'center', 'right'],
        });
    }
    add(node, value) {
        if (node instanceof HTMLElement && node.firstChild instanceof HTMLElement) {
            if (typeof value === 'object') {
                super.add(node, value.align);
                node.setAttribute('contenteditable', 'false');
                // data-title used to populate caption via ::after
                if (!!value.title) {
                    node.setAttribute('data-title', value.title);
                }
                else {
                    node.removeAttribute('data-title');
                }
                node.firstChild.dataset.blotAlign = value.align;
            }
            else {
                super.add(node, value);
                node.firstChild.dataset.blotAlign = value;
            }
            // set width style property on wrapper if image and has imageAlign format
            // fallback to image natural width if width attribute missing (image not resized))
            // width needed to size wrapper correctly via css
            let width = node.firstChild.getAttribute('width');
            if (!width) {
                console.log('first child no wifth in add');
                if (node.firstChild instanceof HTMLImageElement) {
                    width = `${node.firstChild.naturalWidth}px`;
                }
                else {
                    width = `${node.firstChild.clientWidth}px`;
                }
                node.firstChild.setAttribute('width', width);
            }
            node.style.setProperty('--resize-width', width);
            node.setAttribute('data-relative-size', `${width?.endsWith('%')}`);
            return true;
        }
        else {
            return false;
        }
    }
    remove(node) {
        if (node instanceof HTMLElement) {
            super.remove(node);
            if (node.firstChild && (node.firstChild instanceof HTMLElement)) {
                delete node.firstChild.dataset.blotAlign;
            }
        }
    }
    value(node) {
        console.log('align formats called', node);
        const className = super.value(node);
        const title = node.getAttribute('data-title') || '';
        let width = (node instanceof HTMLElement) ? node.style.getPropertyValue('--resize-width') : '';
        console.log('node width', width);
        // attempt fallback value for images aligned pre-version 2.2
        if (!parseFloat(width) && node.firstChild instanceof HTMLElement) {
            width = node.firstChild.getAttribute('width') || '';
            console.log('no width, falling back to first child');
            if (!parseFloat(width) && node.firstChild instanceof HTMLImageElement) {
                console.log('no width, falling back to first natural');
                if (node.firstChild.complete) {
                    console.log('first child complete');
                    width = `${node.firstChild.naturalWidth}px`;
                }
                else {
                    node.firstChild.onload = () => {
                        console.log('first child not complete');
                        width = `${node.firstChild.naturalWidth}px`;
                        node.style.setProperty('--resize-width', width);
                        node.firstChild.setAttribute('width', width);
                    };
                }
            }
        }
        return {
            align: className,
            title: title,
            width: width,
            contenteditable: 'false',
            relativeSize: `${width.endsWith('%')}`
        };
    }
}
const ImageAlign = new ImageAlignAttributor();
exports.ImageAlign = ImageAlign;
// Register the custom align formats with Quill
quill_1.default.register({
    'formats/imageAlign': ImageAlign,
    'attributors/class/imageAlign': ImageAlign,
    'formats/iframeAlign': IframeAlign,
    'attributors/class/iframeAlign': IframeAlign,
}, true);
