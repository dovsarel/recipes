import { defineStore } from 'pinia';

const extractValueFromCell = (cell: any) => {
  try {
    return cell.f ? cell.f : cell.v;
  } catch(e) {
    return '';
  }
};

export const useRecipesStore = defineStore('recipes', {
  state: () => ({
    loading: true,
    isError: false,
    cols: [],
    items: [] as any[],
  }),
  actions: {
    async fetchRecipes() {
      const { googleSheetsId, googleSheetsGid } = useRuntimeConfig().public;
      const url = `https://docs.google.com/spreadsheets/d/${googleSheetsId}/gviz/tq?tqx=out:json&tq&gid=${googleSheetsGid}`;

      this.loading = true;

      const response = await fetch(url);
      const jsonString = (await response.text()).substring(47).slice(0, -2);

      const json = JSON.parse(jsonString);

      this.cols = json.table.cols;
      this.items = json.table.rows.map(r => r.c.map(extractValueFromCell));

      this.loading = false;
    },
  }
});
