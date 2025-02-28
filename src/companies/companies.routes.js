import { Router } from "express";
import { validateJwt } from "../../middlewares/validate.jwt.js";
import { addCompany, exportCompaniesToExcel, getAll } from "./companies.controller.js";

const api = Router();

api.post('/CreateCompany', validateJwt, addCompany);
api.get('/GetCompanies', validateJwt, getAll);
api.get('/GetReport', validateJwt, exportCompaniesToExcel);

export default api;