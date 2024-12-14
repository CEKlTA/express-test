const express = require("express");
const app = express();
const path = require('path');

import { turso } from './turso_db';

const PORT = process.env.URL || 8000;

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/main.html'))
});

app.get("/test", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/test.html'))
});

app.get("/users", async (req, res) => {
    res.send(await get_all_users());
})

async function get_all_users() {
    return await turso.execute("SELECT * FROM users");
}

app.listen(PORT, () => console.log("Server ready on port " + PORT));

module.exports = app;