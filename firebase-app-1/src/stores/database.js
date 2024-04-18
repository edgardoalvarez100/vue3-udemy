import { defineStore } from "pinia";
import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore/lite";
import { auth, db } from "../firebaseConfig";
import { nanoid } from "nanoid";
import router from "../router";

export const useDatabaseStore = defineStore("database", {
  state: () => {
    return {
      documents: [],
      loadingDoc: false,
      loading: false,
    };
  },
  actions: {
    async getUrls() {
      if (this.documents.length !== 0) {
        return;
      }

      this.loadingDoc = true;

      try {
        const q = query(
          collection(db, "urls"),
          where("user", "==", auth.currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          this.documents.push({ id: doc.id, ...doc.data() });
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingDoc = false;
      }
    },
    async leerUrl(id) {
      this.loadingDoc = true;
      try {
        const docRef = doc(db, "urls", id);
        const docSnap = await getDoc(docRef);
        return docSnap.data().name;
      } catch (error) {
        throw new Error(error);
      } finally {
        this.loadingDoc = false;
      }
    },
    async updateUrl(id, name) {
      try {
        const docRef = doc(db, "urls", id);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
          throw new Error("no existe el doc");
        }
        if (docSnap.data().user !== auth.currentUser.uid) {
          throw new Error("El documento no le pertenece");
        }
        await updateDoc(docRef, { name: name });
        this.documents = this.documents.map((item) =>
          item.id === id ? { ...item, name: name } : item
        );
        router.push("/");
      } catch (error) {
        throw new Error(error);
      }
    },
    async addUrl(name) {
      this.loading = true;
      try {
        const obj = {
          name: name,
          short: nanoid(6),
          user: auth.currentUser.uid,
        };
        const docRef = await addDoc(collection(db, "urls"), obj);
        this.documents.push({ ...obj, id: docRef.id });
      } catch (error) {
        throw new Error(error);
      } finally {
        this.loading = false;
      }
    },
    async deleteUrl(id) {
      this.loading = true;
      try {
        const docRef = doc(db, "urls", id);

        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
          throw new Error("no existe el doc");
        }
        if (docSnap.data().user !== auth.currentUser.uid) {
          throw new Error("El documento no le pertenece");
        }
        await deleteDoc(docRef);
        this.documents = this.documents.filter((item) => item.id !== id);
      } catch (error) {
        throw new Error(error);
      } finally {
        this.loading = false;
      }
    },
  },
});
