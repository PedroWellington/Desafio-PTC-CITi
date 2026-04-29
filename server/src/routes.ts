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


//routes do desafio extra

import { find_calcados_tamanho, find_calcados_marca, get_all_pairs_calcados} from "./repositorie/CalcadoRepositorie";

//especificando qual o parametro deve ser usado para cada rota
routes.get("/calcado/tamanho/:tamanho", find_calcados_tamanho);
routes.get("/calcado/marca/:marca", find_calcados_marca);
routes.get("/calcado/palavra_chave/:palavra_chave", get_all_pairs_calcados)
export default routes;
