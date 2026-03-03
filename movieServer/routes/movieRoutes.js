import express from "express";
import { getMovieByImdbId ,getMoviesReview,getMoviePoster} from "../Controller/movieController.js";
import { Source$outboundSchema } from "@mistralai/mistralai/models/components/source.js";

const router = express.Router();

router.post("/movie", getMovieByImdbId);
router.post("/review", getMoviesReview);
router.get("/moviePoster",getMoviePoster);

router.get("/check",(req,res)=>{
    res.send("ok.......");
})
export default router;