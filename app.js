const { urlencoded } = require("express");
const express = require("express");


const app = express();


// Settings:
app.set("port", 3000);
app.set("views", "./src/views")
app.set("view engine", "ejs");
//----------------------------------------------------------


// Middlewares:
app.use(express.json());
app.use(express.urlencoded({extended: false}));
//----------------------------------------------------------


// Importing Routes:
const participantesRoutes = require("./src/routes/router");
//----------------------------------------------------------


// Routes:
app.use("/", participantesRoutes);
//----------------------------------------------------------


// Static Files:
app.use(express.static("./src/styles"));
//----------------------------------------------------------


// Starting the Server:
app.listen(app.get("port"), () => {
    console.log("Server on Port 3000");
});
//----------------------------------------------------------