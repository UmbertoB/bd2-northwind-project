import { CreateOrderDTO, Order, Product } from "@api-interfaces"

export const createOrderApi: (createOrderDTO: CreateOrderDTO) => Promise<Response> =
(createOrderDTO) => {
  return fetch(`/api/order`, { method: 'POST', body: JSON.stringify(createOrderDTO), headers: { "Content-type": "application/json" }})
}

export const getOrdersApi: (page: number, search?: string, dateFrom?: string, dateTo?: string) => Promise<Order> =
(page, search = '', dateFrom = '', dateTo = '') => {
  return fetch(`/api/order?p=${page}${search ? `&q=${search}` : ''}${dateFrom && dateTo ? `&dateFrom=${dateFrom}&dateTo=${dateTo}` : ''}`)
    .then((r) => r.json())
}

export const getOrderProductsApi: (orderId: string) => Promise<Product[]> =
(orderId) => {
  return fetch(`/api/order/${orderId}`)
    .then((r) => r.json())
}
