export declare abstract class Option<T> {
    /**
     * Create a new Some variant of Option
     */
    static Some<T>(value: T): Some<T>;
    /**
     * Create a new None variant of Option
     */
    static None(): None;
    /**
     * Check if this Option is of the Some variant
     */
    isSome(): this is Some<T>;
    /**
     * Check if this Option is of the None variant
     */
    isNone(): this is None;
    /**
     * Check if this Option is of the Some variant and the predicate returns true
     */
    isSomeAnd(predicate: (value: T) => boolean): this is Some<T> & ReturnType<typeof predicate>;
    /**
     * Unwrap the value if this Option is of the Some variant, otherwise panic with the provided error
     */
    abstract expectSome(error: Error): T | never;
    /**
     * Map this Option<T> to Option<U> by applying fn to the value if this Option is of the Some variant
     */
    map<U>(fn: (value: T) => U): Option<U>;
    /**
     * Match this variant to the appropriate function and return the result
     */
    match<R>(onSome: (value: T) => R, onNone: () => R): R;
}
export declare class Some<T> extends Option<T> {
    private _value;
    constructor(value: T);
    /**
     * Unwrap the value if it is of the Some variant, otherwise panic with the provided error
     */
    expectSome(): T;
}
export declare class None extends Option<never> {
    /**
     * Unwrap the value if it is of the Some variant, otherwise panic with the provided error
     */
    expectSome(error: Error): never;
}
