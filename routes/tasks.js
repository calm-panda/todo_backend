const express = require('express');
const router = express.Router();

let myTasks = [
    {
        idx: 0,
        title: 'Learn Angular Basics',
        isComplete: true
    },
    {
        idx: 1,
        title: 'Make todos',
        isComplete: true
    },
    {
        idx: 2,
        title: 'Make respective backend',
        isComplete: false
    },
    {
        idx: 3,
        title: 'Integrate mongoDB :)',
        isComplete: false,
    }
];

router.get('/', (req, res) => {
    res.json(myTasks);
});

router.post('/addTask', (req, res) => {
    try {
        myTasks.push({
            idx: myTasks.length === 0? 0 : myTasks[myTasks.length -1].idx +1,
            title: req.body.task,
            isComplete: false
        });
        res.send(200);
    } catch (e) {
        res.send(500);
    }
});

router.get('/toggleComplete/:idx', (req, res) => {
    myTasks = myTasks.map((task) => {
        if (task.idx === parseInt(req.params.idx, 10)) {
            return {...task, isComplete: !task.isComplete}
        }
        return task;
    })
    res.json(myTasks);
});

router.delete('/delete/:idx', (req, res) => {
    myTasks = myTasks.filter((task) => task.idx !== parseInt(req.params.idx, 10));
    res.send(200);
});

module.exports = router;