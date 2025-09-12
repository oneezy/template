<svelte:head>
	<script>
		try {
			const parse = (k) => JSON.parse(localStorage.getItem(k) || 'null');
			const icons = parse('sync-attr:html:data-icons') || 'heroicons'; // Better default?
			const theme = parse('sync-attr:html:data-theme') || 'dracula';
			const dark = parse('sync-attr:html:class-dark') || '1';

			const de = document.documentElement;
			de.setAttribute('data-icons', icons);
			de.setAttribute('data-theme', theme);
			de.classList.toggle('dark', dark === '1');
			de.style.colorScheme = dark === '1' ? 'dark' : 'light';

			// Optional: Set a flag so components know initialization is complete
			de.setAttribute('data-sync-ready', '1');
		} catch (e) {
			// Fallback: apply defaults even if localStorage fails
			const de = document.documentElement;
			de.setAttribute('data-icons', 'heroicons');
			de.setAttribute('data-theme', 'dracula');
			de.classList.add('dark');
			de.style.colorScheme = 'dark';
		}
	</script>
</svelte:head>
