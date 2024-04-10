import { ref } from "vue";
import { defineStore } from "pinia";

export const useFavoritosStore = defineStore("favoritos", () => {
  const favoritos = ref([]);

  if (localStorage.getItem("favoritos")) {
    favoritos.value = JSON.parse(localStorage.getItem("favoritos"));
  }

  const add = (poke) => {
    favoritos.value.push(poke);
    localStorage.setItem("favoritos", JSON.stringify(favoritos.value));
  };
  const findPoke = (name) => favoritos.value.find((item) => item.name === name);
  const remove = (id) => {
    favoritos.value = favoritos.value.filter((item) => id !== item.id);
    localStorage.setItem();
  };

  return {
    favoritos,
    add,
    remove,
    findPoke,
  };
});
