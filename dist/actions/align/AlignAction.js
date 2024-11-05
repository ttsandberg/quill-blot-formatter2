"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Action_1 = __importDefault(require("../Action"));
const DefaultAligner_1 = __importDefault(require("./DefaultAligner"));
const ToolbarButton_1 = __importDefault(require("../toolbar/ToolbarButton"));
class AlignAction extends Action_1.default {
    aligner;
    alignButtons = {};
    constructor(formatter) {
        super(formatter);
        this.aligner = new DefaultAligner_1.default(formatter);
    }
    createAlignmentButtons() {
        for (const alignment of Object.values(this.aligner.alignments)) {
            this.alignButtons[alignment.name] = new ToolbarButton_1.default(alignment.name, this.onClickHandler, this.formatter.options.toolbar);
        }
        const targetBlot = this.formatter.currentSpec?.getTargetBlot();
        if (targetBlot) {
            const alignment = this.aligner.getAlignment(targetBlot);
            if (alignment && this.alignButtons[alignment]) {
                this.alignButtons[alignment].preselect = () => { return true; };
            }
        }
    }
    clearButtons() {
        for (const button of Object.values(this.alignButtons)) {
            button.selected = false;
        }
    }
    onClickHandler = (event) => {
        const button = event.target.closest(`span.${this.formatter.options.toolbar.buttonClassName}`);
        if (!!button) {
            const action = button.dataset.action || '';
            const targetBlot = this.formatter.currentSpec?.getTargetBlot();
            if (!!action && !!targetBlot) {
                const alignment = this.aligner.alignments[action];
                this.clearButtons();
                if (this.aligner.isAligned(targetBlot, alignment)) {
                    this.aligner.clear(targetBlot);
                }
                else {
                    this.aligner.setAlignment(targetBlot, action);
                    this.alignButtons[action].selected = true;
                }
            }
        }
        this.formatter.update();
    };
    onCreate() {
        this.createAlignmentButtons();
        this.toolbarButtons = Object.values(this.alignButtons);
    }
    onDestroy() {
        this.alignButtons = {};
        this.toolbarButtons = [];
    }
}
exports.default = AlignAction;
