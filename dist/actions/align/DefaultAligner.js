"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const quill_1 = __importDefault(require("quill"));
const AlignFormats_1 = require("./AlignFormats");
const parchment = quill_1.default.import('parchment');
const { Scope } = parchment;
class DefaultAligner {
    alignments = {};
    options;
    formatter;
    constructor(formatter) {
        this.formatter = formatter;
        this.options = formatter.options;
        this.options.align.alignments.forEach(alignment => {
            this.alignments[alignment] = {
                name: alignment,
                apply: (blot) => {
                    this.setAlignment(blot, alignment);
                },
            };
        });
    }
    getAlignments() {
        return Object.keys(this.alignments).map(k => this.alignments[k]);
    }
    clear(blot) {
        if (blot != null) {
            if (blot.domNode.tagName === 'IMG') {
                if (blot.parent !== null && blot.parent.domNode.tagName === 'SPAN') {
                    blot.parent.format(AlignFormats_1.ImageAlign.attrName, false);
                }
            }
            else if (blot.domNode.tagName === 'IFRAME') {
                blot.format(AlignFormats_1.IframeAlign.attrName, false);
            }
        }
    }
    isInlineBlot(blot) {
        return (blot.statics?.scope & Scope.INLINE) === Scope.INLINE_BLOT;
    }
    isBlockBlot(blot) {
        return (blot.statics?.scope & Scope.BLOCK) === Scope.BLOCK_BLOT;
    }
    hasInlineScope(blot) {
        return (blot.statics.scope & Scope.INLINE) === Scope.INLINE;
    }
    hasBlockScope(blot) {
        return (blot.statics.scope & Scope.BLOCK) === Scope.BLOCK;
    }
    isAligned(blot, alignment) {
        // true if blot is aligned, if alignment specfied then true only if alignment matches
        const thisAlignment = this.getAlignment(blot);
        if (alignment) {
            return thisAlignment === alignment.name;
        }
        else {
            return (!!thisAlignment);
        }
    }
    getAlignment(blot) {
        return blot.domNode.dataset.blotAlign;
    }
    setAlignment(blot, alignment) {
        if (blot != null) {
            const hasAlignment = this.isAligned(blot, this.alignments[alignment]);
            this.clear(blot);
            if (!hasAlignment) {
                if (this.isInlineBlot(blot) || this.hasInlineScope(blot)) {
                    // if no width attr and use relative mandatory, try to set relative width attr
                    if (!blot.domNode.getAttribute('width') &&
                        this.formatter.options.resize.useRelativeSize &&
                        !this.formatter.options.resize.allowResizeModeChange) {
                        try {
                            const editorStyle = getComputedStyle(this.formatter.quill.root);
                            const editorWidth = this.formatter.quill.root.clientWidth -
                                parseFloat(editorStyle.paddingLeft) -
                                parseFloat(editorStyle.paddingRight);
                            blot.domNode.setAttribute('width', `${Math.min(Math.round(100 * blot.domNode.naturalWidth / editorWidth), 100)}%`);
                        }
                        catch { }
                    }
                    blot.format(AlignFormats_1.ImageAlign.attrName, {
                        align: this.alignments[alignment].name,
                        title: blot.domNode.getAttribute('title') || ''
                    });
                }
                else if (this.isBlockBlot(blot) || this.hasBlockScope(blot)) {
                    blot.format(AlignFormats_1.IframeAlign.attrName, this.alignments[alignment].name);
                }
            }
        }
    }
}
exports.default = DefaultAligner;
