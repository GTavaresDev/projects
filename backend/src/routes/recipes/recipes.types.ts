import { z } from 'zod';

export const createRecipeSchema = z.object({
  name: z.string().min(1, 'Name is required').trim(),
  description: z.string().min(1, 'Description is required').trim(),
  image: z.string().url('Image must be a valid URL'),
  category: z.string().optional(),
  prepTime: z.string().optional(),
  cookTime: z.string().optional(),
  servings: z.number().optional(),
  difficulty: z.string().optional(),
  calories: z.number().optional(),
  ingredients: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
});

export const updateRecipeSchema = createRecipeSchema.partial();

export type CreateRecipeInput = z.infer<typeof createRecipeSchema>;
export type UpdateRecipeInput = z.infer<typeof updateRecipeSchema>;
