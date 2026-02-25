export interface SceneData {
  event: {
    eventTitle: string;
    eventSubtitle: string;
    eventTheme: string;
    eventPhrases: string[];
    eventMeta: string;
    ctaLabel: string;
  };
  guest: {
    guestName: string;
    guestRole: string;
    guestCompany: string;
    guestBio: string;
    guestImageUrl: string;
    guestTags: string[];
  };
  sponsor: {
    sponsorImpactPhrase: string;
    sponsorLogoUrl: string;
    cards: {
      title: string;
      bullets: string[];
      ctaLabel: string;
      ctaHref: string;
    }[];
  };
}

export const SCENE_DATA: SceneData = {
  event: {
    eventTitle: "ANER",
    eventSubtitle:
      "O ponto de encontro do mercado editorial.",
    eventTheme: "Liberdade de expressão e liberdade de imprensa. Que valores são estes?",
    eventPhrases: [
      "Associação Nacional de Editores de Revistas",
      "comemora 40 anos fortalecendo a imprensa brasileira.",
      "compromisso com a credibilidade e a liberdade de expressão.",
      "inspirando o presente e construindo o futuro do mercado editorial brasileiro",
    ],
    eventMeta: "03 MARÇO - 15:00 - GOOGLE MEET",
    ctaLabel: "Em instantes!",
  },
  guest: {
    guestName: "Eugenio Bucci",
    guestRole: "Jornalista",
    guestCompany: "Professor",
    guestBio:
      "Intelectual de referência no debate público brasileiro, professor titular da Escola de Comunicações e Artes da USP e uma das vozes mais respeitadas na reflexão sobre ética, imprensa e democracia. Membro da Academia Paulista de Letras, Bucci une pensamento crítico, experiência editorial e compromisso com o rigor intelectual.",
    guestImageUrl:
      "http://aner.org.br/wp-content/uploads/2026/02/eugenio2026_3.webp?w=1288&fit=crop&q=80&auto=format",
    guestTags: ["Inovação", "Ética", "Democracia"],
  },
  sponsor: {
    sponsorImpactPhrase: "Onde tem café, tem Cooxupé.",
    sponsorLogoUrl:
      "https://linktr.ee/og/image/cooperativacooxupe.jpg",
    cards: [
      {
        title: "Cooperativismo Líder",
        bullets: ["Qualidade reconhecida globalmente", "Tecnologia e rastreabilidade", "Práticas sustentáveis certificadas"],
        ctaLabel: "Milhares de produtores. Um propósito.",
        ctaHref: "#",
      },
      {
        title: "Excelência Sustentável",
        bullets: ["Qualidade reconhecida globalmente", "Tecnologia e rastreabilidade", "Práticas sustentáveis certificadas"],
        ctaLabel: "Qualidade que nasce na origem.",
        ctaHref: "#",
      },
      {
        title: "Impacto Global",
        bullets: ["Presença em 5 continentes", "Desenvolvimento regional", "Força econômica para o Brasil"],
        ctaLabel: "Do Brasil para o mundo.",
        ctaHref: "#",
      },
    ],
  },
};
