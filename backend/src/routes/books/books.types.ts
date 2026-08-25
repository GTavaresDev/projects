import { z } from 'zod';

export const BookSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  image: z.string().url('Image must be a valid URL'),
  author: z.string().min(1, 'Author is required').optional(),
  genre: z.string().optional(),
  year: z.number().int().optional(),
  pages: z.number().int().positive().optional(),
  rating: z.number().min(0).max(10).optional(),
  tags: z.array(z.string()).optional(),
});

export const BookUpdateSchema = BookSchema.partial();

export interface Book {
  id: string;
  name: string;
  description: string;
  image: string;
  author?: string;
  genre?: string;
  year?: number;
  pages?: number;
  rating?: number;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
}
