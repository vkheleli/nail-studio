/**
 * Nail techs hook — static data (backend listNailTechs not yet in schema).
 * When the backend method is added, replace NAIL_TECHS with an actor call.
 */

export interface NailTech {
  id: number;
  name: string;
  town: string;
  address: string;
  specialties: string[];
  portrait?: string;
}

export const NAIL_TECHS: NailTech[] = [
  {
    id: 1,
    name: "Florah",
    town: "Soweto",
    address: "15489 Aluminum Street, Protea Glen, Soweto, 1818",
    specialties: ["Acrylic", "Gel", "Pedi"],
  },
  {
    id: 2,
    name: "Christy",
    town: "Vaal",
    address: "12 Voortrekker Street, Vereeniging, 1939",
    specialties: ["Gel", "Rubber Base Gel", "Pedi"],
  },
  {
    id: 3,
    name: "Jack",
    town: "Ficksburg",
    address: "73 Promed Fontein Street, Ficksburg, 9730",
    specialties: ["Acrylic", "Rubber Base Gel", "Pedi"],
  },
];

export function useNailTechs(): { data: NailTech[]; isLoading: false } {
  return { data: NAIL_TECHS, isLoading: false };
}

export function useNailTech(techId: number): {
  data: NailTech | undefined;
  isLoading: false;
} {
  const tech = NAIL_TECHS.find((t) => t.id === techId);
  return { data: tech, isLoading: false };
}
