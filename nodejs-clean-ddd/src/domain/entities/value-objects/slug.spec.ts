import { Slug } from "./slug";

test("it should be able to create a slug from a text", () => {
  const normalizedText = Slug.createFromText("An example text");

  expect(normalizedText.value).toBe("an-example-text");
});
