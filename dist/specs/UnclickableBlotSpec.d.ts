import BlotSpec from './BlotSpec';
import BlotFormatter from '../BlotFormatter';
type UnclickableProxy = {
    unclickable: HTMLElement;
    proxyImage: HTMLElement;
};
type UnclickableProxies = Record<string, UnclickableProxy>;
export default class UnclickableBlotSpec extends BlotSpec {
    selector: string;
    unclickable: HTMLElement | null;
    proxyContainer: HTMLElement;
    unclickableProxies: UnclickableProxies;
    isUnclickable: boolean;
    constructor(formatter: BlotFormatter);
    init(): void;
    observeEditorResize(): void;
    passWheelEventThrough: (event: WheelEvent) => void;
    getTargetElement(): HTMLElement | null;
    getOverlayElement(): HTMLElement | null;
    onTextChange: () => void;
    createUnclickableProxyImage(unclickable: HTMLElement): void;
    repositionProxyImages(): void;
    onProxyImageClick: (event: MouseEvent) => void;
    createProxyContainer(): HTMLElement;
}
export {};
