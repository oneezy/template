<script lang="ts">
	import {
		Button,
		mq,
		Icon,
		Divider,
		Content,
		Section,
		Container,
		Card,
		Image,
		Title,
		Text,
		Number,
		Toggle,
		Flex
	} from '@layerd/ui';
	import { getIcons } from '$lib/icons.remote';

	// Team
	const teamMembers = [
		{
			id: 1,
			title: 'Capt. Cezary Poninski',
			subtitle: 'Managing Partner',
			image: '/team/cezary-poninski.png'
		},
		{
			id: 2,
			title: 'Duncan Cooke',
			subtitle: 'Project Engineer',
			image: '/team/duncan-cooke.png'
		},
		{
			id: 3,
			title: 'Michael Boone',
			subtitle: 'Business Development',
			image: '/team/michael-boone.png'
		},
		{
			id: 4,
			title: 'Capt. Hector Ramirez',
			subtitle: 'Managing Partner',
			image: '/team/hector-ramirez.png'
		}
	];

	// FAQ
	const faqs = [
		{
			id: 1,
			label: 'What is Layerd?',
			content:
				'Layerd is a Svelte component library that provides a set of pre-designed and customizable UI components to help developers build modern web applications quickly and efficiently.'
		},
		{
			id: 2,
			label: 'How do I install Layerd?',
			content:
				"You can install Layerd using npm or pnpm. Run 'pnpm add @layerd/ui' in your project directory to get started."
		},
		{
			id: 3,
			label: 'Is Layerd compatible with SvelteKit?',
			content:
				'Yes! Layerd is specifically designed to work seamlessly with SvelteKit projects and follows SvelteKit conventions.'
		},
		{
			id: 4,
			label: 'Can I customize the components?',
			content:
				'Absolutely! All Layerd components are highly customizable through props, CSS variables, and custom styling approaches.'
		},
		{
			id: 5,
			label: 'What about TypeScript support?',
			content:
				'Layerd is built with TypeScript and provides full type definitions for all components and their props.'
		}
	];

	// Partners
	const partnerLogos = [
		{
			name: 'BNSF Logistics',
			img: '/partners/bnsf-logistics.svg'
		},
		{
			name: 'CSX Corporation',
			img: '/partners/csx-coporation.svg'
		},
		{
			name: 'DS Nordon',
			img: '/partners/ds-nordon.svg'
		},
		{
			name: 'Mitsubishi Power',
			img: '/partners/mitsubishi-power.svg'
		},
		{
			name: 'QSL',
			img: '/partners/qsl-logo.svg'
		}
	];

	// Stats
	const stats = [
		{ value: 100, label: 'Years' },
		{ value: 5, label: 'Continents' },
		{ value: 11, label: 'Locations' },
		{ value: 69, label: 'Ports' }
	];
</script>

<!-- HERO 
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: -->
<Section
	id="Home"
	class="z-2 flex min-h-svh flex-col items-center"
>
	<!-- hero content
	------------------------------------------>
	<Container class="flex select-none flex-col items-center justify-around gap-14">
		<!-- title -->
		<div class="text-light-light flex flex-col gap-2 text-center">
			<h1 class="order-2 text-balance text-xl font-bold leading-tight lg:text-6xl">
				<span>We are Port Captains, Surveyors and Transport Engineers</span>
			</h1>
			<h2 class="text-base-200 order-1 text-[x-small] uppercase tracking-widest lg:text-sm">
				Logistics Support Partner
			</h2>

			<!-- stats -->
			<div
				id="stats"
				class="order-3 flex items-center justify-center gap-6 py-8 text-center lg:gap-8"
			>
				{#each stats as stat}
					<section class="flex flex-col gap-2">
						<Number
							class="text-base-50 font-mono text-4xl font-bold md:text-4xl"
							data-target={stat.value}>{stat.value}</Number
						>
						<Text
							class="text-base-200 text-[x-small] uppercase lg:text-xs"
							h4={stat.label}
						/>
					</section>
				{/each}
			</div>
		</div>

		<!-- buttons -->
		<div class="flex w-full gap-2 lg:w-auto lg:gap-6">
			<Button
				size={mq.md ? 'xl' : 'md'}
				primary
				label="Learn More"
				class="w-full flex-1 lg:min-w-72"
				href="#"
			/>
			<Button
				size={mq.md ? 'xl' : 'md'}
				reverse
				label="Contact Sales"
				class="bg-base-950-950 text-light-light w-full flex-1 lg:min-w-72"
				href="#"
			/>
		</div>
	</Container>

	<!-- photo vignette 
	------------------------------------------>
	<Image
		src="/photos/houston-night.jpg"
		bg="fixed"
		overlay="bg-radial -from-black to-black to-85%"
	/>

	<!-- bottom black radial 
	------------------------------------------>
	<Image
		bg
		class="mask-t-from-0% mask-t-to-50% origin-bottom overflow-hidden"
		overlay="bg-radial from-transparent to-black from-0% to-100% scale-x-125"
	/>

	<!-- GRADIENT WRAPPER
	------------------------------------------>
	<div
		class="-z-1 scale-y-60 pointer-events-none absolute inset-0 top-auto isolate size-full origin-bottom blur-xl"
	>
		<!-- top blue radial -->
		<Image
			bg
			class="mask-t-from-0% mask-t-to-70% absolute top-0 size-full overflow-hidden"
			overlay="bg-radial from-transparent to-primary from-20% to-100% "
		/>

		<!-- bottom blue radial -->
		<Image
			bg
			class="mask-b-from-0% mask-b-to-70% top-full size-full overflow-hidden"
			overlay="bg-radial from-transparent to-primary from-20% to-100% "
		/>
	</div>
</Section>

<!-- TRUSTED BY 
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: -->
<Section
	id="Partners"
	class="bg-dark-dark text-light-light z-0 flex flex-col pt-20"
	container="!gap-10"
	divider="bottom"
	dividerBottom={{ svg: 'text-light-light' }}
>
	<Text
		class="text-base-300 text-center"
		h4="Trusted by over 200+ industry leaders"
		icon={false}
	/>

	<!-- partners -->
	<Container class="flex select-none flex-col items-center justify-around gap-14 pb-20 text-white ">
		<div class="grid grid-cols-2 gap-8 text-white invert md:grid-cols-3 lg:grid-cols-5 lg:gap-x-20">
			{#each partnerLogos as partner}
				<img
					src={partner.img}
					alt={partner.name}
					class="h-16 w-auto max-w-32 shrink-0 object-contain"
				/>
			{/each}
		</div>
	</Container>
</Section>

<!-- ABOUT 
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: -->
<Section
	divider
	class="flex flex-col"
>
	<Title
		id="About"
		title="Trident Cubed"
		subtitle="We are masters in the industry"
	/>

	<!-- team 
	------------------------------------------>
	<div class="team-container">
		{#each teamMembers as team (team.id)}
			<Card
				variant="profile"
				{...team}
			/>
		{/each}
	</div>

	<!-- about 
	------------------------------------------>
	<Container
		total="3"
		class="flex flex-col items-center justify-between gap-20 lg:flex-row even:lg:flex-row-reverse"
	>
		<Content
			type="text"
			class="w-full"
		/>
		<Image
			class="aspect-video lg:aspect-square"
			src="/photos/houston-night.jpg"
			mask
			overlay="bg-radial from-transparent to-black from-20% to-100% "
		/>
	</Container>
</Section>

<!-- SERVICES 
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: -->
<Section
	divider
	class="bg-base-200-700 flex flex-col"
>
	<Title
		id="Services"
		title="Services"
		subtitle="We got the services bruh"
	/>
	<div class="services-container">
		<Card total="10" />
	</div>
</Section>

<!-- CONTACT 
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: -->
<Section>
	<Title
		id="Contact"
		title="Contact"
		subtitle="Hit us up"
	/>
	<Container class="flex flex-col items-center justify-center">hi mom</Container>
</Section>

<!-- FAQ 
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: -->
<Section
	divider
	dividerBottom={{ svg: 'text-base-950' }}
	class="bg-base-200-700 flex flex-col gap-5"
>
	<Title
		id="FAQ"
		title="FAQ"
		subtitle="Hit us up"
	/>
	<Content class="flex flex-col">
		{#each faqs as faq (faq.id)}
			<Toggle
				variant="panel"
				label={faq.label}
				class="border-base-300-700 border-b last:border-0"
				button={{
					icon: 'chevron-right',
					iconEndToggle: 'home',
					variant: 'text icon',
					width: 'full',
					padding: 'none',
					appearance: 'ghost',
					class: '!font-black !py-4  rounded-none hover:text-primary'
				}}
			>
				<p>{faq.content}</p>
			</Toggle>
		{/each}
	</Content>
</Section>

<!-- CTA 
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: -->
<Section
	invert
	class="flex flex-col !items-center !justify-center !py-0 text-center lg:!items-start lg:!justify-start lg:text-left"
	container="!gap-4 !pt-0 lg:px-0"
>
	<div class="flex flex-col items-center justify-between gap-10 lg:flex-row">
		<div class="flex flex-col gap-4">
			<Text
				class="noprose whitespace-nowrap text-balance text-4xl lg:text-pretty lg:text-6xl"
				h1="Ready to become a partner?"
			/>
			<Text
				class="max-w-1/2 text-balance"
				p="Sign up for a free account and start building your AI-powered applications today."
			/>
		</div>
		<Button
			size="xl"
			primary
			label="Contact Sales"
			class="min-w-72"
			href="#"
		/>
	</div>
</Section>

<style lang="postcss">
	@reference "@layerd/ui/ui.css";

	:global {
		.team-container,
		.services-container {
			@apply grid gap-10;
			grid-template-columns: repeat(auto-fill, minmax(25ch, 1fr));
		}
	}
</style>
