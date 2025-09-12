import { useIntersectionObserver } from "runed";

export interface ObserveOptions {
	/**
	 * Whether observation is enabled
	 * @default true
	 */
	enabled?: boolean;

	/**
	 * Intersection observer threshold
	 * @default 0.1
	 */
	threshold?: number;

	/**
	 * Root margin for intersection observer
	 * @default '0px 0px -50px 0px'
	 */
	rootMargin?: string;

	/**
	 * Root element for intersection observer
	 * @default null
	 */
	root?: HTMLElement | null;

	/**
	 * Section ID for navigation tracking
	 * @default undefined
	 */
	sectionId?: string;
}

// Global navigation state
class NavigationState {
	private elementObservers = new Map<
		string,
		{
			observer: ReturnType<typeof useIntersectionObserver>;
			element: HTMLElement;
		}
	>();
	private intersectingElements = new Map<string, number>(); // elementId -> intersectionRatio
	private _activeSection = $state<string | null>(null);
	private _currentHash = $state<string>("");
	private _stickyActiveSection = $state<string | null>(null);
	private registeredLinks = new Set<string>(); // Track which element IDs have corresponding links
	private isNavigating = false; // Flag to prevent intersection updates during navigation
	private navigationTimeout: ReturnType<typeof setTimeout> | null = null;

	constructor() {
		// Monitor URL hash changes
		if (typeof window !== "undefined") {
			this._currentHash = window.location.hash.slice(1);

			const updateHash = () => {
				const newHash = window.location.hash.slice(1);
				const previousHash = this._currentHash;
				this._currentHash = newHash;

				// If we have a new hash with a registered link
				if (newHash && this.registeredLinks.has(newHash)) {
					// Set navigation flag to prevent intersection updates from competing
					this.isNavigating = true;

					// Clear any existing navigation timeout
					if (this.navigationTimeout) {
						clearTimeout(this.navigationTimeout);
					}

					// Always update sticky active for registered links immediately
					this._stickyActiveSection = newHash;

					// Reset navigation flag after scroll animation would complete
					this.navigationTimeout = setTimeout(() => {
						this.isNavigating = false;
						this.navigationTimeout = null;
					}, 1000); // Give enough time for smooth scroll to complete
				} else if (!newHash && previousHash) {
					// Only clear sticky active if user explicitly removed the hash
					// and we're not currently viewing a section
					if (this.intersectingElements.size === 0) {
						this._stickyActiveSection = null;
					}
				}
			};

			window.addEventListener("hashchange", updateHash);
			window.addEventListener("popstate", updateHash);
		}
	}

	get activeSection() {
		return this._activeSection;
	}

	get currentHash() {
		return this._currentHash;
	}

	get stickyActiveSection() {
		return this._stickyActiveSection;
	}

	// Register a link and start observing the target element
	registerLink(targetId: string) {
		// Always add to registered links set (for link tracking)
		this.registeredLinks.add(targetId);

		// Find and observe the target element only if it exists
		if (typeof window !== "undefined") {
			const targetElement = document.getElementById(targetId);
			if (targetElement && !this.elementObservers.has(targetId)) {
				this.observeElement(targetId, targetElement);
			}
		}

		// Set initial sticky active if none exists and this is the first registered link
		this.initializeStickyActive();
	}

	// Initialize sticky active section if none exists
	private initializeStickyActive() {
		if (this._stickyActiveSection) return;

		// If we have a current hash that's registered, use it
		if (this._currentHash && this.registeredLinks.has(this._currentHash)) {
			this._stickyActiveSection = this._currentHash;
			return;
		}

		// Otherwise, set to the first registered link as default
		// This ensures the indicator always has somewhere to be
		const firstLink = Array.from(this.registeredLinks)[0];
		if (firstLink) {
			this._stickyActiveSection = firstLink;
		}
	}

	// Start observing a specific element
	private observeElement(elementId: string, element: HTMLElement) {
		const observer = useIntersectionObserver(
			() => element,
			(entries) => {
				const entry = entries[0];
				if (entry) {
					this.updateElementVisibility(
						elementId,
						entry.isIntersecting,
						entry.intersectionRatio,
					);
				}
			},
			{
				threshold: 0.1,
				rootMargin: "0px 0px -50px 0px",
			},
		);

		this.elementObservers.set(elementId, { observer, element });
	}

	// Update visibility state for an element
	updateElementVisibility(
		elementId: string,
		isIntersecting: boolean,
		intersectionRatio: number,
	) {
		// Only track elements that are actually intersecting AND have a meaningful ratio
		if (isIntersecting && intersectionRatio > 0) {
			this.intersectingElements.set(elementId, intersectionRatio);
		} else {
			this.intersectingElements.delete(elementId);
		}

		// Recalculate the most visible element
		this.updateMostVisibleElement();
	}

	private updateMostVisibleElement() {
		// Don't update during navigation to prevent competing with hash changes
		if (this.isNavigating) {
			return;
		}

		if (this.intersectingElements.size === 0) {
			this._activeSection = null;

			// DON'T clear sticky active when no elements are intersecting
			// This maintains the indicator position during scroll transitions
			// Only clear sticky active if we have a hash without target element
			if (
				this._currentHash && this.registeredLinks.has(this._currentHash) &&
				!this.hasTargetElement(this._currentHash)
			) {
				this._stickyActiveSection = this._currentHash;
			}
			// Keep existing stickyActiveSection if no special conditions
			return;
		}

		// Find the element with the highest intersection ratio
		let mostVisibleId = null;
		let highestRatio = 0;

		for (const [elementId, ratio] of this.intersectingElements) {
			if (ratio > highestRatio) {
				highestRatio = ratio;
				mostVisibleId = elementId;
			}
		}

		this._activeSection = mostVisibleId;

		// Update sticky active only when a new element becomes visible AND has a corresponding link
		if (mostVisibleId && this.registeredLinks.has(mostVisibleId)) {
			this._stickyActiveSection = mostVisibleId;
		}

		// Handle initial case: if we have a hash but no sticky active yet,
		// and the hash element becomes visible, then set it
		if (
			!this._stickyActiveSection && this._currentHash &&
			mostVisibleId === this._currentHash
		) {
			this._stickyActiveSection = this._currentHash;
		}
	}

	// Check if an element has a corresponding link
	hasLink(elementId: string): boolean {
		return this.registeredLinks.has(elementId);
	}

	// Check if a link has a valid target element
	hasTargetElement(targetId: string): boolean {
		if (typeof window === "undefined") return false;
		return document.getElementById(targetId) !== null;
	}

	// Check if a link is observing (has both link registration and target element)
	isObserving(targetId: string): boolean {
		return this.elementObservers.has(targetId);
	}

	// Clean up observer for a specific element
	unregisterLink(targetId: string) {
		this.registeredLinks.delete(targetId);
		const observerData = this.elementObservers.get(targetId);
		if (observerData) {
			observerData.observer.stop();
			this.elementObservers.delete(targetId);
			this.intersectingElements.delete(targetId);

			// If the unregistered element was active, recalculate
			if (this._activeSection === targetId) {
				this.updateMostVisibleElement();
			}
		}
	}
}

// Global singleton instance
export const navigationState = new NavigationState();

export class ObserveClass {
	private observer: ReturnType<typeof useIntersectionObserver>;
	private sectionId?: string;

	/**
	 * Whether the element is currently intersecting
	 */
	public isIntersecting = $state<boolean>(false);

	/**
	 * Current intersection entry
	 */
	public entry = $state<IntersectionObserverEntry | null>(null);

	constructor(
		elementGetter: () => HTMLElement | null | undefined,
		options: ObserveOptions = {},
	) {
		const {
			enabled = true,
			threshold = 0.1,
			rootMargin = "0px 0px -50px 0px",
			root = null,
			sectionId,
		} = options;

		this.sectionId = sectionId;

		// Register with navigation state if sectionId provided
		// Note: This is now handled by the link components directly
		// The ObserveClass is now just for basic intersection observation

		// Create intersection observer
		this.observer = useIntersectionObserver(
			elementGetter,
			(entries) => {
				// Only update state when observation is enabled
				if (!enabled) return;

				const currentEntry = entries[0];
				if (currentEntry) {
					this.entry = currentEntry;
					this.isIntersecting = currentEntry.isIntersecting;

					// For backwards compatibility, if sectionId is provided,
					// we can still update navigation state (though this is deprecated)
					if (this.sectionId) {
						navigationState.updateElementVisibility(
							this.sectionId,
							currentEntry.isIntersecting,
							currentEntry.intersectionRatio,
						);
					}
				}
			},
			{ threshold, rootMargin, root },
		);
	}

	/**
	 * Pause the intersection observer
	 */
	pause() {
		this.observer.pause();
	}

	/**
	 * Resume the intersection observer
	 */
	resume() {
		this.observer.resume();
	}

	/**
	 * Stop the intersection observer
	 */
	stop() {
		this.observer.stop();

		// Clean up navigation state if sectionId was provided
		if (this.sectionId) {
			navigationState.unregisterLink(this.sectionId);
		}
	}

	/**
	 * Check if the observer is currently active
	 */
	get isActive() {
		return this.observer.isActive;
	}
}
