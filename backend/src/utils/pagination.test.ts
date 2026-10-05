import { describe, expect, it } from "vitest";
import { parseOptionalPagination } from "./pagination.js";

describe("parseOptionalPagination", () => {
  it("preserves legacy behavior when pagination is omitted", () => {
    expect(parseOptionalPagination()).toBeUndefined();
  });

  it("accepts a bounded page and size pair", () => {
    expect(parseOptionalPagination("3", "50")).toEqual({ page: 3, limit: 50 });
  });

  it.each([["1", "101"], ["0", "10"], ["2", undefined], ["1000000000", "100"]] as const)(
    "rejects unsafe pagination values %s/%s",
    (page, limit) => expect(() => parseOptionalPagination(page, limit)).toThrow()
  );
});
