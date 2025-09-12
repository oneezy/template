import { ScrollState } from "runed";

export interface ScrollOptions {
	enabled?: boolean;
	idle?: number;
	offset?: {
		top?: number;
		bottom?: number;
		left?: number;
		right?: number;
	};
	/**
	 * Scroll behavior for programmatic scrolling
	 * @default 'auto'
	 */
	behavior?: ScrollBehavior;
	/**
	 * Callback for scroll events
	 */
	onScroll?: (e: Event) => void;
	/**
	 * Callback after scrolling stops
	 */
	onStop?: (e: Event) => void;
	/**
	 * Error handler
	 */
	onError?: (error: unknown) => void;
}

export class ScrollClass {
	private scrollState: ScrollState;

	/**
	 * Current scroll X position
	 */
	public get x() {
		return this.scrollState.x;
	}

	public set x(value: number) {
		this.scrollState.x = value;
	}

	/**
	 * Current scroll Y position
	 */
	public get y() {
		return this.scrollState.y;
	}

	public set y(value: number) {
		this.scrollState.y = value;
	}

	/**
	 * Scroll directions (which direction user is scrolling)
	 */
	public get directions() {
		return this.scrollState.directions;
	}

	/**
	 * Whether scroll has reached edges
	 */
	public get arrived() {
		return this.scrollState.arrived;
	}

	/**
	 * Scroll progress as percentages
	 */
	public get progress() {
		return this.scrollState.progress;
	}

	/**
	 * Whether currently scrolling
	 */
	public get isScrolling() {
		return this.scrollState.isScrolling;
	}

	/**
	 * Whether user has scrolled (any amount)
	 */
	public get hasScrolled() {
		return this.x > 0 || this.y > 0;
	}

	/**
	 * Whether user has scrolled down (useful for header transforms)
	 */
	public get hasScrolledDown() {
		return this.y > 0;
	}

	/**
	 * Whether user has scrolled to the top
	 */
	public get isAtTop() {
		return this.arrived.top;
	}

	/**
	 * Whether user has scrolled to the bottom
	 */
	public get isAtBottom() {
		return this.arrived.bottom;
	}

	/**
	 * Whether user has scrolled to the left
	 */
	public get isAtLeft() {
		return this.arrived.left;
	}

	/**
	 * Whether user has scrolled to the right
	 */
	public get isAtRight() {
		return this.arrived.right;
	}

	/**
	 * Whether user is scrolling up
	 */
	public get isScrollingUp() {
		return this.directions.top;
	}

	/**
	 * Whether user is scrolling down
	 */
	public get isScrollingDown() {
		return this.directions.bottom;
	}

	/**
	 * Whether user is scrolling left
	 */
	public get isScrollingLeft() {
		return this.directions.left;
	}

	/**
	 * Whether user is scrolling right
	 */
	public get isScrollingRight() {
		return this.directions.right;
	}

	constructor(
		elementGetter: () => HTMLElement | Window | Document | null | undefined,
		options: ScrollOptions = {},
	) {
		const {
			enabled = true,
			idle = 200,
			offset = {},
			behavior = "auto",
			onScroll,
			onStop,
			onError,
		} = options;

		// Create scroll state instance
		this.scrollState = new ScrollState({
			element: elementGetter,
			idle,
			offset,
			behavior,
			onScroll: enabled ? onScroll : undefined,
			onStop: enabled ? onStop : undefined,
			onError,
		});
	}

	/**
	 * Scroll to specific coordinates
	 */
	scrollTo(x: number, y: number) {
		this.scrollState.scrollTo(x, y);
	}

	/**
	 * Scroll to top
	 */
	scrollToTop() {
		this.scrollState.scrollToTop();
	}

	/**
	 * Scroll to bottom
	 */
	scrollToBottom() {
		this.scrollState.scrollToBottom();
	}
}

/**
 * Global scroll utilities that work without runed at module level
 * This is a lightweight approach that manually tracks scroll state
 */
class GlobalScrollState {
	private _x = $state(0);
	private _y = $state(0);
	private _isScrolling = $state(false);
	private _scrollTimeout: number | null = null;
	private _initialized = false;

	constructor() {
		// Initialize only in browser
		if (typeof window !== "undefined") {
			this.initializeScrollTracking();
		}
	}

	private initializeScrollTracking() {
		if (this._initialized) return;
		this._initialized = true;

		// Update scroll positions on scroll
		const handleScroll = () => {
			this._x = window.scrollX;
			this._y = window.scrollY;
			this._isScrolling = true;

			// Clear existing timeout
			if (this._scrollTimeout) {
				clearTimeout(this._scrollTimeout);
			}

			// Set timeout to mark scrolling as stopped
			this._scrollTimeout = window.setTimeout(() => {
				this._isScrolling = false;
			}, 150);
		};

		// Listen to scroll events
		window.addEventListener("scroll", handleScroll, { passive: true });

		// Initialize current values
		this._x = window.scrollX;
		this._y = window.scrollY;
	}

	get x() {
		return this._x;
	}
	get y() {
		return this._y;
	}
	get isScrolling() {
		return this._isScrolling;
	}

	get top() {
		return this._y === 0;
	}

	get down() {
		return this._y > 0;
	}

	get left() {
		return this._x === 0;
	}

	get right() {
		return this._x > 0;
	}

	get bottom() {
		if (typeof window === "undefined") return false;
		return Math.ceil(this._y + window.innerHeight) >=
			document.documentElement.scrollHeight;
	}

	get progress() {
		if (typeof window === "undefined") return { x: 0, y: 0 };

		const maxX = Math.max(
			0,
			document.documentElement.scrollWidth - window.innerWidth,
		);
		const maxY = Math.max(
			0,
			document.documentElement.scrollHeight - window.innerHeight,
		);

		return {
			x: maxX > 0 ? this._x / maxX : 0,
			y: maxY > 0 ? this._y / maxY : 0,
		};
	}

	get directions() {
		// For simplicity, we'll return false for directions
		// This would require tracking previous position to implement properly
		return {
			top: false,
			bottom: false,
			left: false,
			right: false,
		};
	}
}

/**
 * Global scroll state utilities for template usage
 * Usage: {#if scroll.top}...{/if} or <Header appearance={scroll.top ? 'ghost' : 'glass'}>
 *
 * This uses a lightweight implementation that doesn't rely on runed internally,
 * avoiding effect orphan errors while providing the same API.
 */
export const scroll = new GlobalScrollState();
