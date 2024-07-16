const express = require("express");
const router = express.Router();
const Note = require('../models/Note');
const fetchuser = require('../middleware/fetchuser');
const { query, validationResult, body } = require('express-validator'); 


// ROUTE 1: Get all the notes using: GET "/api/notes/fetchallnotes". Login required.
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const note = await Note.find({user: req.user.id});
        res.json(note);
    } catch (error) {
        console.error(error.message);
        // If error occured, the status code will 500
        res.status(500).send("Internal server errors!");
    }
});

// ROUTE 2: Add a new note using: POST "/api/notes/addnote". Login required.
router.post("/addnote", fetchuser, [
    body('title', 'Enter a valid title').isLength({min: 3}),
    body('description', 'Description must be atleast 5 characters').isLength({min: 5}),
], async (req, res) => {
    
    try {
        const {title, description, tag} = req.body;
        // If there are errors, return bad request and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNotes = await note.save();
        res.json(savedNotes);
        console.log(savedNotes);
    } catch (error) {
        console.error(error.message);
        // If error occured, the status code will 500
        res.status(500).send("Internal server errors!");
    }
});

// ROUTE 3: Update an existig notes using: PUT "/api/notes/updatenote". Login required.
router.put("/updatenote/:id", fetchuser, async (req, res) => {
    const {title, description, tag} = req.body;
    // Create a newNote object
    const newNote = {};
    try {
        if(title && description && tag) {
            newNote.title = title;
            newNote.description = description;
            newNote.tag = tag;
        }
    
        // Find the note to be updated and update it.
        let note = await Note.findById(req.params.id);
        // if note not found
        if(!note) {
            return res.status(404).send("Not Found");
        }
        // note.user.toString() is not equal to req.user.id
        if(note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowd");
        }
    
        note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
        res.json({note});
    } catch (error) {
        console.error(error.message);
        // If error occured, the status code will 500
        res.status(500).send("Internal server errors!");
    }
    
});

// ROUTE 4: Delete an existig notes using: DELETE "/api/notes/deletenote". Login required.
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    // Find the note to be deleted and delete it.
    try {
        let note = await Note.findById(req.params.id);
        // if note not found
        if(!note) {
            return res.status(404).send("Not Found");
        }
        // note.user.toString() is not equal to req.user.id
        if(note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowd");
        }

        note = await Note.findByIdAndDelete(req.params.id);
        res.json({"Success": "Note has been deleted", note: note});
    } catch (error) {
        console.error(error.message);
        // If error occured, the status code will 500
        res.status(500).send("Internal server errors!");
    }
});
module.exports = router;