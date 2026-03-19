const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

const otroNombre = require('./config/db');
const AuthMiddleware = require('./middleware/authMiddleware');

require('dotenv').config();

const PORT = process.env.PORT;
const SECRET_KEY = process.env.JWT_SECRET_KEY;

const MiPrimerMiddleware = (req, res, next)=>{
    const miparametro = req.headers['miparametroheader'];

    if(!miparametro || miparametro !== 'autorizado'){
        return res.status(401).json({status:401,message:'No autorizado, parametro no valido..'});
    }

    next();
};

app.use(express.json());
app.use(cors());

const authRoute = require('./routes/authRoute');

app.use('/api/', authRoute);

// Migrar estas APIs hacia el componente de librosRoute.js
app.get('/api/libros', AuthMiddleware, (req, res) => {
    const sql = 'SELECT * FROM Libro';
    otroNombre.query(sql, (error, results) => {
        if (error) {
            console.log('Existe un error en la consulta SQL');
            res.status(500).json({ status: 500, message: 'Error en la consulta SQL' });
        }
        else {
            res.status(200).json({ status: 200, message: 'Success', data: results });
        }
    });
});

app.get('/api/libros/:AutorId', AuthMiddleware, (req, res) => {
    const AutorId = parseInt(req.params.AutorId);
    const sql = 'SELECT a.Nombre,' +
        ' l.Titulo as Libro' +
        ' FROM Autor a' +
        ' LEFT JOIN Libro l' +
        ' ON (a.Id = l.AutorId)' +
        ' WHERE a.Id = ?;';

    console.log(sql);
    otroNombre.query(sql, [AutorId], (error, results) => {
        if (error) {
            console.log('Existe un error en la consulta SQL');
            res.status(500).json({ status: 500, message: 'Error en la consulta SQL' });
        }
        else {
            res.status(200).json({ status: 200, message: 'Success', data: results });
        }
    });
});

app.post('/api/libros', AuthMiddleware,(req,res)=>{
    const libro = req.body;
    if(!libro.titulo || !libro.autorId || !libro.anioPublicacion 
        || !libro.ISBN || !libro.genero || !libro.estado){
            return res.status(400).json({status:400,message:'Todos los campos son obligatorios...'});
    }
    
    const sql = 'INSERT INTO Libro (Titulo, AnioPublicacion, Genero, Estado,ISBN,AutorId) VALUES(?,?,?,?,?,?)';

        otroNombre.query(sql,[libro.titulo, libro.anioPublicacion, libro.genero, libro.estado, libro.ISBN, libro.autorId],(error,results)=>{
            if (error) {
                console.log('Existe un error en la consulta SQL');
                res.status(500).json({ status: 500, message: 'Error en la consulta SQL' });
            }
            else {
                libro.id = results.insertId;
                res.status(200).json({ status: 200, message: 'Success', data: libro });
            }
        });
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});