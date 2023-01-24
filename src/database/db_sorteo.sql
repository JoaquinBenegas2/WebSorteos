DROP DATABASE IF EXISTS db_sorteo;
CREATE DATABASE db_sorteo;
USE db_sorteo;

-- Creación de la Tabla:

CREATE TABLE participantes (
    cod_par INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nombre_par VARCHAR(64) NOT NULL,
	apellido_par VARCHAR(64) NOT NULL,
    ultimos_dni_par VARCHAR(3) NOT NULL
);

CREATE TABLE historial_ganadores (
	cod_par INT NOT NULL,
    nombre_par VARCHAR(64) NOT NULL,
	apellido_par VARCHAR(64) NOT NULL,
    ultimos_dni_par VARCHAR(3) NOT NULL,
    fecha_ganador DATETIME DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (cod_par) REFERENCES participantes(cod_par) ON DELETE CASCADE
);

INSERT INTO participantes (nombre_par, apellido_par, ultimos_dni_par)
VALUES 
("Joaquin", "Benegas", "045"),
("Agustin"," Maldonado", "001"),
("Tomas", "Vissani", "002"),
("Luis", "Villagra", "003"),
("Ana", "Bazan Palomeque", "004"),
("Agustin", "Cosso", "005"),
("Gonzalo", "Luna", "006"),
("Mateo", "Gatica", "007");

INSERT INTO historial_ganadores (cod_par, nombre_par, apellido_par, ultimos_dni_par)
SELECT p.cod_par, p.nombre_par, p.apellido_par, p.ultimos_dni_par
FROM participantes p
LEFT JOIN historial_ganadores g ON p.cod_par = g.cod_par
WHERE g.cod_par IS NULL 
ORDER BY RAND() LIMIT 3