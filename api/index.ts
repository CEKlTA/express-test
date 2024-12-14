const express = require("express");
const app = express();

app.get("/", (req, res) => res.sendFile(
    '../public/main.html', {root: __dirname }
));

app.get("/test", (req, res) => res.send("test"));


app.listen(8080, () => console.log("Server ready on port 3000."));

module.exports = app;