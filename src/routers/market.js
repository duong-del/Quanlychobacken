import { Router } from "express";
import {filter,create,detail,update,remove,payment} from "@/app/controller/market.controller"
import { filterArea,areaCreate,areaUpdate,areaDelete } from "@/app/validateSchema/areaMarket";
import { validate } from "@/app/middleware/validate";
import { verifyTokenAll } from "@/utils/helpers/verifytoken";

const router = Router();


router.get(
    '/search',
    validate(filterArea),
    filter
)
router.post(
    '/create',
    verifyTokenAll("admin"),  // only admin can create an area
    validate(areaCreate),
    create,
);

router.get(
    '/detail',
    validate(areaDelete),
    detail
)

router.delete(
    '/delete',
    verifyTokenAll("admin"),  // only admin can delete an area
    validate(areaDelete),
    remove
);

router.put(
    '/update',
    verifyTokenAll("admin"),  // only admin can update an area
    validate(areaUpdate),
    update
);




export default router;