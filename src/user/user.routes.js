import { Router } from "express";
import { login } from "./user.controller.js";
import { loginValidator } from "../../middlewares/validators.js";

const api = Router();

api.post('/login', loginValidator, login);

export default api;