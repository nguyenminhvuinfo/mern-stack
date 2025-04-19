import { create } from "zustand";

const API_BASE_URL = "https://mern-backend-9iu8.onrender.com/api";

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),

    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.price || !newProduct.image){
            return { success: false, message: "Vui lòng điền đầy đủ thông tin sản phẩm." };
        }

        const res = await fetch(`${API_BASE_URL}/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct),
        });

        const data = await res.json();
        set((state) => ({ products: [...state.products, data.data] }));
        return { success: true, message: "Sản phẩm mới đã được tạo." };
    },

    fetchProducts: async () => {
        const res = await fetch(`${API_BASE_URL}/products`);
        const data = await res.json();
        set({ products: data.data });
    },

    deleteProduct: async (pid) => {
        const res = await fetch(`${API_BASE_URL}/products/${pid}`, {
            method: "DELETE",
        });
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };

        set((state) => ({
            products: state.products.filter((product) => product._id !== pid),
        }));
        return { success: true, message: data.message };
    },

    updateProduct: async (pid, updatedProduct) => {
        const res = await fetch(`${API_BASE_URL}/products/${pid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProduct),
        });

        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };

        set((state) => ({
            products: state.products.map((product) =>
                product._id === pid ? data.data : product
            ),
        }));
        return { success: true, message: data.message };
    },
}));
