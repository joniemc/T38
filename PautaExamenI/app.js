const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let libros = [{ "id": 1, "titulo": "La comunidad del anillo", "autor": "Jrr tolkien", "anioPublicacion": 1955, "estado": "Disponible" }]

function generarID() {
    if (libros.length === 0) {
        return 1;
    } //lo agrego por si el arreglo queda vacío en algún momento.
    const ultimoLibro = libros[libros.length - 1] //medimos el tamaño del arreglo
    return ultimoLibro.id + 1; //añadimos +1 al nuevo ID
};

app.get("/libros", (req, res) => {
    res.json({ status: 200, message: 'Success', data: libros });

});

app.post("/libros", (req, res) => {
    const { titulo, autor, anioPublicacion, estado } = req.body;

    if (!titulo || !autor || !anioPublicacion || !estado) {
        return res.status(400).json({ status: 400, error: 'Error, faltan campos obligatorios' });
    }

    const nuevoLibro = {
        id: generarID(),
        titulo,
        autor,
        anioPublicacion,
        estado
    }

    libros.push(nuevoLibro);
    res.json({ status: 201, message: 'Libro agregado.', data: nuevoLibro });
})

app.put("/Libros/:id", (req, res) => {
    const libro = req.body
    const id = req.params.id;


    let isExist = false;
    libros.forEach(l => {
        if (l.id === parseInt(id)) {
            isExist = true;
            l.titulo = req.body.titulo;
            l.autor = req.body.autor;
            l.anioPublicacion = req.body.anioPublicacion;
            l.estado = req.body.estado;
        }
    });

    if (!isExist) {
        return res.status(404).json({ status: 404, error: "Libro no encontrado." });
    }

    res.json({ status: 200, message: 'Libro actualizado correctamente' });
});

app.listen(PORT, () => {
    console.log(`Escuchando en http://localhost:${PORT}/`);
});