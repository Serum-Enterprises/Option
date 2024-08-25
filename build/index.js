"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.None = exports.Some = exports.Option = void 0;
const panic_1 = require("@serum-enterprises/panic");
class Option {
    /**
     * Create a new Some variant of Option
     */
    static Some(value) {
        return new Some(value);
    }
    /**
     * Create a new None variant of Option
     */
    static None() {
        return new None();
    }
    /**
     * Check if this Option is of the Some variant
     */
    isSome() {
        return (this instanceof Some);
    }
    /**
     * Check if this Option is of the None variant
     */
    isNone() {
        return (this instanceof None);
    }
    /**
     * Check if this Option is of the Some variant and the predicate returns true
     */
    isSomeAnd(predicate) {
        return (this instanceof Some) && predicate(this.expectSome());
    }
    /**
     * Map this Option<T> to Option<U> by applying fn to the value if this Option is of the Some variant
     */
    map(fn) {
        return (this instanceof Some) ? Option.Some(fn(this.expectSome())) : Option.None();
    }
    /**
     * Match this variant to the appropriate function and return the result
     */
    match(onSome, onNone) {
        return (this instanceof Some) ? onSome(this.expectSome()) : onNone();
    }
}
exports.Option = Option;
class Some extends Option {
    constructor(value) {
        super();
        this._value = value;
    }
    /**
     * Unwrap the value if it is of the Some variant, otherwise panic with the provided error
     */
    expectSome() {
        return this._value;
    }
}
exports.Some = Some;
class None extends Option {
    /**
     * Unwrap the value if it is of the Some variant, otherwise panic with the provided error
     */
    expectSome(error) {
        (0, panic_1.panic)(error);
    }
}
exports.None = None;
