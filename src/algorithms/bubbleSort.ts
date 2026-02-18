import type { SortingGenerator } from '../types/sorting';

export const bubbleSort: SortingGenerator = function* (list: number[]) {
    const len = list.length;
    // Standard bubble sort
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - i - 1; j++) {
            // Visualize comparison
            yield { type: 'compare', indices: [j, j + 1] };
            
            if (list[j]! > list[j + 1]!) {
                // Visualize swap
                yield { type: 'swap', indices: [j, j + 1] };
                
                // Perform swap in our local reference to keep it in sync
                [list[j], list[j + 1]] = [list[j + 1]!, list[j]!];
            }
        }
    }
    yield { type: 'done', indices: [] };
};
