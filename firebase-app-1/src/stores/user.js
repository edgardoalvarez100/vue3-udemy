import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

import router from "../router/";
import { defineStore } from "pinia";
import { auth, db } from "../firebaseConfig";
import { useDatabaseStore } from "./database";
import { setDoc, getDoc, doc } from "firebase/firestore/lite";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    userData: null,
    loadingUser: false,
    loadingSession: false,
  }),
  actions: {
    async registerUser(email, password) {
      this.loadingUser = true;
      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        this.userData = { email: user.email, uid: user.uid };
        router.push("/");
      } catch (error) {
        throw new Error(error);
      } finally {
        this.loadingUser = false;
      }
    },
    async loginUser(email, password) {
      this.loadingUser = true;
      try {
        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        this.setUser(user);

        router.push("/");
      } catch (error) {
        console.log(error);
        throw new Error(error);
      } finally {
        this.loadingUser = false;
      }
    },
    async setUser(user) {
      try {
        const docRef = doc(db, "users", user.uid);
        this.userData = {
          email: user.email,
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        };

        await setDoc(docRef, this.userData);
      } catch (error) {
        throw new Error(error);
      }
    },
    async logoutUser() {
      const databaseStore = useDatabaseStore();
      databaseStore.$reset();
      this.loadingUser = true;
      try {
        router.push("/login");
        await signOut(auth);
      } catch (error) {
        throw new Error(error);
      } finally {
        this.loadingUser = false;
      }
    },
    currentUser() {
      return new Promise((resolve, reject) => {
        onAuthStateChanged(
          auth,
          async (user) => {
            if (user) {
              console.log(user);
              // await this.setUser(user);
              this.userData = {
                email: user.email,
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL,
              };
            } else {
              this.userData = null;
              const databaseStore = useDatabaseStore();
              databaseStore.$reset();
            }
            resolve(user);
          },
          (e) => reject(e)
        );
      });
    },
    async updateUser(displayName) {
      try {
        await updateProfile(auth.currentUser, { displayName });
        this.setUser(auth.currentUser);
      } catch (error) {
        throw new Error(error);
      }
    },
  },
});
