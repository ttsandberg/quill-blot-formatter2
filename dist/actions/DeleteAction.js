"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const quill_1 = __importDefault(require("quill"));
const Action_1 = __importDefault(require("./Action"));
class DeleteAction extends Action_1.default {
    onCreate() {
        document.addEventListener('keyup', this.onKeyUp, true);
        this.formatter.quill.root.addEventListener('input', this.onKeyUp, true);
    }
    onDestroy() {
        document.removeEventListener('keyup', this.onKeyUp, true);
        this.formatter.quill.root.removeEventListener('input', this.onKeyUp, true);
    }
    onKeyUp = (e) => {
        const modalOpen = !!document.querySelector('div[data-blot-formatter-modal]');
        if (!this.formatter.currentSpec || modalOpen) {
            return;
        }
        // delete or backspace
        if (e.code === 'Delete' || e.code === 'Backspace') {
            const targetElement = this.formatter.currentSpec.getTargetElement();
            if (targetElement) {
                const blot = quill_1.default.find(targetElement);
                if (blot) {
                    const index = this.formatter.quill.getIndex(blot);
                    this.formatter.quill.deleteText(index, 1, "user"); // Deletes 1 character from index position
                }
            }
            this.formatter.hide();
        }
    };
}
exports.default = DeleteAction;
