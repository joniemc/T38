const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

require('dotenv').config();

const router = express.Router();

router.post('/login', async (req,res)=>{
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

        const token = jwt.sign({username: user.Username}, process.env.JWT_SECRET_KEY,{expiresIn:'1h'});

        return res.status(200).json({status:200,messge:'Inicio de sesión exitoso..',token: token});
    });

});

router.get('/api/gethash/:texto',async (req,res)=>{
    const texto = req.params.texto;

    const SaltRound = 10;
    const hash = await bcrypt.hash(texto,SaltRound);

    res.send(hash);
});

module.exports = router;