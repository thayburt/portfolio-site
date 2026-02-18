<script lang="ts">
  import AlgorithmVisualizer from './AlgorithmVisualizer.svelte';
  import { bubbleSort } from '../algorithms/bubbleSort';

  // Generate random lists
  const generateList = (len: number) => Array.from({ length: len }, () => Math.floor(Math.random() * 90) + 10);
  
  let list = generateList(20);
</script>

<div class="sorting-demos">
    <div class="demo-section">
        <h3>Bubble Sort</h3>
        <p>A simple comparison-based sorting algorithm.</p>
        <AlgorithmVisualizer algorithm={bubbleSort} list={list} speed={50} />
    </div>
</div>

<style>
    .sorting-demos {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }
    .demo-section {
        background: rgba(255, 255, 255, 0.03);
        padding: 1.5rem;
        border-radius: 8px;
        border: 1px solid var(--border-color);
    }
    h3 {
        margin-top: 0;
        color: var(--primary-accent);
    }
    p {
        color: var(--text-color);
        opacity: 0.8;
        margin-bottom: 1rem;
    }
</style>
