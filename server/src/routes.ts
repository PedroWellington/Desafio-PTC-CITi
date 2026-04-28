import express from "express";
import {  readAllUsers } from "./controllers/UserController";
import { create_calcado, readallcalcados, update_calcado, delete_calcado, getbyid_calcado} from "./controllers/CalcadoController";

const routes = express.Router();

routes.get("/users", readAllUsers);

routes.post("/calcado", create_calcado);
routes.get("/calcado", readallcalcados);
routes.patch("/calcado/:id", update_calcado);
routes.delete("/calcado/:id", delete_calcado); 
routes.get("/calcado/:id", getbyid_calcado);

export default routes;
