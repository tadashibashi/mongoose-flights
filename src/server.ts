import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import vars from "./middleware/vars";
import methodOverride from "./middleware/methodOverride";
import router from "./router";
import database from "./database";

// constants
const PORT = 3000;
dotenv.config();

async function main() {

    // initialize app
    const app = express();

    // template engine
    app.set("view engine", "ejs");
    app.set("views", "views");

    // middleware
    app.use(methodOverride("_method"));
    app.use(morgan("dev")); // logging
    app.use(express.urlencoded({extended: false})); // form/body parser
    app.use(vars());
    app.use("/", router);

    // connect to mongodb
    await database.init();

    app.listen(PORT, () => {
        console.log("Server is listening at: http://localhost:" + PORT);
    });
}

main()
    .catch(err => console.error("[server.main]: failed to run server: ", err));
