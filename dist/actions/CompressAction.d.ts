import Action from './Action';
import BlotFormatter from '../BlotFormatter';
import { CompressorOptions } from '../Options';
type CompressModal = {
    element: HTMLDivElement;
    moreInfoButton: HTMLButtonElement;
    moreInfoText: HTMLDivElement;
};
type ImageDetails = {
    naturalWidth: number;
    naturalHeight: number;
    targetWidth: number | null;
    targetHeight: number | null;
    size: number;
    canCompress: boolean;
};
export default class CompressAction extends Action {
    options: CompressorOptions;
    modal: CompressModal;
    targetElement: HTMLElement | null | undefined;
    imageDetails: ImageDetails | null;
    constructor(formatter: BlotFormatter);
    onCreate(): void;
    onDestroy(): void;
    onClickHandler: EventListener;
    showModal(): void;
    hideModal(): void;
    static isEligibleForCompression(targetElement: HTMLElement | null | undefined): boolean;
    parseDimensions(img: HTMLImageElement): [number | null, number | null];
    getImageSize(img: HTMLImageElement): number | null;
    displayFeedback(msg: string): void;
    getImageDetails(img: HTMLImageElement): ImageDetails;
    compressImage: (img: HTMLImageElement) => boolean;
    createModal(): CompressModal;
}
export {};
