import { Router, Request, Response } from 'express';
import { jsonStore } from '../services/jsonStore';

const router = Router();

// Universal Spotlight Search across all collections (for Command Palette / Cmd+K search)
router.get('/search', (req: Request, res: Response) => {
  const query = (req.query.q as string) || '';
  const limitPerCollection = parseInt((req.query.limit as string) || '5', 10);

  if (!query.trim()) {
    res.status(400).json({ error: { code: 'INVALID_QUERY', message: 'Search query parameter "q" is required' } });
    return;
  }

  const collections = jsonStore.getAvailableCollections();
  const results: Record<string, any[]> = {};
  let totalMatches = 0;

  for (const collection of collections) {
    const searchResult = jsonStore.search(collection, query, { page: 1, limit: limitPerCollection });
    if (searchResult.data.length > 0) {
      results[collection] = searchResult.data;
      totalMatches += searchResult.meta.total;
    }
  }

  res.status(200).json({
    data: {
      query,
      totalMatches,
      results,
    },
  });
});

// Random Item Generator (Roulette / "Feeling Lucky")
router.get('/random', (req: Request, res: Response) => {
  const collectionParam = req.query.collection as string;
  const collections = collectionParam ? [collectionParam] : jsonStore.getAvailableCollections();
  
  if (collections.length === 0) {
    res.status(404).json({ error: { code: 'NO_DATA', message: 'No collections available' } });
    return;
  }

  const selectedCollection = collections[Math.floor(Math.random() * collections.length)];
  const items = jsonStore.readCollection(selectedCollection);

  if (items.length === 0) {
    res.status(404).json({ error: { code: 'EMPTY_COLLECTION', message: `Collection ${selectedCollection} is empty` } });
    return;
  }

  const randomItem = items[Math.floor(Math.random() * items.length)];

  res.status(200).json({
    data: {
      collection: selectedCollection,
      item: randomItem,
    },
  });
});

// Random Single Collection Item: GET /api/v1/:collection/random
router.get('/:collection/random', (req: Request, res: Response, next) => {
  const { collection } = req.params;
  const items = jsonStore.readCollection(collection);

  if (items.length === 0) {
    return next(); // pass down if not matching
  }

  const randomItem = items[Math.floor(Math.random() * items.length)];
  res.status(200).json({
    data: randomItem,
  });
});

// Creative Combo: Movie Night Recommendation (Pairs a Movie + Recipe!)
router.get('/combos/movie-night', (req: Request, res: Response) => {
  const movies = jsonStore.readCollection('movies');
  const recipes = jsonStore.readCollection('recipes');

  if (movies.length === 0 || recipes.length === 0) {
    res.status(404).json({ error: { code: 'DATA_UNAVAILABLE', message: 'Movies or recipes dataset is empty' } });
    return;
  }

  const genreParam = req.query.genre as string;
  const filteredMovies = genreParam ? movies.filter((m) => m.genre?.toLowerCase() === genreParam.toLowerCase()) : movies;
  const movie = (filteredMovies.length > 0 ? filteredMovies : movies)[Math.floor(Math.random() * (filteredMovies.length > 0 ? filteredMovies.length : movies.length))];
  const recipe = recipes[Math.floor(Math.random() * recipes.length)];

  res.status(200).json({
    data: {
      title: `The Ultimate ${movie.genre || 'Cinema'} & Comfort Food Evening`,
      theme: movie.genre || 'Entertainment',
      movie: {
        id: movie.id,
        name: movie.name,
        description: movie.description,
        genre: movie.genre,
        rating: movie.rating,
        duration: movie.duration,
        image: movie.image,
      },
      recipe: {
        id: recipe.id,
        name: recipe.name,
        description: recipe.description,
        category: recipe.category,
        prepTime: recipe.prepTime,
        cookTime: recipe.cookTime,
        difficulty: recipe.difficulty,
        image: recipe.image,
      },
      tip: `Start cooking the ${recipe.name} (${recipe.prepTime || '15 min'} prep) before pressing play on ${movie.name}!`,
    },
  });
});

export const spotlightRoutes = router;
