export type AdminStats = {
  todaySales: number
  todayOrders: number
  pendingOrders: number
  totalProducts: number
  totalUsers: number
}

export type RevenuePoint = {
  date: string
  revenue: number
  orders: number
}

export type AdminOrderItem = {
  id: number
  customerName: string
  amount: number
  status: string
  date: string
}

export type Period = '7d' | '30d' | '90d'

export type ApiResponse<T> = { success: true; data: T } | { success: false; error: string }

export type AdminProduct = {
  id: string
  name: string
  description: string | null
  price: number
  categoryId: string
  categoryName: string
}

export type CategoryOption = {
  id: string
  name: string
}

export type PaginatedProducts = {
  products: AdminProduct[]
  total: number
  page: number
  pageSize: number
}
