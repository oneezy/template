<script>
	import { Link } from '$ui';

	export let links = [
		{ label: 'home', href: '/' },
		{ label: 'about', href: '/about' },
		{ label: 'contact', href: '/contact' }
	];
</script>

<nav
	class="flex flex-col items-center justify-center md:flex-row gap-6 capitalize {$$props.class ||
		''}"
>
	{#each links as link}
		<Link href={link.href} data-sveltekit-prefetch>
			{link.label}
		</Link>
	{/each}
</nav>
