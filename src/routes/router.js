const express = require("express");
const router = express.Router();

const participanteController = require("../controllers/participanteController");

router.get("/", participanteController.listParticipantes);

// Participantes
router.post("/add", participanteController.saveParticipante);
router.get("/delete/:cod_par", participanteController.deleteParticipante);
router.get("/edit/:cod_par", participanteController.editParticipante);
router.post("/update/:cod_par", participanteController.updateParticipante);
router.get("/sortear", participanteController.sortearParticipantes)
router.get("/historialGanadores", participanteController.historialGanadores);
router.get("/deleteGanador/:cod_par", participanteController.deleteGanador);

module.exports = router;