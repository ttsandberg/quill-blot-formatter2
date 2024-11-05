import BlotFormatter from '../BlotFormatter';
import ToolbarButton from './toolbar/ToolbarButton';
export default class Action {
    formatter: BlotFormatter;
    toolbarButtons: ToolbarButton[];
    constructor(formatter: BlotFormatter);
    onCreate(): void;
    onDestroy(): void;
    onUpdate(): void;
}
