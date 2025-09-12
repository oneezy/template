// Service Card Examples
export const sampleCard = {
	cardVariant: "service" as const,
	title: "Headline",
	description: "Please add your content here. Keep it short and simple. ",
	label: "label",
};

export const serviceCardVariants = [
	{
		cardVariant: "service" as const,
		title: "Welcome Card",
		description: "A friendly greeting card for new users.",
		label: "new",
	},
	{
		cardVariant: "service" as const,
		title: "Feature Update",
		description: "Latest features and improvements to enhance your experience.",
		label: "update",
	},
	{
		cardVariant: "service" as const,
		title: "Pro Tip",
		description: "Expert advice to help you get the most out of our platform.",
		label: "tip",
	},
];

// Contact Card Examples
export const sampleContactCard = {
	cardVariant: "contact" as const,
	name: "Sarah Johnson",
	jobTitle: "Senior Software Engineer",
	department: "Engineering",
	avatar: "/static/photos/avatar-placeholder.jpg",
	location: "San Francisco, CA",
	email: "sarah.johnson@company.com",
	bio:
		"Passionate about building scalable applications and mentoring junior developers.",
	linkedin: "https://linkedin.com/in/sarah-johnson",
	github: "https://github.com/sarahjohnson",
	website: "https://sarahjohnson.dev",
	status: "available" as const,
};

export const contactCardVariants = [
	{
		cardVariant: "contact" as const,
		name: "Alex Rivera",
		jobTitle: "Product Designer",
		department: "Design",
		avatar: "/static/photos/avatar-placeholder.jpg",
		location: "New York, NY",
		bio: "Creating intuitive user experiences with a focus on accessibility.",
		linkedin: "https://linkedin.com/in/alex-rivera",
		status: "available" as const,
	},
	{
		cardVariant: "contact" as const,
		name: "Marcus Chen",
		jobTitle: "DevOps Engineer",
		department: "Infrastructure",
		avatar: "/static/photos/avatar-placeholder.jpg",
		location: "Austin, TX",
		email: "marcus.chen@company.com",
		bio: "Automating deployments and ensuring system reliability.",
		github: "https://github.com/marcuschen",
		twitter: "https://twitter.com/marcuschen",
		status: "busy" as const,
	},
	{
		cardVariant: "contact" as const,
		name: "Elena Rodriguez",
		jobTitle: "VP of Engineering",
		department: "Leadership",
		avatar: "/static/photos/avatar-placeholder.jpg",
		location: "Remote",
		phone: "+1 (555) 123-4567",
		bio: "Leading engineering teams to deliver innovative solutions.",
		linkedin: "https://linkedin.com/in/elena-rodriguez",
		website: "https://elenarodriguez.com",
		status: "away" as const,
	},
	{
		cardVariant: "contact" as const,
		name: "David Kim",
		jobTitle: "Junior Developer",
		department: "Engineering",
		avatar: "/static/photos/avatar-placeholder.jpg",
		location: "Seattle, WA",
		bio: "Learning and growing in full-stack development.",
		github: "https://github.com/davidkim",
		status: "offline" as const,
	},
];

// Combined examples for stories
export const cardVariants = [
	...serviceCardVariants,
	...contactCardVariants,
];
