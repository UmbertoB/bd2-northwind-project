import { Customer, CustomerDTO } from "@api-interfaces"

export const createCustomerApi: (customer: Customer) => Promise<Response> =
(customer) => {
  return fetch(`/api/customer`, { method: 'POST', body: JSON.stringify(customer), headers: { "Content-type": "application/json" }})
}

export const getCustomersApi: (page: number, search?: string) => Promise<CustomerDTO> =
(page, search = '') => {
  return fetch(`/api/customer?p=${page}${search ? `&q=${search}` : ''}`)
    .then((r) => r.json())
}

export const deleteCustomerApi = (customerId: string) => {
  return fetch(`/api/customer/${customerId}`, { method: 'DELETE' })
  .then((r) => r.json())
}

export const updateCustomerApi = (c: Customer) => {
  return fetch(`/api/customer/${c.CustomerID}`, { method: 'PUT', body: JSON.stringify(c), headers: { "Content-type": "application/json" } })
  .then((r) => r.json())
}

export const getAllCustomersApi: () => Promise<Customer[]> = () => {
  return fetch(`/api/customer/all`)
    .then((r) => r.json())
}