import { expect, test } from "bun:test";
import * as cheerio from "cheerio";

import { decodeMetadata } from "~/decoders/metadata";

import homepage_1 from "!/Welcome.1.html" with { type: "text" };
import homepage_2 from "!/Welcome.2.html" with { type: "text" };

const pages = [
  // `/Welcome` route.
  homepage_1, homepage_2
];

test("decodeMetadata", () => {
  for (const page of pages) {
    const $ = cheerio.load(page);
    const metadata = decodeMetadata($);

    expect(metadata).toStrictEqual({
      fullName: "Student LITERATEINK",
      unreadMessages: 0,
      links: [
        "https://literate.ink/",
        "https://github.com/LiterateInk"
      ]
    });
  }
});
