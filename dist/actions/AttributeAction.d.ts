import Action from './Action';
import BlotFormatter from '../BlotFormatter';
type AltTitleModal = {
    element: HTMLDivElement;
    form: HTMLFormElement;
    altInput: HTMLTextAreaElement;
    titleInput: HTMLTextAreaElement;
    cancelButton: HTMLButtonElement;
};
export default class AttributeAction extends Action {
    modal: AltTitleModal;
    targetElement: HTMLElement | null | undefined;
    constructor(formatter: BlotFormatter);
    onCreate(): void;
    onDestroy(): void;
    onClickHandler: EventListener;
    showAltTitleModal(): void;
    hideAltTitleModal(): void;
    setAltTitle(): void;
    createModal(): AltTitleModal;
}
export {};
