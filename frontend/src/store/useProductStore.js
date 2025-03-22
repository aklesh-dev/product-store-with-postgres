import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:3000"


export const useProductStore = create((set, get) => ({
  //* Products initial state 
  products: [],
  loading: false,
  error: null,

  // Form Data initial state
  formData: {
    name: "",
    price: "",
    image: ""
  },

  setFormData: (formData) => set({formData}),
  resetForm: () => set({ formData: {name: "", price: "", image: ""}}),

  // Add product functionality
  addProduct: async (e) => {
    e.preventDefault();
    set({loading: true});

    try {
      const {formData} = get();
      await axios.post(`${BASE_URL}/api/products/create`, formData);
      await get().fetchProducts();
      get().resetForm();
      toast.success("Product added successfully");
      document.getElementById("add_product_modal").close();
    } catch (error) {
      console.error("Error adding product:", error.message);
      toast.error("Something went wrong !!!");
    }finally{
      set({loading: false, error: null});
    }
  },
  

  fetchProducts: async () => {
    set({ loading: true });
    try {
      const res = await axios.get(`${BASE_URL}/api/products`);
      set({ products: res.data.data, error: null });
    } catch (err) {
      if (err.status === 429) set({ error: "Rate limit exceeded", products: [] });
      else set({ error: "something went wrong", products: [] });
      
    } finally {
      set({ loading: false, error: null });
    }
  },

  deleteProduct: async (id) => {
    set({ loading: true })
    try {
      await axios.delete(`${BASE_URL}/api/products/${id}`);
      set(prev => ({ products: prev.products.filter(product => product.id !== id) }));
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error.message);
      toast.error("Something went wrong !!!");
    } finally {
      set({ loading: false });
    }
  },


}))