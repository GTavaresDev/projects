import { jsonStore } from '../../services/jsonStore';

export class CombosService {
  public static getMovieNight(genreParam?: string) {
    const movies = jsonStore.readCollection('movies');
    const recipes = jsonStore.readCollection('recipes');

    if (movies.length === 0 || recipes.length === 0) {
      return null;
    }

    const filteredMovies = genreParam
      ? movies.filter((m) => m.genre?.toLowerCase() === genreParam.toLowerCase())
      : movies;

    const movieCandidates = filteredMovies.length > 0 ? filteredMovies : movies;
    const movie = movieCandidates[Math.floor(Math.random() * movieCandidates.length)];
    const recipe = recipes[Math.floor(Math.random() * recipes.length)];

    return {
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
    };
  }
}
