/**
 * Sample data for Section component demonstrations
 */

export const sampleSections = [
	{
		title: "About Our Company",
		tagline: "We're passionate about creating amazing digital experiences",
		id: "about-section",
	},
	{
		title: "Our Services",
		tagline: "Comprehensive solutions tailored to your needs",
		id: "services-section",
	},
	{
		title: "Featured Products",
		tagline: "Discover our most popular offerings",
		id: "products-section",
	},
	{
		title: "Customer Testimonials",
		tagline: "What our clients say about working with us",
		id: "testimonials-section",
	},
	{
		title: "Get Started Today",
		tagline: "Ready to transform your business? Let's talk.",
		id: "cta-section",
	},
];

export const kitchenSinkContent = `
	<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
		<div class="bg-white p-6 rounded-lg shadow-md">
			<h3 class="text-xl font-semibold mb-3">Feature One</h3>
			<p class="text-gray-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.</p>
			<button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Learn More</button>
		</div>
		
		<div class="bg-white p-6 rounded-lg shadow-md">
			<h3 class="text-xl font-semibold mb-3">Feature Two</h3>
			<p class="text-gray-600 mb-4">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.</p>
			<button class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Explore</button>
		</div>
		
		<div class="bg-white p-6 rounded-lg shadow-md">
			<h3 class="text-xl font-semibold mb-3">Feature Three</h3>
			<p class="text-gray-600 mb-4">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.</p>
			<button class="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">Discover</button>
		</div>
	</div>
`;

export const testimonialContent = `
	<div class="max-w-4xl mx-auto">
		<blockquote class="text-center text-2xl italic mb-8">
			"This service completely transformed how we do business. The results speak for themselves."
		</blockquote>
		<div class="flex items-center justify-center space-x-4">
			<img src="https://via.placeholder.com/64" alt="Customer" class="w-16 h-16 rounded-full">
			<div>
				<div class="font-semibold">Sarah Johnson</div>
				<div class="text-gray-600">CEO, TechCorp</div>
			</div>
		</div>
	</div>
`;

export const ctaContent = `
	<div class="text-center max-w-2xl mx-auto">
		<p class="text-xl mb-8">Ready to take your business to the next level? Our team is here to help you succeed.</p>
		<div class="flex flex-col sm:flex-row gap-4 justify-center">
			<button class="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
				Get Started Now
			</button>
			<button class="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50">
				Learn More
			</button>
		</div>
	</div>
`;

export const statsContent = `
	<div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
		<div>
			<div class="text-4xl font-bold text-blue-600 mb-2">500+</div>
			<div class="text-gray-600">Happy Clients</div>
		</div>
		<div>
			<div class="text-4xl font-bold text-green-600 mb-2">1000+</div>
			<div class="text-gray-600">Projects Completed</div>
		</div>
		<div>
			<div class="text-4xl font-bold text-purple-600 mb-2">50+</div>
			<div class="text-gray-600">Team Members</div>
		</div>
		<div>
			<div class="text-4xl font-bold text-orange-600 mb-2">5</div>
			<div class="text-gray-600">Years Experience</div>
		</div>
	</div>
`;

// Sample intersection observer handlers
export const sampleIntersectionHandlers = {
	fadeIn: (isIntersecting: boolean, entry: IntersectionObserverEntry) => {
		if (isIntersecting) {
			console.log(`Section "${entry.target.id}" entered viewport`);
		}
	},

	analytics: (isIntersecting: boolean, entry: IntersectionObserverEntry) => {
		if (isIntersecting) {
			// Track section view in analytics
			console.log(`Analytics: Section viewed - ${entry.target.id}`);
		}
	},

	lazyLoad: (isIntersecting: boolean, entry: IntersectionObserverEntry) => {
		if (isIntersecting) {
			// Trigger lazy loading of section content
			console.log(`Lazy loading content for section: ${entry.target.id}`);
		}
	},
};
