"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BlotSpec_1 = __importDefault(require("./BlotSpec"));
const AttributeAction_1 = __importDefault(require("../actions/AttributeAction"));
const CompressAction_1 = __importDefault(require("../actions/CompressAction"));
class ImageSpec extends BlotSpec_1.default {
    img;
    constructor(formatter) {
        super(formatter);
        this.img = null;
    }
    init() {
        this.formatter.quill.root.addEventListener('click', this.onClick);
    }
    getActions() {
        const actions = super.getActions();
        if (this.formatter.options.image.allowAltTitleEdit) {
            actions.push(new AttributeAction_1.default(this.formatter));
        }
        if (this.formatter.options.image.allowCompressor && CompressAction_1.default.isEligibleForCompression(this.img)) {
            actions.push(new CompressAction_1.default(this.formatter));
        }
        return actions;
    }
    getTargetElement() {
        return this.img;
    }
    onHide() {
        this.img = null;
    }
    onClick = (event) => {
        const el = event.target;
        if (el instanceof HTMLImageElement) {
            this.img = el;
            this.formatter.show(this);
        }
    };
}
exports.default = ImageSpec;
