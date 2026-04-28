export type Product = {
  id: number;
  user_id: number;
  name: string;
  description: string | null;
  price: number;
  created_at?: string;
  updated_at?: string;
};

export type CreateProductPayload = {
  user_id: number;
  name: string;
  description?: string;
  price: number;
};

export type UpdateProductPayload = {
  user_id?: number;
  name?: string;
  description?: string;
  price?: number;
};
