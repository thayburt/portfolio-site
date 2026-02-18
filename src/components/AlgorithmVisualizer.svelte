<script lang="ts">
  import { flip } from 'svelte/animate';
  import { fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import type { SortingGenerator } from '../types/sorting';

  export let algorithm: SortingGenerator;
  export let list: number[] = [];
  export let speed: number = 300; // ms per step

  interface VisualItem {
    id: number;
    value: number;
    state: 'default' | 'compare' | 'swap' | 'move' | 'insert' | 'remove' | 'sorted';
  }

  let items: VisualItem[] = [];
  let nextId = 0;
  let isRunning = false;
  let isSorted = false;
  let maxValue = 1;

  // React to list prop changes
  $: {
    reset(list);
  }

  function reset(newList: number[]) {
    // Stop any running animation if possible (cleaner way would be an abort controller logic, 
    // but for now simple flag check in loop)
    isRunning = false; 
    isSorted = false;
    items = newList.map((val, i) => ({ id: i, value: val, state: 'default' }));
    nextId = newList.length;
    maxValue = Math.max(...newList, 1);
  }

  const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

  export async function run() {
    if (isRunning) return;
    
    // Reset to start state before running
    reset(list);
    
    isRunning = true;
    isSorted = false;

    // Create a working copy for the algorithm to mutate
    const algoList = items.map(i => i.value);
    const generator = algorithm(algoList);

    for (const step of generator) {
      if (!isRunning) break; // simplistic stop

      // Common: update max value if insert happened, though usually range is fixed.
      // If we insert a larger value, rescale.
      if (step.type === 'insert') {
          maxValue = Math.max(maxValue, step.value);
      }

      switch (step.type) {
        case 'compare': {
          const [i, j] = step.indices;
          if (items[i]) items[i].state = 'compare';
          if (items[j]) items[j].state = 'compare';
          items = items;
          await sleep(speed);
          
          if (items[i]) items[i].state = 'default';
          if (items[j]) items[j].state = 'default';
          items = items;
          break;
        }
        case 'swap': {
          const [i, j] = step.indices;
          if (items[i]) items[i].state = 'swap';
          if (items[j]) items[j].state = 'swap';
          items = items;
          await sleep(speed / 2);

          // Perform swap
          [items[i], items[j]] = [items[j]!, items[i]!];
          items = items;
          
          await sleep(speed); // Wait for flip animation
          
          if (items[i]) items[i].state = 'default';
          if (items[j]) items[j].state = 'default';
          items = items;
          break;
        }
        case 'move': {
           const [from, to] = step.indices;
           if (items[from]) items[from].state = 'move';
           items = items;
           await sleep(speed / 2);

           const [moved] = items.splice(from, 1);
           if (moved) {
               items.splice(to, 0, moved);
           }
           items = items;

           await sleep(speed);
           if (moved) moved.state = 'default';
           items = items;
           break;
        }
        case 'insert': {
            const [index] = step.indices;
            const val = step.value;
            const newItem: VisualItem = { id: nextId++, value: val, state: 'insert' };
            
            items.splice(index, 0, newItem);
            items = items; // trigger transition
            
            await sleep(speed);
            newItem.state = 'default';
            items = items;
            break;
        }
        case 'remove': {
            const [index] = step.indices;
            if (items[index]) {
                items[index].state = 'remove';
                items = items;
                await sleep(speed); // show red

                items.splice(index, 1);
                items = items;
                await sleep(speed); // wait for removal anim
            }
            break;
        }
        case 'done':
            break;
      }
    }

    isRunning = false;
    isSorted = true;
    items.forEach(i => i.state = 'sorted');
    items = items;
  }
</script>

<div class="visualizer-container">
    <div class="controls">
        <button class="btn" on:click={run} disabled={isRunning}>
            {isRunning ? 'Running...' : isSorted ? 'Restart' : 'Start Sorting'}
        </button>
    </div>

    <div class="chart-area">
        {#each items as item (item.id)}
            <div 
                class="bar-container"
                animate:flip={{ duration: speed, easing: cubicOut }}
                in:fly={{ y: 100, duration: speed }}
                out:fly={{ y: 100, duration: speed }}
                style="height: {(item.value / maxValue) * 100}%; width: {100 / items.length}%;"
            >
                <div 
                    class="bar {item.state}"
                    title="Value: {item.value}, Index: {items.indexOf(item)}"
                >
                    <span class="tooltip">{item.value}</span>
                </div>
            </div>
        {/each}
    </div>
</div>

<style>
    .visualizer-container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
        height: 400px;
        padding: 1rem;
        background: rgba(0, 0, 0, 0.2);
        border: 1px solid var(--border-color);
        border-radius: 8px;
    }

    .controls {
        display: flex;
        justify-content: center;
    }

    .chart-area {
        flex: 1;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        gap: 2px;
        position: relative;
        overflow: hidden;
    }

    .bar-container {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        position: relative;
    }

    .bar {
        width: 100%;
        height: 100%;
        background-color: var(--primary-accent, #c5a059);
        border-radius: 4px 4px 0 0;
        transition: background-color 0.2s;
        position: relative;
    }

    .bar.compare {
        background-color: #ffd700;
        box-shadow: 0 0 10px #ffd700;
    }

    .bar.swap {
        background-color: #ffa500;
    }

    .bar.move {
        background-color: #4caf50;
    }

    .bar.insert {
        background-color: #4caf50;
    }

    .bar.remove {
        background-color: #f44336;
    }

    .bar.sorted {
        background-color: #69f0ae;
    }

    .tooltip {
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        background: #333;
        color: #fff;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 0.8rem;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.2s;
        white-space: nowrap;
        margin-bottom: 5px;
        z-index: 10;
    }

    .bar:hover .tooltip {
        opacity: 1;
    }
</style>
