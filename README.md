# optional-chain [![travis-ci](https://travis-ci.org/yayoc/optional-chain.svg?branch=master)](https://travis-ci.org/yayoc/optional-chain) [![Greenkeeper badge](https://badges.greenkeeper.io/yayoc/optional-chain.svg)](https://greenkeeper.io/)

Optional chaining implementation in TypeScript.  
Uses [`option type`](https://en.wikipedia.org/wiki/Option_type)

## Requirement

This library requires TS 2.8+ version to use [conditional type](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html)

## Install

```shell
npm install optional-chain
```

## Usage

```typescript
import { optional } from "optional-chain";

type User = {
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

```typescript
type User = {
  name: string;
  sns: SNS;
  followers: User[];
};

type SNS = {
  twitter?: {
    username: string;
  };
  facebook?: {
    url: string;
  };
};

const user: User = {
  name: "yayoc",
  sns: {
    twitter: {
      username: "@yayoc_"
    }
  },
  followers: []
};
const optionalUser = optional(user);
optionalUser.k("name"); // Option<string>
optionalUser.k("sns"); // Option<{twitter: { username: string }}>
optionalUser.k("sns").k("facebook"); // None
optionalUser.k("foo"); // compile error
```

Returns a `Option<T>` narrowed by specified property of Object.

#### `.i(index: number)`

Returns a `Option<T>` narrowed by specified index of Array. If index is not in array, this returns `Option<undefined>`.

```typescript
optionalUser
  .k("followers")
  .i(0)
  .k("name"); // None
```

#### `.get()`

Returns a value of `Option`.

```typescript
optionalUser.k("name").get(); // yayoc
```

#### `.match({ some: T => any, none: T => any })`

A public method of `Option` to do pattern matching.
If target `Option` is `Some` type, this funciton returns a result of given `some` function. Otherwise, this function returns a result of given `none` function.

```typescript
optionalUser
  .k("sns")
  .k("twitter")
  .match({
    some: v => v,
    none: v => `there is no account: ${v}`
  }); // @yayoc_
```

#### `.getOrElse(value: any)`

A public method to return `T` value when the instance contains some value. Otherwise, this function will return given value.

```typescript
optionalUser
  .k("sns")
  .k("facebook")
  .k("url")
  .getOrElse("https://facebook.com"); // https://facebook.com
```

## Credits

This library is highly inspired by [`lens.ts`](https://github.com/utatti/lens.ts) [@utatti](https://github.com/utatti/) created.

## License

[MIT](LICENSE)
