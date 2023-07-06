import mongoose from "mongoose";

/**
 * Initialize the database
 * dotenv must be configured before calling this function
 */
async function init() {
    const mongoURL = process.env["MONGO_URL"];
    if (typeof mongoURL !== "string")
        throw Error("[database.init] failed to get mongo url: was dotenv.config called?");

    try {
        // callback log on connected
        const db = mongoose.connection;
        db.on("connected", () => {
            console.log("[database.init]: connected to MongoDB: " + db.host + ":" + db.port +
                "/" + db.name);
        });

        // connect to db
        await mongoose.connect(mongoURL);
    } catch(e) {
        console.error("[database.init]: error: failed to connect to mongodb: ", e);
        throw e; // exception transparent
    }
}

export default {
    init,
};
