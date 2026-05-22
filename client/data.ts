export interface SceneData {
  event: {
    eventTitle: string;
    eventSubtitle: string;
    eventTheme: string;
    eventPresenter: string;
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
    eventTheme: "IA e a monetização de conteúdo",
    eventPresenter: "Regina Bucco",
    eventPhrases: [
      "Associação Nacional de Editores de Revistas",
      "comemora 40 anos fortalecendo a imprensa brasileira.",
      "compromisso com a credibilidade e a liberdade de expressão.",
      "inspirando o presente e construindo o futuro do mercado editorial brasileiro",
    ],
    eventMeta: "26 DE MAIO - 15:00 - GOOGLE MEET",
    ctaLabel: "Em instantes!",
  },
  guest: {
    guestName: "Pedro Burgos",
    guestRole: "Professor, jornalista, programador",
    guestCompany: "Fundador da Co.Inteligência",
    guestBio:
      "Especialista em aliar comunicação e programação. Com passagens por Columbia, CUNY e coordenação de pós-graduação no Insper, lidera iniciativas apoiadas pelo Google News Initiative. Atualmente, atua como consultor, colunista e produtor de conteúdo, traduzindo o impacto da inteligência artificial para o mercado.",
    guestImageUrl:
      "http://aner.org.br/wp-content/uploads/2026/05/pedro_147.webp?w=1288&fit=crop&q=80&auto=format",
    guestTags: ["Jornalismo", "Monetização", "Programação"],
  },
  sponsor: {
    sponsorImpactPhrase: "ANER SUMMIT 2026.",
    sponsorLogoUrl:
      "http://aner.org.br/wp-content/uploads/2026/04/AnerSummit2026.jpeg",
    cards: [
      {
        title: "Visão Estratégica",
        bullets: [
          "Impactos da IA no jornalismo e mercado",
          "Transformação de modelos de negócio",
          "Ética, responsabilidade e inovação"
        ],
        ctaLabel: "Lidere as transformações do setor.",
        ctaHref: "#",
      },
      {
        title: "Programação Dinâmica",
        bullets: [
          "Painéis com lideranças do mercado",
          "Talks objetivos de 15 minutos",
          "Cases reais e insights práticos"
        ],
        ctaLabel: "Troca qualificada e networking.",
        ctaHref: "#",
      },
      {
        title: "Informações Gerais",
        bullets: [
          "Data: 28/05/2026 às 08h",
          "Local: ESPM Tech (Vagas limitadas)",
          "Foco: Mídia e ecossistema de comunicação"
        ],
        ctaLabel: "Inscreva-se já, link no chat!",
        ctaHref: "#",
      },
    ],
  },
};
