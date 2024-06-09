import app from "./app.js";
import { ENV_CONFIG_PROCES } from "./config.js";
import { connectDB } from "./db/db.config.js";

const PORT = ENV_CONFIG_PROCES.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server listen and running in PORT: ${PORT}`);
    connectDB();
});