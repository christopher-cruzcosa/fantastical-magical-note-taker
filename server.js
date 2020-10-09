// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");

//New Server
const app = express();
const PORT = process.env.PORT || 3001;


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Starts the server to begin listening
// =============================================================
app.listen(PORT, () => {
  console.log("App listening on PORT " + PORT);
});

// Routes
// =============================================================

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});


// let notesJson = fs.readFile("./db/db.json", "utf8", (err, data) => {
//   console.log(data);
//   return data
// })

//Displays all notes
app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    console.log(data);
    return res.json(data)
  });
})

app.post("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) throw err;

    let arrayOfObjects = JSON.parse(data)
    arrayOfObjects.push(req.body);

    fs.writeFile("./db/db.json", JSON.stringify(arrayOfObjects), "utf8", (err) => {
      if (err) throw err;
      res.json(req.body)
      console.log('New db file')
    })
  });
});
