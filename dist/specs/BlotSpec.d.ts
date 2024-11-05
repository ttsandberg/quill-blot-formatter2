import BlotFormatter from '../BlotFormatter';
import Action from '../actions/Action';
export interface Blot {
    domNode: HTMLElement;
    parent: Blot | null;
    next: Blot | null;
    prev: Blot | null;
    statics: any | null;
    format(name: string, value: any): void | undefined;
    formats(): {
        [key: string]: any;
    };
    length(): number;
}
export default class BlotSpec {
    formatter: BlotFormatter;
    isUnclickable: boolean;
    constructor(formatter: BlotFormatter);
    init(): void;
    getActions(): Array<Action>;
    getTargetElement(): HTMLElement | null;
    getTargetBlot(): Blot | null;
    getOverlayElement(): HTMLElement | null;
    setSelection(): void;
    onHide(): void;
}
