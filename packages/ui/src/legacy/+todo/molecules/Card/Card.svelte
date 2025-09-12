<script>
	import { Base, Link, Avatar, Rating } from '$lib';
	let {
		classCard,
		name = '',
		image = '',
		rating = '',
		description = '',
		reviews = [],
		href,
		icon,
		title,
		card,
		review,
		children = null,
		...props
	} = $props();
</script>

{#snippet iconEl()}
	<svg class="text-secondary size-14" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 32 32">
		<path
			fill="currentColor"
			fill-rule="evenodd"
			clip-rule="evenodd"
			d="M23.37 23.68c.27-1.71.33-3.4.32-5.13-.02-1.05-.32-3.34-.32-3.34s3.01-4.14 1.93-7.72c0 0-.57-3.19-4.73-2.22a59.75 59.75 0 0 0-5.37 1.97c-1.77.52-2.2-.15-2.2-.15-.76-.99 1.95-.6 1.95-.6-1.87-1.94-5.02-1.43-5.02-1.43-4.45.8-3.06 7.38-.89 10.17a25.87 25.87 0 0 0-.31 4.69c.02 1.31.13 2.62.43 3.9l.06.27c.2.9.61 2.82 1.42 2.9.75.08 1.09-1.61 1.2-2.22l.02-.07a26.42 26.42 0 0 1 1.51-5.14c.42-1 1.18-2.8 2.48-2.8 3.04 0 4.91 8.6 4.91 8.6l.07.3c.15.7.38 1.75 1.17 1.17.34-.25.6-.6.78-.97a7.6 7.6 0 0 0 .59-2.18ZM20.62 6.95s2.92 2.88.45 6.8c0 0 5.84-4.63-.45-6.8Z"
		/>
	</svg>
{/snippet}

<!-- Template -->
{#snippet template()}
	<Link
		href="#"
		class="card rounded-box preset-glass align-center grid max-w-xs place-items-center items-center justify-center border p-6 text-center shadow {classCard}"
	>
		{#if children}
			{@render children()}
		{:else}
			{@render iconEl()}
		{/if}

		<h3 class="mb-3 text-nowrap text-2xl font-medium">Meet Our Doctor</h3>
		<p class="text-neutral-500-300 text-balance" resizable>
			Trusted local dentist in Beaumont, providing expert and compassionate care.
		</p>
	</Link>
{/snippet}

<!-- Card -->
{#snippet cardEl()}
	{#if href}
		<Link
			{href}
			class="card rounded-box {classCard
				? classCard
				: 'preset-glass border'} align-center grid-cols-auto grid place-items-center items-center justify-center p-6 text-center shadow {classCard}"
		>
			{#if children}
				{@render children()} <!-- Render children if provided -->
			{:else}
				{@render iconEl()}
			{/if}

			<h3 class="mb-3 text-nowrap text-2xl font-medium">{title}</h3>
			<p class="text-neutral-500-300 text-balance">
				{description}
			</p>
		</Link>
	{:else}
		<div
			class="card rounded-box {classCard
				? classCard
				: 'preset-glass border'} align-center grid-cols-auto grid place-items-center items-center justify-center p-6 text-center shadow {classCard}"
		>
			{#if children}
				{@render children()} <!-- Render children if provided -->
			{:else}
				{@render iconEl()}
			{/if}

			<h3 class="mb-3 text-nowrap text-2xl font-medium">{title}</h3>
			<p class="text-neutral-500-300 text-balance">
				{description}
			</p>
		</div>
	{/if}
{/snippet}

<!-- Review -->
{#snippet reviewEl({ description, name, rating, image })}
	<section
		{...props}
		class="rounded-box preset-glass grid place-items-start items-start justify-start p-8 {props.class}"
	>
		<!-- Icon -->
		<div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="currentColor"
				class="text-neutral-300-700 mb-4 block h-5 w-5"
				viewBox="0 0 975.036 975.036"
			>
				<path
					d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"
				></path>
			</svg>

			<!-- Review -->
			<p class="mb-6 text-pretty leading-relaxed">{description}</p>
		</div>

		<a href="#testimonials" class="flex items-center">
			<!-- Profile -->
			<Avatar src={image} alt={name} class="h-20 w-20" />
			<div class="flex-grow flex flex-col pl-4">
				<!-- Rating -->
				<Rating {rating} />
				<!-- Name -->
				<span class="title-font font-medium text-gray-900">{name}</span>
			</div>
		</a>
	</section>
{/snippet}

<Base {...props} class={props.class}>
	{#if card}
		{@render cardEl()}
	{:else if review}
		{@render reviewEl(description, name, rating, image)}
	{:else}
		{@render cardEl()}
	{/if}
</Base>
