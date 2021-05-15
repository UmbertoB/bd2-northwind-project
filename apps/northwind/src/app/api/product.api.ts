import { Product } from "@api-interfaces"

export const getProductsApi: () => Promise<Product[]> = () => {
  return fetch(`/api/product`)
    .then((r) => r.json())
}
