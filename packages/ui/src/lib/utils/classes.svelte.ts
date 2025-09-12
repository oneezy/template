/**
 * Chainable class builder utility for conditional class management
 * Eliminates the need for manual classList.push() patterns
 */
class CreateClasses {
	private classes: string[] = [];

	/**
	 * Add a class if condition is true
	 * @param condition - When true, the className will be added
	 * @param className - CSS class to add
	 * @returns this (for chaining)
	 */
	is(condition: boolean, className: string): this {
		if (condition) this.classes.push(className);
		return this;
	}

	/**
	 * Add multiple classes conditionally
	 * @param conditions - Object where keys are class names and values are conditions
	 * @returns this (for chaining)
	 */
	addMap(conditions: Record<string, boolean>): this {
		Object.entries(conditions).forEach(([className, condition]) => {
			if (condition) this.classes.push(className);
		});
		return this;
	}

	/**
	 * Add a class unconditionally
	 * @param className - CSS class to add
	 * @returns this (for chaining)
	 */
	always(className: string): this {
		this.classes.push(className);
		return this;
	}

	/**
	 * Get the final class string
	 * @returns Space-separated class string
	 */
	toString(): string {
		return this.classes.join(" ");
	}

	/**
	 * Get the classes as an array
	 * @returns Array of class names
	 */
	toArray(): string[] {
		return [...this.classes];
	}

	/**
	 * Clear all classes
	 * @returns this (for chaining)
	 */
	clear(): this {
		this.classes = [];
		return this;
	}
}

/**
 * Create a new CreateClasses instance
 * @returns New CreateClasses for chaining
 */
export function createClasses(): CreateClasses {
	return new CreateClasses();
}
