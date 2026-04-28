export type Product = {
  id: number;
  user_id: number;
  name: string;
  description: string | null;
  price: number;
  created_at?: string;
  updated_at?: string;
};

export type ProductPayload = {
  user_id: number;
  name: string;
  description?: string;
  price: number;
};
