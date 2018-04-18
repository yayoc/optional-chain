# optional-chain

Optional chaining implementation in TypeScript.

## Install

```shell
npm install optional-chain
```

## Usage

```typescript
import { optional } from "optional-chain";

type User {
  name?: {
    first: string
  }
}
const user: User = getUser(); // { name: null }
const optionalUser = optional(user);
optionalUser.k("name").k("first").get(); // undefined, does not throw an exception.
```

## API

`optional-chain` library exports below APIs.

### `optional`

`optional` is a fuctory function to creates a `Option` instance.

### `Option<T>`

An instance of `Option` can be constructed with a value for the souce of `T`. `Option` class can hold a type of `Some` or `None` based on given source.

#### `.k(name: string)`

Returns a `Option<T>` narrowed by specified property of Object.

#### `.i(index: number)`

Returns a `Option<T>` narrowed by specified index of Array.

#### `.get()`

Returns `Some` value of `Option`.

#### `.match({ some: T => any, none: T => any })`

A public method of `Option` to do pattern matching.
If target `Option` is `Some` type, this funciton returns a result of given `some` function. Otherwise, this function returns a result of given `none` function.

#### `.getOrElse(value: any)`

A public method to return `T` value when the instance contains some value. Otherwise, this function will return given value.

## Credits

This library is highly inspired by [`lens.ts`](https://github.com/utatti/lens.ts) [@utatti](https://github.com/utatti/) created.

## License

[MIT](LICENSE)
