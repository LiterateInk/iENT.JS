import type { CheerioAPI } from "cheerio";
import type { Metadata } from "~/models";

export const decodeMetadata = ($: CheerioAPI): Metadata => {
  const links = $("li[title=\"Liens\"]>ul.dropdown-menu>li.dropdown-item>a").map((_, element) => {
    return $(element).attr("href");
  }).toArray();

  const fullName = $("li.dropdown-header.navbar-custom.dropdown-item").first().text().trim();
  const unreadMessages = Number($("#non_lu_global").text()) || 0;

  return {
    links,
    fullName,
    unreadMessages
  };
};
