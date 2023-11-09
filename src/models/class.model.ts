type ability = "str" | "dex" | "con" | "int" | "wis" | "cha";

type TEntry = {
  type: string;
  entry: string | string[];
};

type TFeature = {
  name: string;
  source: string;
  page: number;
  level: number;
  entries: TEntry[];
};

type TSubclass = {
  name: string;
  features: string[];
};

type TOptionalFeatureProg = {
  name: string;
  type: string[];
  progression: number[];
};

type TTable = {
  cols: string[];
  rows: number[][];
};

type TSpellSettings = {
  ability: ability;
  progression: string;
  prepared: string;
  cantrip: number[];
};

type TProficiencies = {
  saving: ability[];
  armors: string[];
  weapons: string[];
  tools: string[];
  skills: {
    choose: string[];
    chooseCount: number;
  };
};

type TDice = {
  quantity: number;
  faces: number;
};

type TClassSettings = {
  name: string;
  source: string;
  page: number;
  proficiency: TProficiencies;
  spell: TSpellSettings;
  optionalProg: TOptionalFeatureProg[];
  hitDice: TDice;
  tables: TTable[];
  subClasses: TSubclass[];
  features: {
    class: TFeature[];
    subClass: TFeature[];
  };
};

export type TClass = {
  code: string;
  class: TClassSettings;
};
