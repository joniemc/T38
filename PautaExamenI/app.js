const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let libros = [{id:1,titulo:'Cien años de soledad',autor:'Gabriel García',anioPublicacion:1967,estado:'disponible'},
    {id:2,titulo:'El resplandor',autor:'Stephen King',anioPublicacion:1977,estado:'reservado'},
    {id:3,titulo:'El principito',autor:'Antoine de Saint-Exupéry',anioPublicacion:1977,estado:'Reservado'},
    {id:4,titulo:'El Túnel',autor:'Ernesto Sabaro',anioPublicacion:1948,estado:'Disponible'}];

app.get('/libros',(req,res)=>{
    res.status(200).json({status:200,message:'Sucess',data:libros});
})    

app.post('/libros',(req,res)=>{
    const libro = req.body;
    
    if(libro.id == null || libro.titulo==null || libro.autor == null || titulo.anioPublicacion==null || libro.estado == null){
        return res.status(400).json({status:201,message:'Faltan Datos/Elemento vacio...'});
    }else{
        libros.push(libro);
        return res.status(201).json({status:201,message:'Libro agregado exitosamente...'});
    }
})

app.put('/libros/:id',(req,res)=>{
    const libro = req.body;
    const id = parseInt(req.params.id);

    let isExist = false;

    libros.forEach(book =>{
        if(book.id === id){
            isExist = true;
            book.titulo = libro.titulo;
            book.autor = libro.autor;
            book.anioPublicacion = libro.anioPublicacion;
            book.estado = libro.estado;
        }
    })

    if(isExist){
        return res.status(200).json({status:200, message:'Libro Actualizado exitosamente...'});
    }else{
        return res.status(404).json({status:404,message:'Libro no encontrado...'});
    }

});
app.listen(PORT, ()=>{
    console.log(`El servidor esta escuchando en http://localhost:${PORT}`);
})