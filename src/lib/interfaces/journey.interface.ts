export interface Journey {
  _id: string;
  title: string;
  description: string;
  user?: string;
  point?: string;
  trail?: string[];
  order: number;
  createdAt: string;
  updatedAt: string;
}
