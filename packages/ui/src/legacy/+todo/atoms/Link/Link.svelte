<script>
	import { page } from '$app/stores';
	let {
		classLink,
		classLinkBar = 'bg-accent absolute right-0 bottom-[-10px] left-0 h-1 w-full rounded-full opacity-0',
		classLinkActive,
		classLinkActiveBar = 'opacity-100',
		bar,
		slug,
		href,
		label,
		active,
		state,
		children,
		...props
	} = $props();

	const isExternalLink = href && (href.includes('http://') || href.includes('https://'));
</script>

{#snippet linkEl()}
	<a
		{...props}
		href={href ? href : '/'}
		class="relative {classLink} {props.class}"
		aria-current={$page.url.pathname === href && $page.url.pathname !== '/' ? true : undefined}
		target={isExternalLink ? '_blank' : undefined}
	>
		{#if label}
			{label}
		{:else}
			{@render children()}
		{/if}
		{#if bar}
			<b class="{classLinkBar} bar"></b>
		{/if}
	</a>
{/snippet}

{@render linkEl()}
