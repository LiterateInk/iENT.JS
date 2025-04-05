import homepage_with_news_and_messages from "!/Welcome.1.html" with { type: "text" };
import homepage_with_timetable from "!/Welcome.2.html" with { type: "text" };
import { expect, test } from "bun:test";
import * as cheerio from "cheerio";

import { decodeHomepage } from "~/decoders/homepage";

test("decodeHomepage with news and messages", () => {
  const $ = cheerio.load(homepage_with_news_and_messages);
  const homepage = decodeHomepage($);

  // make sure the html was correctly scrapped :
  // - check bounds
  // - check text content
  expect(homepage.news).toStartWith("<p");
  expect(homepage.news).toContain("Bienvenue dans l'Espace Numérique");
  expect(homepage.news).toContain("de la LITERATEINK SCHOOL");
  expect(homepage.news).toContain("Suivez nous sur les réseaux :");
  expect(homepage.news).toContain("https://github.com/LiterateInk");
  expect(homepage.news).toEndWith("</p>");

  // 2024-12-21
  expect(homepage.timetable.date).toStrictEqual(new Date(2024, 11, 21));
  // from 7:30 (included) to 19:30 (included) with 30 minutes interval
  expect(homepage.timetable.hours).toHaveLength(25);
  // it's a saturday, no events !
  expect(homepage.timetable.events).toHaveLength(0);

  expect(homepage.messages).toHaveLength(7);
  expect(homepage.messages).toStrictEqual([
    {
      content: "pompon lainesapin carton",
      id: "SOME_ID_1",
      sender: "LITERATEINK Student",
      sentDisplayDate: "09 déc.",
      subject: "pompom laine"
    }, {
      content: "animation 1Christmas craft toRenne de Noël avec un rouleau en cartony for kidsSuperb Christmas Tree",
      id: "SOME_ID_2",
      sender: "LITERATEINK Student",
      sentDisplayDate: "04 déc.",
      subject: "anim a faire"
    },
    {
      content: "https://fr.pinterest.com/pin/553942822926700911/",
      id: "SOME_ID_3",
      sender: "LITERATEINK Student",
      sentDisplayDate: "02 déc.",
      subject: "idée animation"
    }, {
      content: "Les résultats sont tombés félicitations vous avez eu le LITERATE PRIZE.Si vous voulez votre mention envoyez mo",
      id: "SOME_ID_4",
      sender: "RENARD Yann",
      sentDisplayDate: "28 juin",
      subject: "RESULTATS"
    },
    {
      content: "Les résultats peuvent apparaître dans les 48h après délibération donc possibilité demain soir ou l'un",
      id: "SOME_ID_5",
      sender: "RENARD Yann",
      sentDisplayDate: "27 juin",
      subject: "résultats"
    },
    {
      content: "Bonjour à tous,Demain c'est le grand jour. Si vous avez votre convocation vous povez vous connecter",
      id: "SOME_ID_6",
      sender: "RENARD Yann",
      sentDisplayDate: "27 juin",
      subject: "RESULTATS"
    },
    {
      content: "Une grosse pensée pour votre oral.Mr RENARD",
      id: "SOME_ID_7",
      sender: "RENARD Yann",
      sentDisplayDate: "10 juin",
      subject: "ORAL"
    }
  ]);
});

test("decodeHomepage with news, messages and timetable", () => {
  const $ = cheerio.load(homepage_with_timetable);
  const homepage = decodeHomepage($);

  // make sure the html was correctly scrapped :
  // - check bounds
  // - check text content
  expect(homepage.news).toStartWith("<p");
  expect(homepage.news).toContain("Bienvenue dans l'Espace Numérique");
  expect(homepage.news).toContain("de la LITERATEINK SCHOOL");
  expect(homepage.news).toContain("Suivez nous sur les réseaux :");
  expect(homepage.news).toContain("https://github.com/LiterateInk");
  expect(homepage.news).toEndWith("</p>");

  // 2024-12-20
  expect(homepage.timetable.date).toStrictEqual(new Date(2024, 11, 20));
  // from 7:30 (included) to 19:30 (included) with 30 minutes interval
  expect(homepage.timetable.hours).toHaveLength(25);

  expect(homepage.timetable.events).toHaveLength(3);
  expect(homepage.timetable.events).toStrictEqual([
    {
      colorHex: "#f00f00",
      description: "Préparation MSP public enfants adolescents\nVisite ACM Chauffailles",
      endDate: new Date(2024, 11, 20, 10, 30),
      id: 378492,
      startDate: new Date(2024, 11, 20, 8, 30),
      teacherName: "LB Mme PAPILLON",
      title: "JEPS",
      type: "lesson"
    },
    {
      colorHex: "#f00f00",
      description: "Préparation MSP public enfants adolescents\nVisite ACM Chauffailles",
      endDate: new Date(2024, 11, 20, 12, 30),
      id: 378493,
      startDate: new Date(2024, 11, 20, 10, 30),
      teacherName: "LB Mme PAPILLON",
      title: "JEPS",
      type: "lesson"
    },
    {
      colorHex: "#00CC33",
      description: "Bilan semaine",
      endDate: new Date(2024, 11, 20, 15, 30),
      id: 378483,
      startDate: new Date(2024, 11, 20, 13, 30),
      teacherName: "DESS Mme CHENILLE",
      title: "JEPS",
      type: "lesson"
    }
  ]);

  expect(homepage.messages).toHaveLength(7);
  expect(homepage.messages).toStrictEqual([
    {
      content: "pompon lainesapin carton",
      id: "SOME_ID_1",
      sender: "LITERATEINK Student",
      sentDisplayDate: "09 déc.",
      subject: "pompom laine"
    }, {
      content: "animation 1Christmas craft toRenne de Noël avec un rouleau en cartony for kidsSuperb Christmas Tree",
      id: "SOME_ID_2",
      sender: "LITERATEINK Student",
      sentDisplayDate: "04 déc.",
      subject: "anim a faire"
    },
    {
      content: "https://fr.pinterest.com/pin/553942822926700911/",
      id: "SOME_ID_3",
      sender: "LITERATEINK Student",
      sentDisplayDate: "02 déc.",
      subject: "idée animation"
    }, {
      content: "Les résultats sont tombés félicitations vous avez eu le LITERATE PRIZE.Si vous voulez votre mention envoyez mo",
      id: "SOME_ID_4",
      sender: "RENARD Yann",
      sentDisplayDate: "28 juin",
      subject: "RESULTATS"
    },
    {
      content: "Les résultats peuvent apparaître dans les 48h après délibération donc possibilité demain soir ou l'un",
      id: "SOME_ID_5",
      sender: "RENARD Yann",
      sentDisplayDate: "27 juin",
      subject: "résultats"
    },
    {
      content: "Bonjour à tous,Demain c'est le grand jour. Si vous avez votre convocation vous povez vous connecter",
      id: "SOME_ID_6",
      sender: "RENARD Yann",
      sentDisplayDate: "27 juin",
      subject: "RESULTATS"
    },
    {
      content: "Une grosse pensée pour votre oral.Mr RENARD",
      id: "SOME_ID_7",
      sender: "RENARD Yann",
      sentDisplayDate: "10 juin",
      subject: "ORAL"
    }
  ]);
});
