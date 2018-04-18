import { optional, Option, OptionType } from "../src";
describe("optional", () => {
  it("should return Option instance", () => {
    expect(optional({})).toBeInstanceOf(Option);
  });
});

describe("Option", () => {
  describe("constructor", () => {
    it("should generate Some Option", () => {
      expect(new Option({ a: 0 }).type).toEqual(OptionType.Some);
    });
    it("should generate None Option", () => {
      expect(new Option(null).type).toEqual(OptionType.None);
    });
  });

  describe("k", () => {
    const obj = {
      a: {
        b: {
          c: "foo"
        }
      }
    };
    const optionalObj = new Option(obj);
    it("should return Option", () => {
      expect(optionalObj.k("a")).toBeInstanceOf(Option);
    });
    it("should return Option when undefined property is accessed", () => {
      expect(optionalObj.k("bar").k("a")).toBeInstanceOf(Option);
    });
    it("should return Some type", () => {
      expect(optionalObj.k("a").type).toBe(OptionType.Some);
    });
    it("should return None type when undefined property is accessed", () => {
      expect(optionalObj.k("bar").k("a").type).toBe(OptionType.None);
    });
  });

  describe("i", () => {
    const obj = [{ x: 0 }];
    const optionalObj = new Option(obj);
    it("should return Option", () => {
      expect(optionalObj.i(0)).toBeInstanceOf(Option);
    });
    it("should return Option when there is no element of array", () => {
      expect(optionalObj.i(100)).toBeInstanceOf(Option);
    });
    it("should return Some type when array element exists", () => {
      expect(optionalObj.i(0).type).toBe(OptionType.Some);
    });
    it("should return None type when there is no element", () => {
      expect(optionalObj.i(100).type).toBe(OptionType.None);
    });
    it("can be called after k function", () => {
      const obj = {
        a: [0, 1, 2]
      };
      const optionalObj = new Option(obj);
      expect(
        optionalObj
          .k("a")
          .i(0)
          .get()
      ).toBe(0);
      expect(
        optionalObj
          .k("a")
          .i(1)
          .get()
      ).toBe(1);
    });
  });

  type Artist = {
    name: string;
    sns: SNS;
    albums: Album[];
  };
  type SNS = {
    twitter?: {
      username: string;
    };
    facebook?: {
      url: string;
    };
  };
  type Album = {
    title: string;
    published: number;
  };
  const lcdSoundSystem: Artist = {
    name: "LCD Soundsystem",
    sns: {
      twitter: { username: "lcdsoundsystem" }
    },
    albums: [
      {
        title: "American Dream",
        published: 2017
      },
      {
        title: "This Is Happening",
        published: 2010
      },
      {
        title: "Sound of Silver",
        published: 2007
      },
      {
        title: "LCD Soundsystem",
        published: 2005
      }
    ]
  };

  const optionalLCD = optional(lcdSoundSystem);
  describe("get", () => {
    it("should return proper value", () => {
      expect(optionalLCD.k("name").get()).toBe("LCD Soundsystem");
      expect(
        optionalLCD
          .k("sns")
          .k("facebook")
          .k("url")
          .get()
      ).toBeUndefined();
      expect(
        optionalLCD
          .k("albums")
          .i(0)
          .k("published")
          .get()
      ).toBe(2017);
    });
  });

  describe("match", () => {
    it("should return matched value", () => {
      const matchedValue = optionalLCD.k("name").match({
        some: v => v,
        none: undefined
      });
      expect(matchedValue).toEqual("LCD Soundsystem");
    });
    it("should return none value", () => {
      const matchedValue = optionalLCD
        .k("sns")
        .k("facebook")
        .k("url")
        .match({
          some: v => v,
          none: v => `url is ${v}`
        });
      expect(matchedValue).toEqual("url is undefined");
    });
  });

  describe("getOrElse", () => {
    it("should return this.value when Option contains some value", () => {
      const name = optionalLCD.k("name").getOrElse("LCD");
      expect(name).toEqual("LCD Soundsystem");
    });
    it("should return argument value when Option doesn't contains any value", () => {
      const url = optionalLCD
        .k("sns")
        .k("facebook")
        .k("url")
        .getOrElse("https://www.facebook.com/lcdsoundsystem/");
      expect(url).toEqual("https://www.facebook.com/lcdsoundsystem/");
    });
  });
});
