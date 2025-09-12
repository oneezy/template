<script>
	import { Link } from '$lib';

	let {
		row,
		col,
		links = [
			{ label: 'home', href: '/' },
			{ label: 'about', href: '/about' },
			{ label: 'contact', href: '/contact' },
			{ label: 'docs', href: '/docs' }
		],
		classLink = null,
		classLinkActive = null,
		children,
		...props
	} = $props();
</script>

<nav {...props} class="navigation flex h-full items-start {props.class}">
	{#each links as link}
		<Link
			bar
			{...props}
			class="flex items-center py-2 px-4 font-medium capitalize {row ? 'h-full' : ''}"
			href={link.href}
			label={link.label}
		/>
	{/each}
</nav>
