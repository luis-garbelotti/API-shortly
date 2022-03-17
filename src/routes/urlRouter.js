import { Router } from "express";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";
import { generateShorten } from "../controllers/urlsControllers.js";

const urlRouter = Router();

urlRouter.post('/urls/shorten', validateTokenMiddleware, generateShorten)

export default urlRouter;