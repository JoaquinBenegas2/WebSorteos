const controller = {};
const myConnection = require("../database/db");


// Consultar Participantes
controller.listParticipantes = (req, res) => {
    myConnection.query("SELECT * FROM participantes", (err, results) => {
        if (err) {
            res.json(err);
        } else {
            res.render("showParticipantes", {data: results});
        }
    });
}


// Consultar Ganadores
controller.historialGanadores = (req, res) => {
    myConnection.query("SELECT * FROM historial_ganadores", (err, results) => {
        if (err) {
            res.json(err);
        } else {
            res.render("historialGanadores", {data: results});
        }
    });
}


// Eliminar Ganador
controller.deleteGanador = (req, res) => {
    const cod_par = req.params.cod_par;
    myConnection.query("DELETE FROM historial_ganadores WHERE cod_par = ?", [cod_par], (err, results)=>{
        if (err) {
            res.json(err);
        } else {
            res.redirect("/historialGanadores");         
        }
    });
}


// Sortear
controller.sortearParticipantes = (req, res) => {
    myConnection.query(`
    SELECT p.cod_par, p.nombre_par, p.apellido_par, p.ultimos_dni_par
    FROM participantes p
    LEFT JOIN historial_ganadores g ON p.cod_par = g.cod_par
    WHERE g.cod_par IS NULL 
    ORDER BY RAND() LIMIT 3
    `, (err, results) => {
        if (err) {
            res.json(err);
        } else {
            results.forEach((ganador) => {
                myConnection.query(`INSERT INTO historial_ganadores SET ?`, ganador)
            })
            res.render("showGanadores", {data: results});
        }
    })
}


// Guardar Participante
controller.saveParticipante = (req, res) => {
    const ultimos_dni_par = req.body.ultimos_dni_par;
    const nombre_par = req.body.nombre_par;
    const apellido_par = req.body.apellido_par;
    
    myConnection.query("INSERT INTO participantes SET ?", 
        {
            ultimos_dni_par:ultimos_dni_par, 
            nombre_par:nombre_par, 
            apellido_par:apellido_par, 
        }, (err, results) => {
            if (err) {
                res.json(err);
            } else {
                res.redirect("/");         
            }
        }
    );
}


// Editar Participante
controller.editParticipante = (req, res) => {
    const cod_par = req.params.cod_par;
    myConnection.query("SELECT * FROM participantes WHERE cod_par=?", [cod_par], (error, results)=>{
        if (error) {
            throw error;
        } else {
            res.render("editParticipantes", {data:results[0]});
        }
    });
}


// Actualizar Participante
controller.updateParticipante = (req, res) => {
    const cod_par = req.params.cod_par;
    const ultimos_dni_par = req.body.ultimos_dni_par;
    const nombre_par = req.body.nombre_par;
    const apellido_par = req.body.apellido_par;

    myConnection.query("UPDATE participantes SET ? WHERE cod_par = ?", 
        [{
            ultimos_dni_par:ultimos_dni_par, 
            nombre_par:nombre_par, 
            apellido_par:apellido_par, 
        }, cod_par], (error, results)=>{
            if (error) {
                console.log(error);
            } else {           
                res.redirect("/");         
            }
        }
    );
}


// Borrar Participante
controller.deleteParticipante = (req, res) => {
    const cod_par = req.params.cod_par;
    myConnection.query("DELETE FROM participantes WHERE cod_par = ?", [cod_par], (err, results)=>{
        if (err) {
            res.json(err);
        } else {
            res.redirect("/");         
        }
    });
}


// Export
module.exports = controller;