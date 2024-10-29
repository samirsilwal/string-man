const core = require("@actions/core");
const { isValidJSON, manipulateString, main } = require("../../index"); // Adjust the import path

jest.mock("@actions/core");

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

describe("manipulateString", () => {
  it('should handle "concat" operator correctly', () => {
    expect(manipulateString("concat", "hello", " world")).toBe("hello world");
  });

  it('should return length of string for "length" operator', () => {
    expect(manipulateString("length", "hello")).toBe(5);
  });

  it('should return input when "identity" operator is used', () => {
    expect(manipulateString("identity", "hello")).toBe("hello");
  });

  it('should check equality for "equals" operator', () => {
    expect(manipulateString("equals", "test", "test")).toBe(true);
    expect(manipulateString("equals", "test", "fail")).toBe(false);
  });

  it("should throw an error for invalid operator", () => {
    expect(() => manipulateString("invalidOperator", "test")).toThrow(
      "Invalid operator: invalidOperator"
    );
  });
});
