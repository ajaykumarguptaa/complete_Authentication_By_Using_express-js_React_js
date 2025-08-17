import { Router } from "express"
import { SignupValidation,LoginValidation } from "../Middlewares/Validation.js";
import { signUp ,login} from "../Controllers/Auth.controller.js";

const Authrouter = Router()

Authrouter.post("/login", LoginValidation, login);

Authrouter.post("/signup", SignupValidation, signUp);

export default Authrouter;