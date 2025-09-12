<script>
	let theme = $state();

	$effect(() => {
		const savedTheme = $state(localStorage.getItem('theme'));
		document.documentElement.setAttribute('data-theme', savedTheme);
		theme = savedTheme;
	});

	function handleChange(event) {
		theme = event.target.id;
		document.documentElement.setAttribute('data-theme', theme);
		localStorage.setItem('theme', theme);
	}
</script>

<svelte:head>
	{#if theme}
		<script>
			const theme = localStorage.getItem('theme');
			document.documentElement.setAttribute('data-theme', theme);
		</script>
	{/if}
</svelte:head>

<form class="grid gap-4 p-4">
	<fieldset>
		<label>
			<input
				type="radio"
				name="theme"
				id="default"
				checked={theme === 'default'}
				onclick={handleChange}
			/>
			Default
		</label>
		<label>
			<input
				type="radio"
				name="theme"
				id="blue"
				checked={theme === 'blue'}
				onclick={handleChange}
			/>
			Blue
		</label>
		<label>
			<input type="radio" name="theme" id="red" checked={theme === 'red'} onclick={handleChange} />
			Red
		</label>
	</fieldset>
</form>
