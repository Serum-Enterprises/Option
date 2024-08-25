import { panic } from '@serum-enterprises/panic';

export abstract class Option<T> {
	/**
	 * Create a new Some variant of Option
	 */
	static Some<T>(value: T): Some<T> {
		return new Some(value);
	}

	/**
	 * Create a new None variant of Option
	 */
	static None(): None {
		return new None();
	}

	/**
	 * Check if this Option is of the Some variant
	 */
	isSome(): this is Some<T> {
		return (this instanceof Some);
	}

	/**
	 * Check if this Option is of the None variant
	 */
	isNone(): this is None {
		return (this instanceof None);
	}

	/**
	 * Check if this Option is of the Some variant and the predicate returns true
	 */
	isSomeAnd(predicate: (value: T) => boolean): this is Some<T> & ReturnType<typeof predicate> {
		return (this instanceof Some) && predicate(this.expectSome());
	}

	/**
	 * Unwrap the value if this Option is of the Some variant, otherwise panic with the provided error
	 */
	abstract expectSome(error: Error): T | never;

	/**
	 * Map this Option<T> to Option<U> by applying fn to the value if this Option is of the Some variant
	 */
	map<U>(fn: (value: T) => U): Option<U> {
		return (this instanceof Some) ? Option.Some(fn(this.expectSome())) : Option.None();
	}

	/**
	 * Match this variant to the appropriate function and return the result
	 */
	match<R>(onSome: (value: T) => R, onNone: () => R): R {
		return (this instanceof Some) ? onSome(this.expectSome()) : onNone();
	}
}

export class Some<T> extends Option<T> {
	private _value: T;

	constructor(value: T) {
		super();
		this._value = value;
	}

	/**
	 * Unwrap the value if it is of the Some variant, otherwise panic with the provided error
	 */
	expectSome(): T {
		return this._value;
	}
}

export class None extends Option<never> {
	/**
	 * Unwrap the value if it is of the Some variant, otherwise panic with the provided error
	 */
	expectSome(error: Error): never {
		panic(error);
	}
}