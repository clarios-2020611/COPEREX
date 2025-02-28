import { Router } from "express";
import { createCategory, getAll } from "./categorys.controller.js";
import { validateJwt } from "../../middlewares/validate.jwt.js";

const api = Router();

api.post('/CreateCategory', validateJwt, createCategory);
api.get('/GetCategorys', validateJwt, getAll);

export default api;