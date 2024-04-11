import { defineStore } from "pinia";

export const useDatabaseStore = defineStore("database", {
  state: () => {
    return {
      documents: [],
    };
  },
});
