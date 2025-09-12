<script>
	import { observer, isObserving } from '$lib';
	import { Container } from '$lib';

	let target = $state(null);
	let root = $state(null);
	let isIntersecting = $state(false);

	isObserving(
		() => target,
		() => root,
		(value) => {
			isIntersecting = value;
			isHeaderActive = !isIntersecting;
		}
	);

	let {
		left = '⬜ header left',
		center = '⬜ header center',
		right = '⬜ header right',
		primary = false,
		headerClass,
		containerClass,
		leftClass,
		centerClass,
		rightClass,
		children = null,
		isHeaderActive = false, // Define the prop here
		...props
	} = $props();

	let classHeader = 'header w-full transition-all duration-500 z-20 translate-y-0 fixed top-0 left-0 right-0 p-6';
	let classContainer =
		'grid grid-cols-[auto_1fr_auto] justify-center lg:gap-4 lg:grid-cols-[200px_1fr_200px] py-1 px-6 lg:p-2 transition-opacity duration-500 preset-glass rounded-base';
	let classLeft = 'self-center justify-self-start';
	let classCenter = 'h-full items-center justify-center flex';
	let classRight = 'self-center justify-self-end';

	// active
	let classInactive = '';
	let classActive = 'translate-y-5';
</script>

<div
	{...props}
	class="{classHeader} 
	{isIntersecting ? classInactive : classActive} {props.class}"
>
	<Container
		class="{children ? '' : classContainer} {containerClass} {isIntersecting
			? 'pointer-events-none opacity-0 '
			: 'pointer-events-all opacity-100'}"
	>
		{#if children}
			{@render children({ isHeaderActive })}
		{:else}
			<section class="{classLeft} {leftClass}">
				{#if typeof left === 'function'}
					{@render left({ isHeaderActive })}
				{:else}
					{left}
				{/if}
			</section>
			<section class="{classCenter} {centerClass}">
				{#if typeof center === 'function'}
					{@render center({ isHeaderActive })}
				{:else}
					{center}
				{/if}
			</section>
			<section class="{classRight} {rightClass}">
				{#if typeof right === 'function'}
					{@render right({ isHeaderActive })}
				{:else}
					{right}
				{/if}
			</section>
		{/if}
	</Container>
</div>

<hr class="border-0 pb-20" bind:this={target} />
