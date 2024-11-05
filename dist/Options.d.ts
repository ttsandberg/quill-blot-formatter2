import BlotSpec from './specs/BlotSpec';
type Constructor<T> = new (...args: any[]) => T;
export type OverlayOptions = {
    className: string;
    style?: {
        [key: string]: any;
    } | null | undefined;
    sizeInfoStyle?: {
        [key: string]: any;
    } | null | undefined;
    labels?: {
        [key: string]: any;
    } | null | undefined;
};
export type ResizeOptions = {
    allowResizing: boolean;
    allowResizeModeChange: boolean;
    imageOversizeProtection: boolean;
    handleClassName: string;
    handleStyle?: {
        [key: string]: any;
    } | null | undefined;
    useRelativeSize: boolean;
    minimumWidthPx: number;
};
export type AlignOptions = {
    allowAligning: boolean;
    alignments: string[];
};
export type DeleteOptions = {
    allowKeyboardDelete: boolean;
};
export type ToolbarOptions = {
    icons: Record<string, string>;
    mainClassName: string;
    mainStyle?: {
        [key: string]: any;
    } | null | undefined;
    buttonStyle?: {
        [key: string]: any;
    } | null | undefined;
    buttonClassName: string;
    svgStyle?: {
        [key: string]: any;
    } | null | undefined;
};
type AltTitleModalOptions = {
    styles?: {
        modalBackground?: {
            [key: string]: any;
        } | null | undefined;
        modalContainer?: {
            [key: string]: any;
        } | null | undefined;
        label?: {
            [key: string]: any;
        } | null | undefined;
        textarea?: {
            [key: string]: any;
        } | null | undefined;
        submitButton?: {
            [key: string]: any;
        } | null | undefined;
        cancelButton?: {
            [key: string]: any;
        } | null | undefined;
    } | null | undefined;
    icons: {
        submitButton: string;
        cancelButton: string;
    };
    labels: {
        alt: string;
        title: string;
    };
};
export type CompressorOptions = {
    jpegQuality: number;
    maxWidth?: number | null;
    styles?: {
        modalBackground?: {
            [key: string]: any;
        } | null | undefined;
        modalContainer?: {
            [key: string]: any;
        } | null | undefined;
        buttonContainer?: {
            [key: string]: any;
        } | null | undefined;
        buttons?: {
            [key: string]: any;
        } | null | undefined;
    } | null | undefined;
    text: {
        prompt: string;
        moreInfo: string | null;
        reducedLabel: string;
        nothingToDo: string;
    };
    icons: {
        continue: string;
        moreInfo: string;
        cancel: string;
    };
};
export type ImageOptions = {
    allowAltTitleEdit: Boolean;
    registerImageTitleBlot: Boolean;
    altTitleModalOptions: AltTitleModalOptions;
    registerArrowRightFix: Boolean;
    allowCompressor: Boolean;
    compressorOptions: CompressorOptions;
};
export type VideoOptions = {
    selector: string;
    registerCustomVideoBlot: Boolean;
    registerBackspaceFix: Boolean;
    defaultAspectRatio: string;
    proxyStyle: {
        [key: string]: any;
    };
};
export type Options = {
    specs: Array<Constructor<BlotSpec>>;
    overlay: OverlayOptions;
    align: AlignOptions;
    resize: ResizeOptions;
    delete: DeleteOptions;
    toolbar: ToolbarOptions;
    image: ImageOptions;
    video: VideoOptions;
};
declare const DefaultOptions: Options;
export default DefaultOptions;
