export interface ICreateService {
  title: string;
  description: string;
  price: number;
  categoryId: string;
}

export interface IUpdateService {
  title?: string;
  description?: string;
  price?: number;
  categoryId?: string;
}