const path = require("path");
const app = require("./app");


require("./configs/envConfig").envConfig()
require('./db/db').connectDB();

app.listen(process.env.PORT, () => {
    console.log(`Server Is Running On Port:${process.env.PORT}`);
});