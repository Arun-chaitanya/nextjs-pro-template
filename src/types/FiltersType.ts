export type FiltersType = {
  key1?: FilterItem[];
};

export type FilterItem = {
  id: string;
  name: string;
} & string;
