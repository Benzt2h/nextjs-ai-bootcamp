export type CartItem = {
  productId: string
  name: string
  price: number
  qty: number
}

export type CartStore = {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (productId: string) => void
  clearCart: () => void
  totalItems: () => number
  totalPrice: () => number
}
