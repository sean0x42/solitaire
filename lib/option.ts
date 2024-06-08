export class Option<T> {
  value: T | undefined;

  constructor(value?: T) {
    this.value = value;
  }

  public static some<T>(value: T): Option<T> {
    return new Option(value);
  }

  public static none<T>(): Option<T> {
    return new Option();
  }

  public isSome(): boolean {
    return this.value !== undefined;
  }

  public isNone(): this is T {
    return this.value === undefined;
  }

  public map<U>(mapFn: (value: T) => U): Option<U> {
    if (this.value === undefined) {
      return Option.none();
    }

    return Option.some(mapFn(this.value));
  }

  public unwrap(): T {
    if (this.value === undefined) {
      throw new Error("Cannot unwrap a None value");
    }

    return this.value;
  }
}
