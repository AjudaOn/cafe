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
    eventTheme: "IA e Jornalismo. Quais os limites?",
    eventPhrases: [
      "Associação Nacional de Editores de Revistas",
      "comemora 40 anos fortalecendo a imprensa brasileira.",
      "compromisso com a credibilidade e a liberdade de expressão.",
      "inspirando o presente e construindo o futuro do mercado editorial brasileiro",
    ],
    eventMeta: "10 MARÇO - 15:00 - GOOGLE MEET",
    ctaLabel: "Em instantes!",
  },
  guest: {
    guestName: "Ricardo Gandour",
    guestRole: "Jornalista",
    guestCompany: "professor / consultor",
    guestBio:
      "Estrategista, educador e analista de mídia. Com uma carreira marcada pela liderança nas maiores empresas de comunicação do país, é uma das vozes mais qualificadas no debate sobre os desafios do jornalismo e da opinião pública na atualidade.",
    guestImageUrl:
      "http://aner.org.br/wp-content/uploads/2026/03/gandour_137.webp?w=1288&fit=crop&q=80&auto=format",
    guestTags: ["Inovação", "Estratégia", "Jornalismo"],
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
