import { PrismaClient } from "@prisma/client";
import {
  startOfMonth,
  endOfMonth,
  addDays,
  addHours,
  isBefore,
  isAfter,
  isEqual,
} from "date-fns";

const titles = [
  "Reunião de planejamento estratégico",
  "Treinamento de integração de novos funcionários",
  "Workshop sobre inovação tecnológica",
  "Sessão de brainstorming para novo projeto",
  "Conferência mensal da equipe de vendas",
  "Apresentação de resultados do trimestre",
  "Reunião com clientes importantes",
  "Palestra sobre desenvolvimento pessoal",
  "Discussão sobre metas e objetivos anuais",
  "Encontro para feedback e melhorias",
  "Sessão de treinamento técnico avançado",
  "Revisão do orçamento e finanças",
  "Evento de networking empresarial",
  "Lançamento de produto interno",
  "Reunião de análise de KPIs",
  "Debate sobre estratégias de marketing",
  "Planejamento para evento corporativo",
  "Workshop sobre inteligência emocional",
  "Oficina de design thinking",
  "Reunião geral da equipe",
];

const descriptions = [
  "Descrição detalhada sobre planejamento estratégico.",
  "Integração de novos funcionários com foco em cultura organizacional.",
  "Inovação tecnológica aplicada ao desenvolvimento de produtos.",
  "Brainstorming para novas ideias e projetos inovadores.",
  "Análise mensal dos resultados da equipe de vendas.",
  "Apresentação dos resultados financeiros do trimestre.",
  "Discussão com clientes importantes sobre novos contratos.",
  "Palestra motivacional sobre desenvolvimento pessoal.",
  "Discussão sobre metas e objetivos anuais da empresa.",
  "Feedback e melhorias contínuas para processos internos.",
  "Treinamento técnico avançado para a equipe de desenvolvimento.",
  "Revisão do orçamento e planejamento financeiro.",
  "Evento de networking com profissionais da indústria.",
  "Lançamento de novo produto no mercado.",
  "Análise de KPIs e métricas de desempenho.",
  "Estratégias de marketing para o próximo trimestre.",
  "Planejamento detalhado para evento corporativo.",
  "Workshop sobre inteligência emocional no trabalho.",
  "Oficina prática de design thinking.",
  "Reunião geral para alinhamento da equipe.",
];

function generateRandomEvent(monthStart, monthEnd) {
  const randomDay = Math.floor(
    Math.random() * (monthEnd.getDate() - monthStart.getDate() + 1)
  );
  const date = addDays(monthStart, randomDay);
  const startHour = Math.floor(Math.random() * 9) + 8;
  const duration = Math.floor(Math.random() * 3) + 1;

  const start = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    startHour
  );
  let end = addHours(start, duration);

  if (end > monthEnd) {
    end = monthEnd;
  }

  if (end < start) {
    end = addHours(start, 1);
  }

  return { start, end };
}

function isConflict(newEvent, events) {
  return events.some(
    (event) =>
      (isBefore(newEvent.start, event.end) &&
        isAfter(newEvent.end, event.start)) ||
      isEqual(newEvent.start, event.start) ||
      isEqual(newEvent.end, event.end)
  );
}

export async function seedEvents(prisma) {
  const currentDate = new Date();
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);

  const events = [];
  while (events.length < 15) {
    const { start, end } = generateRandomEvent(monthStart, monthEnd);
    const randomTitle = titles[Math.floor(Math.random() * titles.length)];
    const randomDescription =
      Math.random() < 0.5
        ? descriptions[Math.floor(Math.random() * descriptions.length)]
        : null;

    const newEvent = {
      title: randomTitle,
      description: randomDescription,
      start,
      end,
    };
    if (!isConflict(newEvent, events)) {
      events.push(newEvent);
    }
  }

  await prisma.event.createMany({ data: events });
}
