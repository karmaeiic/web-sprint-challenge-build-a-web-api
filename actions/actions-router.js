const express = require("express");
const router = express.Router();
const projectDb = require("../data/helpers/projectModel")
const db = require("../data/helpers/actions-model")
const { route } = require("../projects/projects-router")

router.get("/", (req, res) => {
    db.get()
    .then(actions => {
        res.status(200).json(actions)
    }).catch(err =>{
        res.status(500).json({message: "a server error occurred"});
    })
})

router.post("/", async (req, res) => {
    const {project_id, description, notes} = req.body;
    if(!project_id || !description || !notes) 
        return res.status(400).json({message: "project id, desciption, and notes required"});
    try {
        const project = await projectDb.get(project_id);
        if(!project) res.status(400).json({message: "project doesn't exist"});
    } catch(err){
        res.status(500).json({message: "A server error occurred"});
    }
    db.insert(req.body).then(newAction => {
        res.status(201).json(NewAction)
    }) .catch(err => {
        res.status(500).json({message: "A server error occurred"});
    })
});

router.get("/:id", (req, res) => {
        db.get(req.params.id).then(action => {
            if(!action) return res.status(404).json({message: "Action does not exist"});
            res.status(200).json(action);
        }).catch(err => {
            res.status(500).json({message: "A server error occurred"})
    })
});

router.put("/:id", (req, res) => {
    const changes = req.body;
    db.update(req.params.id, changes).then(updatedAction => {
        if(!updatedAction) return res.status(404).json({message: "Action does not exist"});
        res.status(200).json(updatedAction);
    }).catch(err => {
        res.status(500).json({message: "A server error has occurred"})
    })
})

router.put("/:id", (req, res) => {
    db.remove(req.params.id).then(deleteAction => {
        if(deleteAction == 0) return res.status(404).json({message: "Action does not exist"});
        res.status(200).json({message: `Action with id ${req.params.id} deleted`})
    }).catch(err => {
        res.status(500).json({message: "A server error occured"});
    })
})

module.exports = router;