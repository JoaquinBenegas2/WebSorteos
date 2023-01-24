const mysql = require("mysql");

const myConnection = mysql.createConnection({
    host     : "localhost",
    user     : "root",
    password : "",
    database : "db_sorteo"  
});

myConnection.connect((error) => {
    if (error) {
      console.error("Error: " + error);
      return;
    }
    console.log("¡Conexión a la Base de Datos Exitosa!");
});

module.exports = myConnection;