import { Router } from "express";
import {login,logout,create,remove} from "@/app/controller/admin.controller"
import { verifyTokenAll } from "@/utils/helpers/verifytoken";
import { validate } from "@/app/middleware/validate";
import { adminLogin,adminCreate } from "@/app/validateSchema/admin";

const router = Router();

router.post(
    '/login',
    validate(adminLogin),
    login
);

router.post(
    '/logout',
    verifyTokenAll("admin"), 
    logout
);

router.post(
    '/create',
    verifyTokenAll("admin"), 
    validate(adminCreate),
    create,
);

router.delete(
    '/delete',
    verifyTokenAll("admin"), 
    remove
);

export default router;