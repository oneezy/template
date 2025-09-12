<script>
	import { Image } from '$lib';
	let {
		id = 1,
		image = '/photos/team/Kayla-P.png',
		name = 'Brittany H.',
		position = 'Dental Hygienist',
		children = null,
		...props
	} = $props();
</script>

<div class={props.class}>
	<Image
		{id}
		src={image ? image : undefined}
		alt={name}
		class="relative w-56 rounded-lg shadow-lg"
		cover
		ratio="12/16"
	>
		<div class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
		<div class="absolute inset-0 grid items-end justify-center p-4 text-white">
			<div class="text-center">
				<h2 class="text-xl font-bold">{name}</h2>
				<p class="text-md">{position}</p>
			</div>
		</div>
	</Image>
</div>
