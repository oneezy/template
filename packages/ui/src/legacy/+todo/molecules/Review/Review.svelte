<script>
	import { Card, Rating, Avatar } from '$lib';
	let {
		name = '',
		src = '',
		image = '',
		rating = '',
		description = '',
		reviews = [],
		children = null,
		...props
	} = $props();

	const dummyData = [
		{
			name: 'sum yung gui',
			rating: 5,
			description:
				'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.',
			src: '/photos/reviews/AprilWalker.png',
			image: '/photos/reviews/AprilWalker.png'
		},
		{
			name: 'mi wan sup',
			rating: 5,
			description:
				'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.',
			src: '/photos/reviews/CharlesMarie.png',
			image: '/photos/reviews/CharlesMarie.png'
		},
		{
			name: 'fu lon thyme',
			rating: 5,
			description:
				'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.',
			src: '/photos/reviews/ChasityCalcote.png',
			image: '/photos/reviews/ChasityCalcote.png'
		}
	];

	// Use dummy data if no props are provided
	if (reviews.length === 0 && !name && !src && !image && !rating && !description) {
		reviews = dummyData;
	}

	// Log the values
	console.log('Review component props:', { name, src, image, rating, description, reviews });
</script>

{#snippet reviewEl({ description, name, rating, image, src })}
	<Card
		{...props}
		class="text-left {props.class}"
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
			<p class="mb-6 text-pretty text-left leading-relaxed">{description}</p>
		</div>

		<a
			href="#testimonials"
			class="flex items-center text-left"
		>
			<!-- Profile -->
			<Avatar
				src={src || image}
				alt={name}
				class="h-20 w-20"
			/>
			<div class="flex flex-grow flex-col pl-4">
				<!-- Rating -->
				<Rating {rating} />
				<!-- Name -->
				<span class="title-font font-medium text-gray-900">{name}</span>
			</div>
		</a>
	</Card>
{/snippet}

{#if children}
	{@render children()}
{:else if reviews.length === 0 && (name || src || image || rating || description)}
	{@render reviewEl({ description, name, rating, src, image })}
{:else if reviews.length > 0}
	{#each reviews as review}
		{@render reviewEl({
			description: review.description,
			name: review.name,
			rating: review.rating,
			src: review.src,
			image: review.image
		})}
	{/each}
{:else}
	{@render reviewEl({ description, name, rating, src, image })}
{/if}
