<script>
	import { Link, Effect } from '$lib';
	let {
		name = 'LOGO',
		href,
		alt,
		src,
		svg,
		effect,
		shadow,
		strength = 2,
		opacity = '1',
		blur = '50',
		children,
		...props
	} = $props();

	// Generate the drop-shadow string
	let shadowString = `drop-shadow(rgba(0, 0, 0, ${opacity}) 0px 0px ${blur}px)`;

	// Create a filter string by repeating the shadowString based on strength
	let shadows = Array(strength).fill(shadowString).join(' ');
</script>

{#snippet imgContent()}
	<div {...props} class="relative {props.class}">
		{#if effect}
			<Effect
				{...props}
				class="blur-xl"
				gradient="var(--color-primary-800), transparent 100%, transparent"
				radial="0"
			/>
		{/if}
		<img
			{...props}
			{src}
			{alt}
			class="relative z-10 h-auto w-full"
			style="filter: {shadow ? shadows : 'none'}"
		/>
	</div>
{/snippet}

{#snippet linkContent({ children })}
	<Link {...props} {href} class={props.class}>
		{@render children()}
	</Link>
{/snippet}

{#snippet textContent()}
	<h2 {...props} class="text-4xl font-bold {props.class}">{name}</h2>
{/snippet}

{#if children}
	{@render children()}
{:else if src && href}
	{@render linkContent({ children: imgContent })}
{:else if src}
	{@render imgContent()}
{:else if href}
	{@render linkContent({ children: textContent })}
{:else}
	{@render textContent(name)}
{/if}
