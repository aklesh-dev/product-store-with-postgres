import { create } from "zustand";

export const useThemeStore = create((set) => ({
  // *Define a state variable 'theme' with the initial value retrieved from localStorage or default to "forest"
  theme: localStorage.getItem("preffered-theme") || "forest",  
  // *Define an action 'setTheme' that updates the 'theme' state with the provided theme value
  setTheme: (theme) => {
    localStorage.setItem("preffered-theme", theme);
    set({theme});
  }, 
}));