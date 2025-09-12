<script>
	import { ModeWatcher, setMode, mode, toggleMode } from 'mode-watcher';
	import { Button } from '$lib';

	function handleModeChange() {
		if ($mode === 'light') {
			setMode('dark');
		} else {
			setMode('light');
		}
	}
</script>

<ModeWatcher />
<Button ghost icon onclick={handleModeChange}>
	{#if $mode === 'light'}
		<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
			><path
				fill="currentColor"
				d="M12 21q-3.75 0-6.375-2.625T3 12t2.625-6.375T12 3q.35 0 .688.025t.662.075q-1.025.725-1.638 1.888T11.1 7.5q0 2.25 1.575 3.825T16.5 12.9q1.375 0 2.525-.613T20.9 10.65q.05.325.075.662T21 12q0 3.75-2.625 6.375T12 21"
			/></svg
		>
	{:else}
		<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
			><path
				fill="currentColor"
				d="M11 5V1h2v4zm6.65 2.75l-1.375-1.375l2.8-2.875l1.4 1.425zM19 13v-2h4v2zm-8 10v-4h2v4zM6.35 7.7L3.5 4.925l1.425-1.4L7.75 6.35zm12.7 12.8l-2.775-2.875l1.35-1.35l2.85 2.75zM1 13v-2h4v2zm3.925 7.5l-1.4-1.425l2.8-2.8l.725.675l.725.7zM12 18q-2.5 0-4.25-1.75T6 12t1.75-4.25T12 6t4.25 1.75T18 12t-1.75 4.25T12 18"
			/></svg
		>
	{/if}
</Button>
<!-- 
<button class="btn btn-primary" onclick={() => setMode('light')}>Set Light Mode</button>
<button class="btn btn-primary" onclick={() => setMode('dark')}>Set Dark Mode</button> -->
