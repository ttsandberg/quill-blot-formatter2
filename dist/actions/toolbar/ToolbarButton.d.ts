import { ToolbarOptions } from "../../Options";
export interface _ToolbarButton {
    action: string;
    element: HTMLElement | null;
    icon: string;
    selected: boolean;
    visible: boolean;
    onClick: EventListener;
    options: ToolbarOptions;
    create(action: string, icon: string): HTMLElement;
}
export default class ToolbarButton implements _ToolbarButton {
    action: string;
    icon: string;
    onClick: EventListener;
    options: ToolbarOptions;
    element: HTMLElement | null;
    initialVisibility: boolean;
    constructor(action: string, onClickHandler: EventListener, options: ToolbarOptions);
    create(): HTMLElement;
    destroy(): void;
    preselect(): boolean;
    get selected(): boolean;
    set selected(value: boolean);
    get visible(): boolean;
    set visible(style: string | boolean);
    private styleButton;
}
