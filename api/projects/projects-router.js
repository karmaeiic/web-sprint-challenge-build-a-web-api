const express = require("express");
const router = express.Router();
const db = require("../data/helpers/projectModel");
const actionsDb = require("../data/helpers/actions-model")

router.get("/", (req, res) => {
    db.get().then(projects => {
        res.status(200).json(projects);
    }).catch(err => {
        res.status(500).json({message: "A server error has occurred"})
    });
});

router.post("/", (req, res) => {
    const {name, description} = req.body;
    if(!name || !desciption) return res.status(400).json({message: "Name and description are required"});
    db.insert(req.body).then(newProject => {
        res.status(201).json(newProject);
    }).catch(err => {
        res.status(500).json({message: "A server error has occurred"})
    })
});

router.get("/:id", (req, res) => {
    db.get(req.params.id).then(project => {
        if (!project) return res.status(404).json({message: "Project doesnt exist"})
        res.status(200).json({message: "A server error has occured"});
    })
});

router.put("/:id", (req, res) => {
    const changes = req.body;
    if (!changes) res.status(400).json({messages: "required info missing"});
    db.update(req.params.id, changes).then(updatedProject => {
        if(!updatedProject) return res.status(404).json({message: "Project does not exist"});
        res.status(500).json(updatedProject);
    }).catch(err => {
        console.log(err);
    });
});

router.delete("/:id", (req, res) => {
    db.remove(req.params.id).then(projectId => {
        if(projectId == 0) return res.status(404).json({message: "Project does not exist"});
        res.status(200).json({message: `project with id of ${req.params.id} deleted`});
    }).catch(err => {
        console.log(err);
    });
});

module.exports = router;