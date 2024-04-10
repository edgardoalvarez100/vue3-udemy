import { ref } from "vue";
import { defineStore } from "pinia";

export const useFavoritosStore = defineStore("favoritos", () => {
  const favoritos = ref([]);

  const add = (poke) => {
    favoritos.value.push(poke);
  };

  const remove = (id) => {
    favoritos.value = favoritos.value.filter((item) => id !== item.id);
  };

  return {
    favoritos,
    add,
    remove,
  };
});
