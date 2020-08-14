const express = require("express");
const server = express();
const sql = require("./connection")

const routeUsuarios = require("./route/usuarios")

server.use(express.json())


server.use("/usuarios", routeUsuarios)

server.post('/login', async (req, res) => {
    const usuario = req.body
    // {usuario: aeolguin , contrasenia: asd123-}
    try {
        sql.query('SELECT * FROM usuarios WHERE usuario = :nombreUsuario AND contrasenia = :contraseniaUsuario',
            {
                replacements: {
                    nombreUsuario: usuario.usuario,
                    contraseniaUsuario: usuario.contrasenia
                },
                type: sql.QueryTypes.SELECT
            }).then(result => {
                console.log(result)
                //token
                res.status(200).json(result)
            })
    } catch (error) {
        console.log(error.message)
        res.status(404).json({ err: error.message })
    }
});

server.post("/register", (req, res) => {
    const usuario = req.body

    try {
        sql.query(`
            INSERT INTO usuarios
            (nombre,apellido,usuario,contrasenia)
            values (?,?,?,?)
        `,
            {
                replacements: [usuario.nombre,
                usuario.apellido,
                usuario.usuario,
                usuario.contrasenia]
            }).then(result => {
                console.log(result)
                //token
                res.status(200).json(result)
            })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ err: error.message })
    }
})


server.get("/publicaciones", (req, res) => {
    try {
        sql.query('SELECT * FROM publicaciones').then(result => {
            console.log(result)
            //token
            res.status(200).json(result[0])
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ err: error.message })
    }
})


server.post("/publicaciones", (req, res) => {
    const publicacion = req.body

    try {
        sql.query(`
            INSERT INTO publicaciones
            (titulo,contenido,fecha_creacion,id_usuario)
            values (?,?,NOW(),?)
        `,
            {
                replacements: [publicacion.titulo,
                publicacion.contenido,
                publicacion.idUsuario]
            }).then(result => {
                console.log(result)
                //token
                res.status(200).json(result)
            })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ err: error.message })
    }
})

server.put("/publicaciones/:id", (req, res) => {
    const updateUser = req.body
    const idPublicacion = req.params["id"]

    try {
        sql.query(`
            UPDATE publicaciones 
            set titulo = ?,
                contenido = ?
            WHERE id = ?
        `,
            {
                replacements: [updateUser.titulo,
                updateUser.contenido,
                    idPublicacion
                ]
            }).then(result => {
                console.log(result)
                //token
                res.status(200).json(result)
            })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ err: error.message })
    }
})

server.delete("/publicaciones/:id", (req, res) => {
    const idPublicacion = req.params["id"]

    try {
        sql.query(`
            DELETE FROM publicaciones 
            WHERE id = ?
        `,
            {
                replacements: [
                    idPublicacion
                ]
            }).then(result => {
                console.log(result)
                //token
                res.status(200).json(result)
            })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ err: error.message })
    }
})


server.use((err, req, res, next) => {
    if (err) {
        res.status(500).send("error en el servidor")
    }

    next();
})




// sql.query("select * from usuarios", { type: Sequelize.QueryTypes.SELECT }).then(resultados => {
//     console.log(resultados)
// }).catch(err => {
//     console.log(err)
// })

server.listen(3000, () => {
    console.log("server is ready")
})