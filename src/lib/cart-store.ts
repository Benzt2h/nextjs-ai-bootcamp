import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { toast } from 'sonner'
import type { CartItem, CartStore } from "@/types/cart"

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const existing = get().items.find((i) => i.productId === item.productId)
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.productId === item.productId
                ? { ...i, qty: i.qty + item.qty }
                : i
            ),
          })
        } else {
          set({ items: [...get().items, item] })
        }
        if (typeof window !== "undefined") {
          toast.success("เพิ่ມเข้าตะกร้าแลว", {
            description: item.name,
            duration: 2000,
          })
        }
      },
      removeItem: (productId) =>
        set({
          items: get().items.filter((i) => i.productId !== productId),
        }),
      clearCart: () => set({ items: [] }),
      totalItems: () =>
        get().items.reduce((total, item) => total + item.qty, 0),
      totalPrice: () =>
        get().items.reduce((total, item) => total + item.qty * item.price, 0),
    }),
    {
      name: 'skill-cart',
    }
  )
)
