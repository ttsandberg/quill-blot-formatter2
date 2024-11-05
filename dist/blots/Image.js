"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const quill_1 = __importDefault(require("quill"));
const ImageBlot = quill_1.default.import('formats/image');
const ATTRIBUTES = ['alt', 'height', 'width', 'title'];
class Image extends ImageBlot {
    static formats(domNode) {
        return ATTRIBUTES.reduce((formats, attribute) => {
            if (domNode.hasAttribute(attribute)) {
                formats[attribute] = domNode.getAttribute(attribute);
            }
            return formats;
        }, {});
    }
    format(name, value) {
        if (ATTRIBUTES.indexOf(name) > -1) {
            if (value) {
                this.domNode.setAttribute(name, value);
            }
            else {
                this.domNode.removeAttribute(name);
            }
        }
        else {
            super.format(name, value);
        }
    }
}
exports.default = Image;
