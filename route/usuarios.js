const { Router } = require("express");

const route = Router();

const sql = require("../connection")


route.get('/', async (req, res) => {
    try {
        sql.query('SELECT * FROM usuarios').then(result => {
            console.log(result)
            //token
            res.status(200).json(result[0])
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ err: error.message })
    }
});

module.exports = route;