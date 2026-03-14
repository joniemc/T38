const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();

const PORT = 3000;
const SECRET_KEY = 'MiClaveSecreta';

//Creamos un objeto de conexión con todos los atributos de la conexión
//host, user, password, database
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'R00tP4ssw0rd',
    database: 'Libreria'
});

pool.getConnection((error, conexion) => {
    if (error) {
        console.log('Error de conexión a la base de datos');
    }
    else {
        console.log('Conexión exitosa');
    }
});

const MiPrimerMiddleware = (req, res, next)=>{
    const miparametro = req.headers['miparametroheader'];

    if(!miparametro || miparametro !== 'autorizado'){
        return res.status(401).json({status:401,message:'No autorizado, parametro no valido..'});
    }

    next();
};

const AuthMiddleware = (req, res, next)=>{
    const authHeader = req.headers['authorization'];

    if(!authHeader){
        return res.status(401).json({status:401,message:'No autorizado, el token es obligatorio..'});
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token,SECRET_KEY,(err, user)=>{
        if(err){
            return res.status(401).json({status:401,message:'No autorizado, token invalido..'});
        }
    });

    next();
};

app.use(express.json());

app.post('/api/login', async (req,res)=>{
    const {username, password} = req.body;
    if(!username || !password){
        return res.status(403).json({status:403,messge:'Usuario y contraseña son requeridos'});
    }

    const sql = 'SELECT Username, Password FROM Usuario WHERE Username = ? AND Estado = 1';

    pool.query(sql, [username, password],async (error, results)=>{
        if(error){
            return res.status(500).json({status:500,messge:'Error el la consulta sql..'});
        }

        if(results.length === 0){
            return res.status(401).json({status:401,messge:'Credenciales invalidas..'});
        }

        let user = results[0];
        const isMatch = await bcrypt.compare(password, user.Password);

        if(!isMatch){
            return res.status(401).json({status:401,messge:'Credenciales invalidas..'});
        }

        const token = jwt.sign({username: user.Username}, SECRET_KEY,{expiresIn:'1h'});

        return res.status(200).json({status:200,messge:'Inicio de sesión exitoso..',token: token});
    });

});

app.get('/api/headersParams', AuthMiddleware, (req, res)=>{
        
    res.send('Seguridad superada...');
});

app.get('/api/gethash/:texto',async (req,res)=>{
    const texto = req.params.texto;

    const SaltRound = 10;
    const hash = await bcrypt.hash(texto,SaltRound);

    res.send(hash);
});

app.get('/api/libros', AuthMiddleware, (req, res) => {
    const sql = 'SELECT * FROM Libro';
    pool.query(sql, (error, results) => {
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
    pool.query(sql, [AutorId], (error, results) => {
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

        pool.query(sql,[libro.titulo, libro.anioPublicacion, libro.genero, libro.estado, libro.ISBN, libro.autorId],(error,results)=>{
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