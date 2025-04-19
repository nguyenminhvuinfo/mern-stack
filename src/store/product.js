import { create } from "zustand";

export const useProductStore = create((set) => ({
    products: [],
    loading: false, // Thêm trạng thái loading
    setProducts: (products) => set({ products }),
    setLoading: (loading) => set({ loading }),

    // Tạo sản phẩm mới
    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.price || !newProduct.image) {
            return { success: false, message: "Vui lòng điền đầy đủ thông tin sản phẩm." };
        }
        set({ loading: true }); // Bắt đầu loading
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newProduct),
            });
            const data = await res.json();
            set((state) => ({ products: [...state.products, data.data] }));
            return { success: true, message: "Sản phẩm mới đã được tạo." };
        } catch (error) {
            console.error(error);
            return { success: false, message: "Đã xảy ra lỗi khi tạo sản phẩm." };
        } finally {
            set({ loading: false }); // Kết thúc loading
        }
    },

    // Lấy danh sách sản phẩm
    fetchProducts: async () => {
        set({ loading: true }); // Bắt đầu loading
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
            const data = await res.json();
            set({ products: data.data });
        } catch (error) {
            console.error(error);
        } finally {
            set({ loading: false }); // Kết thúc loading
        }
    },

    // Xóa sản phẩm
    deleteProduct: async (pid) => {
        set({ loading: true }); // Bắt đầu loading
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${pid}`, { method: "DELETE" });
            const data = await res.json();
            if (!data.success) return { success: false, message: data.message };

            set((state) => ({ products: state.products.filter((product) => product._id !== pid) }));
            return { success: true, message: data.message };
        } catch (error) {
            console.error(error);
            return { success: false, message: "Đã xảy ra lỗi khi xóa sản phẩm." };
        } finally {
            set({ loading: false }); // Kết thúc loading
        }
    },

    // Cập nhật sản phẩm
    updateProduct: async (pid, updatedProduct) => {
        set({ loading: true }); // Bắt đầu loading
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${pid}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
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
        } catch (error) {
            console.error(error);
            return { success: false, message: "Đã xảy ra lỗi khi cập nhật sản phẩm." };
        } finally {
            set({ loading: false }); // Kết thúc loading
        }
    },
}));
