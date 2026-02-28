CREATE DATABASE Libreria;

use Libreria;

CREATE TABLE `Autor` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(90) NOT NULL,
  `Nacionalidad` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`Id`)
);

CREATE TABLE `Libro` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Titulo` VARCHAR(90) NOT NULL,
  `AnioPublicacion` INT NOT NULL,
  `Genero` VARCHAR(35) NOT NULL,
  `Estado` BIT NOT NULL,
  `ISBN` VARCHAR(20) NOT NULL,
  `AutorId` INT NOT NULL,
  PRIMARY KEY (`Id`),
  FOREIGN KEY (`AutorId`)
      REFERENCES `Autor`(`Id`)
);

INSERT INTO Autor (Nombre,Nacionalidad) VALUES('Gabriel Garcia Marquez', 'Colombia');
INSERT INTO Autor (Nacionalidad, Nombre) VALUES('John Maxwell', 'Estadounidense');
UPDATE Autor set Nacionalidad = 'Estadounidense', Nombre ='John Maxwell' where id = 2;

INSERT INTO Libro (Titulo, AnioPublicacion, Genero, Estado,ISBN,AutorId) VALUES('Cien años de soledad',1967,'Novela',1,'ISB0001',1);
INSERT INTO Libro (Titulo, AnioPublicacion, Genero, Estado,ISBN,AutorId) VALUES('Las 17 leyes para el trabajo en equipo',2015,'Motivacional',1,'ISB0002',2);

UPDATE Libro SET Titulo = 'CAMBIADO' WHERE AutorId = 3;

SELECT * FROM Libros;

SELECT * FROM Autor;

SELECT a.Nombre,
		l.Titulo as Libro
FROM Autor a
LEFT JOIN Libro l
ON (a.Id = l.AutorId)
WHERE a.Id = 2;

SELECT a.Nombre,l.Titulo as Libro FROM Autor a LEFT JOIN Libro l ON (a.Id = l.AutorId) WHERE a.Id = 2;