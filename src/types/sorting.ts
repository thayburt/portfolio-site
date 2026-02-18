export interface CompareStep {
    type: 'compare';
    indices: [number, number];
}

export interface SwapStep {
    type: 'swap';
    indices: [number, number];
}

export interface MoveStep {
    type: 'move';
    indices: [number, number]; // [from, to]
}

export interface InsertStep {
    type: 'insert';
    indices: [number]; // [index]
    value: number; // Required for insert
}

export interface RemoveStep {
    type: 'remove';
    indices: [number]; // [index]
}

export interface DoneStep {
    type: 'done';
    indices: [];
}

export type Step = CompareStep | SwapStep | MoveStep | InsertStep | RemoveStep | DoneStep;
export type StepType = Step['type'];

export type SortingGenerator = (array: number[]) => Generator<Step, void, unknown>;