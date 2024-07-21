import { TOKEN_EXP ,ALGORITHM ,SECRET_KEY } from "@/config/constant";
import jwt from "jsonwebtoken"

const algorithm = ALGORITHM ? ALGORITHM : null;

export const genToken = (data,SECRET_KEY = "keya")=>{
    return jwt.sign(
        data,
        SECRET_KEY,
        { 
            ...(algorithm && { algorithm: algorithm}),
            expiresIn: TOKEN_EXP
        }
    );
}
