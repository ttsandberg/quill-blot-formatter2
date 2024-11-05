export declare const InlineBlot: any;
declare const ClassAttributor: any;
interface IframeAlignValue {
    align: string;
    width: string;
    relativeSize: string;
}
declare class IframeAlignAttributor extends ClassAttributor {
    constructor();
    add(node: Element, value: IframeAlignValue): boolean;
    remove(node: Element): void;
    value(node: Element): IframeAlignValue;
}
declare const IframeAlign: IframeAlignAttributor;
interface ImageAlignInputValue {
    align: string;
    title: string;
}
interface ImageAlignValue extends ImageAlignInputValue {
    width: string;
    contenteditable: string;
    relativeSize: string;
}
declare class ImageAlignAttributor extends ClassAttributor {
    constructor();
    add(node: Element, value: ImageAlignValue): boolean;
    remove(node: Element): void;
    value(node: Element): ImageAlignValue;
}
declare const ImageAlign: ImageAlignAttributor;
export { IframeAlign, ImageAlign };
