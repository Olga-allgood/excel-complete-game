import { foundationChallenges } from "./foundations";
import { logicChallenges } from "./logic";
import { lookupChallenges } from "./lookups";
import { textChallenges } from "./text";
import { analysisChallenges } from "./analysis";

export const curriculumModules = [
  {
    id: "foundations",
    number: "01",
    title: "Formula Foundations",
    subtitle: "Build your core Excel formula toolkit.",
    challenges: foundationChallenges,
  },
  {
    id: "logic",
    number: "02",
    title: "Business Logic",
    subtitle: "Make decisions with formulas.",
    challenges: logicChallenges,
  },
  {
    id: "lookups",
    number: "03",
    title: "Lookup Mission",
    subtitle: "Find and retrieve information from data.",
    challenges: lookupChallenges,
  },
  {
    id: "text",
    number: "04",
    title: "Data Cleanup",
    subtitle: "Clean and transform workplace data.",
    challenges: textChallenges,
  },
  {
    id: "analysis",
    number: "05",
    title: "Data Analysis",
    subtitle: "Summarize and analyze business data.",
    challenges: analysisChallenges,
  },
];

export function getModuleById(id) {
  return curriculumModules.find(
    (module) => module.id === id
  );
}