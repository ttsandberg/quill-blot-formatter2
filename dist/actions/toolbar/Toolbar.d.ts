import BlotFormatter from "../../BlotFormatter";
import ToolbarButton from "./ToolbarButton";
export default class Toolbar {
    formatter: BlotFormatter;
    element: HTMLElement;
    buttons: Record<string, ToolbarButton>;
    constructor(formatter: BlotFormatter);
    create(): void;
    destroy(): void;
}
