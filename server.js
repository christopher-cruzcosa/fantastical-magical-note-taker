// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");

//New Server
const app = express();
const PORT = process.env.PORT || 3001;

let noteCount = 0;
const idFormatter ="a"


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static(path.join(__dirname, '/public')));

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


//Displays all notes
app.get("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) throw err;
        return res.json(JSON.parse(data))
    });
})

app.post("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) throw err;

        let arrayOfObjects = JSON.parse(data);
        let newNote = req.body

        newNote.id = (idFormatter + noteCount);
        noteCount += 1;

        arrayOfObjects.push(newNote);

        fs.writeFile("./db/db.json", JSON.stringify(arrayOfObjects), "utf8", (err) => {
            if (err) throw err;
            console.log('New db file')
            return res.json(arrayOfObjects)
        })
    });
});


app.delete("/api/notes/:id", (req, res) => {
    const chosen = req.params.id;
    console.log(chosen);

    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) throw err;

        let arrayOfObjects = JSON.parse(data);
        let spliceLocation;


        for (let i = 0; i < arrayOfObjects.length; i++) {
            if (chosen === arrayOfObjects[i].id) {
                spliceLocation = i;
                console.log(spliceLocation)
            }
        };

        arrayOfObjects.splice(spliceLocation, 1);

        fs.writeFile("./db/db.json", JSON.stringify(arrayOfObjects), "utf8", (err) => {
            if (err) throw err;
            return res.json(arrayOfObjects)
        })
    });
});

