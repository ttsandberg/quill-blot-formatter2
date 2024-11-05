import BlotSpec from './BlotSpec';
import BlotFormatter from '../BlotFormatter';
import Action from '../actions/Action';
export default class ImageSpec extends BlotSpec {
    img: HTMLElement | null;
    constructor(formatter: BlotFormatter);
    init(): void;
    getActions(): Array<Action>;
    getTargetElement(): HTMLElement | null;
    onHide(): void;
    onClick: (event: MouseEvent) => void;
}
