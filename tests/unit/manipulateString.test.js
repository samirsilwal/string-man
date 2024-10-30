const {  manipulateString } = require("../../index"); // Adjust the import path


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
