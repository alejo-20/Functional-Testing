export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  shippingInfo: ShippingInfo;
}

export interface ShippingInfo {
  name: string;
  address: string;
  city: string;
  zipCode: string;
  phone: string;
}
