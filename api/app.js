const express = require('express');
const app = express();

const {mongoose} = require('./database/mongoose');

const bodyParser = require('body-parser');

//Loading in mongoose models
const {List, Task} = require('./database/models');

/*
Loading in middleware
Passes request body of https request
*/
app.use(bodyParser.json());

//Route Handlers

//List Routes

/*
POST /lists - Used to create a list
Creates a new lists and returns the list document back to the user (including id)
List information (fields) will be passed in via the JSON request body
*/
app.post('/lists', (req, res)=>{
    let title = req.body.title;

    let newList = new List({
        title
    });
    newList.save().then((listDoc)=>{
        res.send(listDoc);
    });
});

/*  
GET /lists - Used to get all the lists 
Returns an array of all the lists in the database
*/
app.get('/lists', (req, res)=>{
    List.find({}).then((lists)=>{
        res.send(lists);
    });
});

/*
PATH /lists/:id - Used to update a specified list
Updates the specified list (list document with id in URL) with the new values specified in the JSON body of the request
*/
app.patch('/lists/:id', (req, res)=>{
    List.findOneAndUpdate({_id: req.params.id},{
        $set: req.body
    }).then(()=>{
        res.sendStatus(200);
    });
});

/*
DELETE /lists/:id - Used to delete a specified list
Deletes the specified list (list document with id in URL)
*/
app.delete('/lists/:id', (req, res)=>{
    List.findOneAndRemove({
        _id: req.params.id
    }).then((removedListDoc)=>{
        res.send(removedListDoc);
    });
});



/*
POST /lists/:listId/tasks - Used to create a new task in a specific list
Creates a new task in a list specified by listId
*/
app.post('/list/:listId/tasks', (req, res)=>{
    let newTask = new Task({
        title:req.body.title
    });
    newTask.save().then((newTaskDoc)=>{
        res.send(newTaskDoc);
    });
});

/*  
GET /lists/:listId/tasks - Used to get all the tasks in a specific list 
Returns all tasks belonging to a specific list (specified by listId)
*/
app.get('/lists/:listId/tasks', (req, res)=>{
    Task.find({
        _listId: req.params.listId
    }).then((tasks)=>{
        res.send(tasks);
    })
})

app.listen(3000, ()=>{
    console.log("Server listening on port 3000");
});