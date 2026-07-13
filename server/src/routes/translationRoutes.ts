import { Router } from "express";
import { translateText } from "../controllers/translationController.js";

const translationRouter = Router();

translationRouter.post("/", translateText);

export default translationRouter;