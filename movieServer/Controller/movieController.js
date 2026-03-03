import { fetchMovieDetails, fetchMovieReview, getPoster } from "../service/movieService.js";
import { validateImdb } from "../utils/validateIMdb.js";
import { generateMovieInsights } from "../aiService/aiReview.js"

export const getMovieByImdbId = async (req, res) => {
  try {
    const { imdbId } = req.body;

    console.log("Hello")
 
    if (!validateImdb(imdbId)) {
      return res.status(400).json({
        error: "Invalid IMDb ID format. Example: tt0133093",
      });
    }

    const movie = await fetchMovieDetails(imdbId);

    return res.status(200).json(movie);

  } catch (error) {
    return res.status(500).json({
      error: error.message || "Internal server error",
    });
  }
};

export const getMoviesReview=async(req,res)=>{

  try{
     const { imdbId } = req.body;


    if (!validateImdb(imdbId)) {
      return res.status(400).json({
        error: "Invalid IMDb ID format. Example: tt0133093",
      });
    }

    const review=await fetchMovieReview(imdbId);
    const aiReview=await generateMovieInsights(review);
     return res.status(200).json(aiReview);
  }
  catch(error){
     return res.status(500).json({
      error: error.message || "Internal server error",
    });
  }
}

export const getMoviePoster=async(req,res)=>{
  try{
    const poster=getPoster();
    return res.status(200).json(poster);
  }catch(e){
    console.log(e);
  }
}