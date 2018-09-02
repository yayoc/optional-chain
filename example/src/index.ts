import { optional } from "../../src";

interface User {
  name?: {
    first: string;
  };
  gender: { id: number } | null;
}

const user: User = { name: undefined, gender: null };
const optionalUser = optional(user);
optionalUser
  .k("name")
  .k("first")
  .get();

optionalUser
  .k("gender")
  .k("id")
  .get();

type Foo = {
  bar?: {
    str: string;
  };
};

const foo: Foo = {};
const optionalFoo = optional(foo.bar);
optionalFoo.k("str");
