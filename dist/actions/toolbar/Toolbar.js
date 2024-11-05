"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Toolbar {
    formatter;
    element;
    buttons = {};
    constructor(formatter) {
        this.formatter = formatter;
        this.element = document.createElement('div');
        this.element.classList.add(this.formatter.options.toolbar.mainClassName);
        this.element.addEventListener('mousedown', (event) => {
            event.stopPropagation();
        });
        if (this.formatter.options.toolbar.mainStyle) {
            Object.assign(this.element.style, this.formatter.options.toolbar.mainStyle);
        }
    }
    create() {
        const actionButtons = [];
        this.formatter.actions.forEach(action => {
            action.toolbarButtons.forEach(button => {
                this.buttons[button.action] = button;
                actionButtons.push(button.create());
            });
        });
        this.element.append(...actionButtons);
        this.formatter.overlay.append(this.element);
    }
    destroy() {
        if (this.element) {
            this.formatter.overlay.removeChild(this.element);
        }
        for (const button of Object.values(this.buttons)) {
            button.destroy();
        }
        this.buttons = {};
        this.element.innerHTML = '';
    }
}
exports.default = Toolbar;
