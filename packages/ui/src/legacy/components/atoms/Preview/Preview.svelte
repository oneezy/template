<script>
	import { Container, Title} from '$lib';
	let { name = 'Preview', children = null, ...props } = $props();

	let classes =
		'preview relative rounded-lg flex min-h-[6rem] flex-wrap items-center justify-center gap-2 overflow-x-hidden p-4';
</script>

<Container>
	<Title subtitle={name} />
	<div {...props} class="{classes} {props.class}">
		{@render children()}
	</div>
</Container>

<style>
	.preview {
		border: 1px solid var(--color-neutral-200-600);
		background-image: repeating-linear-gradient(
			45deg,
			var(--color-neutral-100-900),
			var(--color-neutral-100-900) 13px,
			var(--color-neutral-200-700) 13px,
			var(--color-neutral-200-700) 14px
		);

		background-size: 40px 40px;
	}
</style>
