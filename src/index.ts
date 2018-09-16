export enum OptionType {
  None,
  Some
}

// Use NonNullable type to avoid returning "never type" when accessing optional properties
export const optional = <T>(value: T): Option<NonNullable<T>> => {
  return new Option(value) as any;
};

export type Diff<T, U> = T extends U ? never : T;
export type NonNullable<T> = Diff<T, null | undefined>;

export class Option<T> {
  readonly value: T;
  readonly type: OptionType;
  constructor(value: T) {
    this.value = value;
    if (this.value === undefined || this.value === null) {
      this.type = OptionType.None;
    } else {
      this.type = OptionType.Some;
    }
  }
  public k<K extends keyof T>(key: K): Option<NonNullable<T[K]>> {
    if (this.type === OptionType.None) {
      return new Option(undefined) as any;
    }
    return new Option(this.value[key]) as any;
  }

  public i: T extends Array<infer I>
    ? (index: number) => Option<I>
    : Option<undefined>;

  public get(): T {
    return this.value;
  }
  public match({
    some,
    none
  }: {
    some: (v: T) => any;
    none: (v: T) => any;
  }): any {
    return this.type === OptionType.Some ? some(this.value) : none(this.value);
  }
  public getOrElse(value: T): T {
    return this.type === OptionType.Some ? this.value : value;
  }
}

Option.prototype.i = function<U>(index: number): Option<U> {
  if (this.value === undefined || this.value[index] === undefined) {
    return new Option(undefined as any);
  }
  return new Option(this.value[index]);
};
