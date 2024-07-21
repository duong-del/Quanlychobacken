import admin from './admin';
import markets from './market';
import user from './user';

const route = (app) => {
    app.use("/admin",admin);
    app.use("/markets",markets);
    app.use("/user",user);
};

export default route; 