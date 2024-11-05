"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const quill_1 = __importDefault(require("quill"));
const AlignAction_1 = __importDefault(require("../actions/align/AlignAction"));
const ResizeAction_1 = __importDefault(require("../actions/ResizeAction"));
const DeleteAction_1 = __importDefault(require("../actions/DeleteAction"));
class BlotSpec {
    formatter;
    isUnclickable = false;
    constructor(formatter) {
        this.formatter = formatter;
    }
    init() { }
    getActions() {
        const actions = [];
        if (this.formatter.options.align.allowAligning) {
            actions.push(new AlignAction_1.default(this.formatter));
        }
        if (this.formatter.options.resize.allowResizing) {
            actions.push(new ResizeAction_1.default(this.formatter));
        }
        if (this.formatter.options.delete.allowKeyboardDelete) {
            actions.push(new DeleteAction_1.default(this.formatter));
        }
        return actions;
    }
    getTargetElement() {
        return null;
    }
    getTargetBlot() {
        const target = this.getTargetElement();
        if (!!target) {
            return quill_1.default.find(target);
        }
        else {
            return null;
        }
    }
    getOverlayElement() {
        return this.getTargetElement();
    }
    setSelection() {
        this.formatter.quill.setSelection(null);
    }
    onHide() { }
}
exports.default = BlotSpec;
