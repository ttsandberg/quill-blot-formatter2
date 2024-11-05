import BlotFormatter from '../../BlotFormatter';
import { Aligner } from './Aligner';
import type { Alignment } from './Alignment';
import type { Blot } from '../../specs/BlotSpec';
import type { Options } from '../../Options';
export default class DefaultAligner implements Aligner {
    alignments: Record<string, Alignment>;
    options: Options;
    formatter: BlotFormatter;
    constructor(formatter: BlotFormatter);
    getAlignments(): Alignment[];
    clear(blot: Blot | null): void;
    isInlineBlot(blot: Blot): boolean;
    isBlockBlot(blot: Blot): boolean;
    hasInlineScope(blot: Blot): boolean;
    hasBlockScope(blot: Blot): boolean;
    isAligned(blot: Blot, alignment: Alignment | null): boolean;
    getAlignment(blot: Blot): string | undefined;
    setAlignment(blot: Blot | null, alignment: string): void;
}
