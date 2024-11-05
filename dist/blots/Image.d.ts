declare const ImageBlot: any;
declare class Image extends ImageBlot {
    static formats(domNode: Element): Record<string, string | null>;
    format(name: string, value: string): void;
}
export default Image;
