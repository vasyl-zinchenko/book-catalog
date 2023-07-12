export interface Book {
  id: number;
  author: string;
  price: number;
  image: string;
  title: string;
  level: string;
  tags: string[];
  amount?: number;
  shortDescription: string;
  description: string;
  count: number | string;
  totalPrice?: number;
  isVisibleMessage?: boolean;
}
