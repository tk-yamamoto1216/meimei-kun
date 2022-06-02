import { formatFunctionName, capitalize } from "../utils";

describe("１文字目だけ大文字に変換", () => {
  it("１文字目だけ大文字に変換", () => {
    expect(capitalize("tennis")).toBe("Tennis");
  });
});

describe("Deeplから呼び出した単語を表示ように整形", () => {
  it("括弧を取り除く", () => {
    expect(formatFunctionName("(western)soup")).toBe("Soup");
  });
  it("ハイフン区切り", () => {
    expect(formatFunctionName("western-soup")).toBe("WesternSoup");
  });
});
