const { isValidJSON } = require("../../index"); // Adjust the import path

describe("isValidJSON", () => {
  it("should return true for valid JSON array string", () => {
    expect(isValidJSON('["concat", "hello", " world"]')).toBe(true);
  });

  it("should return false for string without quote", () => {
    expect(isValidJSON('{ "invalid": string without quote }')).toBe(false);
  });

  it("should return false for non array JSON values", () => {
    expect(isValidJSON('{"key": "value"}')).toBe(false);
  });
});
