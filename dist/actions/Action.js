"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Action {
    formatter;
    toolbarButtons = [];
    constructor(formatter) {
        this.formatter = formatter;
    }
    onCreate() { }
    onDestroy() { }
    onUpdate() { }
}
exports.default = Action;
