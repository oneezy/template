<script>
	let {
		address,
		width = '100%',
		height = '100%',
		language = 'en',
		mapType = '',
		zoom = 15,
		layer = '',
		panoramic = '',
		point = '',
		...props
	} = $props();

	let googleMapSrc = $state(
		`https://maps.google.com/maps?width=${width}&height=${height}&hl=${language}&q=${encodeURIComponent(address)}&t=${mapType}&z=${zoom}&ie=UTF8&output=embed`
	);

	if (layer) googleMapSrc += `&layer=${layer}`;
	if (panoramic) googleMapSrc += `&layer=c&cbp=12,${panoramic},,0,5`;
	if (point) googleMapSrc += `&ll=${point}`;
</script>

<iframe
	class="h-full w-full {props.class}"
	title="Google Map"
	frameborder="0"
	scrolling="no"
	marginheight="0"
	marginwidth="0"
	loading="lazy"
	allowfullscreen
	src={googleMapSrc}
></iframe>

<style>
	iframe {
		width: 100%;
		height: 100%;
		border: none;
	}
</style>
