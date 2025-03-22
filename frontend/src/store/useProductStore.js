import { create } from "zustand";
import axios from "axios";

const BASE_URL = "http://localhost:3000"


export const useProductStore = create((set, get) => ({
  //* Products initial state 
  products: [],
  loading: false,
  error: null,
  
  fetchProducts: async () => {
    set({loading: true});
    try {
      const res = await axios.get(`${BASE_URL}/api/products`);
      set({products:res.data.data, error: null});

    } catch (err) {
      if(err.status === 429) set({error: "Rate limit exceeded", products: []});
      else set({error: err.message, products: []});
    } finally {
      set({loading: false});
    }
  },

  
}))