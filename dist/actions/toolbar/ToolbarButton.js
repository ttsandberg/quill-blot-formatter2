"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ToolbarButton {
    action;
    icon;
    onClick;
    options;
    element = null;
    initialVisibility = true; // preset visibility before button is created
    constructor(action, onClickHandler, options) {
        this.action = action;
        this.icon = options.icons[action];
        this.onClick = onClickHandler;
        this.options = options;
    }
    create() {
        this.element = document.createElement('span');
        this.element.innerHTML = this.icon;
        this.element.className = this.options.buttonClassName;
        this.styleButton();
        this.element.dataset.action = this.action;
        this.selected = this.preselect();
        this.element.onclick = this.onClick;
        this.visible = this.initialVisibility;
        return this.element;
    }
    destroy() {
        if (this.element) {
            this.element.onclick = null;
            this.element.remove();
            this.element = null;
        }
    }
    preselect() {
        // override this with logic to show if button is selected (active) when loaded
        // someCriteria: boolean = true / false;
        // return someCriteria;
        return false;
    }
    get selected() {
        return this.element?.dataset.selected === 'true';
    }
    set selected(value) {
        if (this.element) {
            this.element.dataset.selected = `${value}`;
            value ?
                this.element.style.setProperty('filter', 'invert(20%)') :
                this.element.style.removeProperty('filter');
        }
    }
    get visible() {
        return this.element?.style.display !== 'none';
    }
    set visible(style) {
        if (this.element) {
            if (typeof style === 'boolean') {
                style = style ? 'inline-block' : 'none';
            }
            this.element.style.display = style;
        }
    }
    styleButton() {
        if (this.element) {
            if (this.options.buttonStyle) {
                Object.assign(this.element.style, this.options.buttonStyle);
            }
            if (this.options.svgStyle) {
                const childElement = this.element.children[0]; // Type assertion
                if (childElement) {
                    Object.assign(childElement.style, this.options.svgStyle);
                }
            }
        }
    }
}
exports.default = ToolbarButton;
