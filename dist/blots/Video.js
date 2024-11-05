"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const quill_1 = __importDefault(require("quill"));
const VideoEmbed = quill_1.default.import("formats/video");
class VideoResponsive extends VideoEmbed {
    static aspectRatio = "16 / 9 auto";
    static create(value) {
        const node = super.create(value);
        node.setAttribute('width', '100%');
        node.style.aspectRatio = this.aspectRatio;
        return node;
    }
    html() {
        return this.domNode.outerHTML;
    }
}
exports.default = VideoResponsive;
