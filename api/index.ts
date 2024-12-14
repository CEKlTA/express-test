const express = require("express");
const app = express();
const path = require('path');
const turso = require('./turso_db')

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

app.listen(process.env.URL || 3000, () => console.log("Server ready on port 3000."));

module.exports = app;