import { Router } from "express";
import {login , create,detail,update,remove,logout ,payment, uploadArea} from "@/app/controller/user.controller"
import { userCreate,userUpdate,userLogin,userUpdateArea} from "@/app/validateSchema/user";
import { verifyTokenAll } from "@/utils/helpers/verifytoken";
import { validate } from "@/app/middleware/validate";
import { testlog } from "@/app/middleware/testlog";
const router = Router();

router.post(
    '/login',
    validate(userLogin),
    login
);

router.post(
    "/logout",
    verifyTokenAll("user"),
    logout,
)

router.post(
    '/create',
    validate(userCreate),
    create,
);

router.get(
    '/me',
    verifyTokenAll("user"), 
    detail
)

router.delete(
    '/delete',
    verifyTokenAll("user"),
     remove
);

router.put(
    '/update',
    verifyTokenAll("user"),
    validate(userUpdate),
    update
);

router.put(
    '/updateArea',
    verifyTokenAll("user"),
    validate(userUpdateArea),
    uploadArea
)

router.post(
    '/payment',
    verifyTokenAll("user"),  // only user can make payment
    payment
)


export default router;