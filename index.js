const express = require("express");
const server = express();
const Sequelize = require("sequelize")

server.use(express.json())


server.post("/login", (req, res) => {

})

server.post("/register", (req, res) => {

})


server.get("/publicaciones", (req, res) => {

})


server.post("/publicaciones", (req, res) => {

})


server.use((err, req, res, next) => {
    if (err) {
        res.status(500).send("error en el servidor")
    }

    next();
})


const sql = new Sequelize("mysql://test:test@localhost:3306/encuentro50")

sql.query("select * from usuarios", { type: Sequelize.QueryTypes.SELECT }).then(resultados => {
    console.log(resultados)
}).catch(err => {
    console.log(err)
})

server.listen(3000, () => {
    console.log("server is ready")
})