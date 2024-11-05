"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UnclickableBlotSpec_1 = __importDefault(require("./UnclickableBlotSpec"));
class IframeVideoSpec extends UnclickableBlotSpec_1.default {
    constructor(formatter) {
        super(formatter);
    }
}
exports.default = IframeVideoSpec;
