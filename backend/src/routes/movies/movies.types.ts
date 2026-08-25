import { z } from 'zod';

export const createMovieSchema = z.object({
  name: z.string().min(1, 'Name is required').trim(),
  description: z.string().min(1, 'Description is required').trim(),
  image: z.string().url('Image must be a valid URL'),
  genre: z.string().optional(),
  year: z.number().optional(),
  rating: z.number().optional(),
  duration: z.string().optional(),
  director: z.string().optional(),
  featured: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
});

export const updateMovieSchema = createMovieSchema.partial();

export type CreateMovieInput = z.infer<typeof createMovieSchema>;
export type UpdateMovieInput = z.infer<typeof updateMovieSchema>;
