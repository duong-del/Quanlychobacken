import { responseError } from "@/utils/helpers/response.helper";
import { validateAsync } from "@/utils/helpers/validate.helpers";

export function validate(schema) {
    return async function (req, res, next) {
        const field = req.method === "GET" ? "query" : "body";
        console.log(req.originalUrl," => ",req[field])
        const [value, error] = await validateAsync(schema, req[field], req);
        
        if (Object.keys(error).length > 0) {
            return responseError(res, error ,400, "Validation Error");
        }
        req[field] = value;
        return next();
    };
}
