import {Admin} from "@/app/model/admin.model";
import { ADMIN_USERNAME,ADMIN_PASSWORD ,MAIL_SERVICE} from "@/config/constant";

export const initAdmin = async () => {   
    try {
        if(!ADMIN_USERNAME && !ADMIN_PASSWORD){
            console.log("admin does not set before\n");
            console.log(`use ADMIN_USERNAME ${ADMIN_USERNAME} and ADMIN_PASSWORD ${ADMIN_PASSWORD}`);
        }
        const admin = {
            adminname: ADMIN_USERNAME || "duong12345",
            password: ADMIN_PASSWORD  || "duong12345",
            email: MAIL_SERVICE || "duong12345@gmail.com"
        }
        await Admin.findOneAndUpdate(
            {adminname: ADMIN_USERNAME || "duong12345"},
            {$set : admin},
            {upsert:true}
        )
        console.log("admin init accound successfully");
    }
    catch (err) {
        console.log(err);
        throw err;
    }
    
}
