import { api } from "@/services/api";
import type { PaginatedMeta } from "@/types/api";
import type {
  CreateProductPayload,
  Product,
  UpdateProductPayload,
} from "@/types/product";

type ResourceResponse<T> = { data: T };
type PaginatedProductResponse = { data: Product[]; meta?: PaginatedMeta };

const unwrapProduct = (payload: Product | ResourceResponse<Product>) => {
  if (payload && typeof payload === "object" && "data" in payload) {
    return payload.data;
  }

  return payload as Product;
};

export const listProductsRequest = async (
  params: Record<string, string | number>,
) => {
  const { data } = await api.get<PaginatedProductResponse>("/products", {
    params,
  });
  return data;
};

export const createProductRequest = async (payload: CreateProductPayload) => {
  const { data } = await api.post<Product | ResourceResponse<Product>>(
    "/products",
    payload,
  );
  return unwrapProduct(data);
};

export const updateProductRequest = async (
  productId: number,
  payload: UpdateProductPayload,
) => {
  const { data } = await api.put<Product | ResourceResponse<Product>>(
    `/products/${productId}`,
    payload,
  );

  return unwrapProduct(data);
};

export const deleteProductRequest = async (productId: number) => {
  await api.delete(`/products/${productId}`);
};
