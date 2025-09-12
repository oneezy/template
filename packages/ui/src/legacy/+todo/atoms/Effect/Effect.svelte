<script>
	let {
		glass,
		gradient,
		linear = '135deg',
		radial = false,
		repeating = false,
		conic = false,
		back = false,
		front = false,
		animate = false,
		...props
	} = $props();

	let gradientStyle = $state('');

	if (gradient) {
		if (conic) {
			gradientStyle = `conic-gradient(${repeating ? 'repeating-' : ''}${gradient})`;
		} else if (radial) {
			gradientStyle = `radial-gradient(${repeating ? 'repeating-' : ''}${gradient})`;
		} else {
			gradientStyle = `linear-gradient(${linear}, ${repeating ? 'repeating-' : ''}${gradient})`;
		}
	} else {
		gradientStyle = 'linear-gradient(135deg, var(--to), var(--via), var(--from))';
	}
</script>

<div
	class="effect absolute inset-0 pointer-events-none {animate ? 'animate' : ' '} {back ? '-z-10' : front}  {props.class}"
	style="background-image: {gradientStyle};"
></div>

<style>
	.effect {
		--to: var(--color-theme-primary, rgba(255, 0, 0, 0.5));
		--via: trnsparent;
		--from: var(--color-theme-secondary, rgba(0, 0, 255, 0.5));
	}

	.animate {
		animation: gradientAnimation 5s linear infinite;
		background-size: 200% 100%;
	}

	@keyframes gradientAnimation {
		0% { background-position: 100% 0; }
		100% { background-position: -100% 0; }
	}
</style>
