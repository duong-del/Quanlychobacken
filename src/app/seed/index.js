import { initAdmin } from "./admin";
import { connectToDatabase } from "@/config/mongodb";
const seed = async ()=>{
    await connectToDatabase();
    await initAdmin();
}
seed();