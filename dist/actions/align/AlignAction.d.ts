import Action from '../Action';
import BlotFormatter from '../../BlotFormatter';
import DefaultAligner from './DefaultAligner';
import ToolbarButton from '../toolbar/ToolbarButton';
export default class AlignAction extends Action {
    aligner: DefaultAligner;
    alignButtons: Record<string, ToolbarButton>;
    constructor(formatter: BlotFormatter);
    createAlignmentButtons(): void;
    clearButtons(): void;
    onClickHandler: EventListener;
    onCreate(): void;
    onDestroy(): void;
}
