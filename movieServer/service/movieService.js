export const fetchMovieReview = async (imdbId, limit = 20) => {
  try {
    const url = `https://imdb-scraper4.p.rapidapi.com/?work_type=reviews_imdb&keyword_1=${imdbId}&keyword_2=${limit}`;

    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": process.env.RAPID_API_KEY,
        "x-rapidapi-host": "imdb-scraper4.p.rapidapi.com",
      },
    };

    const response = await fetch(url, options);
    
    if (!response.ok) {
      throw new Error("Failed to fetch reviews from RapidAPI");
    }

    const data = await response.json();
    console.log(data);
     const reviews = data || [];

    if (!reviews.length) {
      return [];
    }

     return reviews.map((review) => ({
      id: review.review_id,
      author: review.username || "Anonymous",
      rating: review.rating || null,
      summary: review.summary || "",
      content: review.text || "",
      date: review.submission_date || null,
      votes: {
        up: review.upVotes || 0,
        down: review.downVotes || 0,
      },
      spoiler: review.spoiler || false,
    }));

  } catch (error) {
    throw new Error(error.message || "Error fetching reviews");
  }
};

export const fetchMovieDetails = async (imdbId) => {
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?i=${imdbId}&apikey=${process.env.OMDB_KEY}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch movie from OMDb");
    }

    const data = await response.json();

    if (data.Response === "False") {
      throw new Error(data.Error || "Movie not found");
    }

     return {
      imdbId: data.imdbID,
      title: data.Title,
      year: data.Year,
      rated: data.Rated,
      runtime: data.Runtime,
      genre: data.Genre,
      director: data.Director,
      actors: data.Actors,
      plot: data.Plot,
      language: data.Language,
      country: data.Country,
      awards: data.Awards,
      poster: data.Poster,
      imdbRating: data.imdbRating,
      imdbVotes: data.imdbVotes,
    };

  } catch (error) {
    throw new Error(error.message || "Error fetching movie details");
  }
};

export const getPoster = () => {
  return [
    {
      title: "Inception",
      img: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg"
    },
    {
      title: "Interstellar",
      img: "https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg"
    },
    {
      title: "The Dark Knight",
      img: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg"
    },
    {
      title: "Avengers: Endgame",
      img: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg"
    },
    {
      title: "Stranger Things",
      img: "https://image.tmdb.org/t/p/w500/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg"
    },
    {
      title: "Breaking Bad",
      img: "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg"
    },
    {
      title: "Game of Thrones",
      img: "https://image.tmdb.org/t/p/w500/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg"
    },
    {
      title: "The Batman",
      img: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg"
    },
    {
      title: "Money Heist",
      img: "https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg"
    },
    {
      title: "Joker",
      img: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
    }
  ];
};