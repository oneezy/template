<script>
	let {
		reviews = [
			{
				author: 'sum yung gui',
				rating: 5,
				review: 'review',
				image: '/photos/reviews/profile.png'
			},
			{
				author: 'mi wan sup',
				rating: 5,
				review: 'review',
				image: '/photos/reviews/profile.png'
			},
			{
				author: 'fu lon thyme',
				rating: 5,
				review: 'review',
				image: '/photos/reviews/profile.png'
			}
		],
		children = null,
		...props
	} = $props();

	import { onMount } from 'svelte';

	const API_KEY = 'AIzaSyBsrx125n1-l5bqMJ_BennowHAgcrUxV6I';
	const PLACE_ID = 'ChIJx-FnYE_LPoYRubNNIk7tdn0';

	async function fetchReviews() {
		const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews&key=${API_KEY}`;
		const url2 = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=rating,user_ratings_total&key=${API_KEY}`;
		const response = await fetch(url2);
		const data = await response.json();
		reviews = data.result.reviews;
	}
	//maps.googleapis.com/maps/api/place/details/json?place_id=ChIJx-FnYE_LPoYRubNNIk7tdn0&fields=reviews&key=AIzaSyBsrx125n1-l5bqMJ_BennowHAgcrUxV6I
	https: $effect.pre(() => {
		fetchReviews();
	});
</script>

<div
	{...props}
	class="bg-neutral-950-50 text-neutral-50-950 rounded-base {props.class}"
>
	{#if children}
		{@render children()}
	{:else if typeof review === 'function'}
		{@render review()}
	{:else}
		{review}
	{/if}
</div>

<div>
	{#if reviews.length > 0}
		{#each reviews as review}
			<section class="body-font text-gray-600">
				<div class="h-full rounded bg-gray-100 p-8">
					<!-- Icon -->
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						class="mb-4 block h-5 w-5 text-gray-400"
						viewBox="0 0 975.036 975.036"
					>
						<path
							d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"
						></path>
					</svg>

					<!-- Review -->
					<p class="mb-6 leading-relaxed">
						Synth chartreuse iPhone lomo cray raw denim brunch everyday carry neutra before they
						sold out fixie 90's microdosing. Tacos pinterest fanny pack venmo, post-ironic heirloom
						try-hard pabst authentic iceland.
					</p>

					<a
						href="#review"
						class="inline-flex items-center"
					>
						<!-- Profile -->
						<img
							alt="testimonial"
							src="https://dummyimage.com/106x106"
							class="h-12 w-12 flex-shrink-0 rounded-full object-cover object-center"
						/>
						<span class="flex flex-grow flex-col pl-4">
							<!-- Name -->
							<span class="title-font font-medium text-gray-900">Holden Caulfield</span>
							<!-- Rating -->
							<span class="text-sm text-gray-500">UI DEVELOPER</span>
						</span>
					</a>
				</div>
			</section>
		{/each}
	{:else}
		<p>Loading reviews...</p>
	{/if}
</div>

<style>
	.review {
		border: 1px solid #ccc;
		padding: 1em;
		margin-bottom: 1em;
		border-radius: 5px;
	}
	.author {
		font-weight: bold;
	}
	.rating {
		color: gold;
	}
</style>
