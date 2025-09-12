<script>
	import { inview } from 'svelte-inview';
	import { activeSectionId } from '$ui';

	const options = { threshold: 0.5 };
	const handleEnter = (id) => ($activeSectionId = id);

	/* Props
	 *************************/
	export let id = null;
	export let state = null;

	/* Private Variables
	 *************************/
	let _default = `relative w-full min-h-[50vh]`;

	// State
	let _normal = `text-black dark:text-white`;
	let _active = `active section--active`;
	let _disabled = `opacity-50 cursor-not-allowed`;
	let _loading = ``;
</script>

<section
	{id}
	{...$$restProps}
	use:inview={options}
	on:enter={() => handleEnter(id)}
	class="{_default}

  {/* State
	 *************************/
	$activeSectionId === id
		? _active
		: state == 'disabled'
			? _disabled
			: state == 'loading'
				? _loading
				: state == 'normal'
					? _normal
					: _normal} 
  

  {/* Classes
	 *************************/
	$$props.class || ''}"
>
	<slot />
</section>
