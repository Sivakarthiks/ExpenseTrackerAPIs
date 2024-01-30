const express = require('express');
const mongoose = require("mongoose");
const Expense = require("./expense");
const { options } = require('nodemon/lib/config');
const app = express()
const port = process.env.PORT || 3000

mongoose.connect(`mongodb+srv://sivakarthik:sivakarthikat.21aid@cluster0.xlrcxsz.mongodb.net/expenseDB?retryWrites=true&w=majority`,{
    useUnifiedTopology: true
});

app.use(express.json());

app.get('/expense', async (req, res) => {
    const result = await Expense.find();
    res.send(result);
})

app.get('/expense/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const result = await Expense.findById(id);
        if(result)
            res.send(result);
        else
            res.send("No expense with this id");
    }catch(err){ 
        res.send(err);
    }
})

app.delete('/expense/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const result = await Expense.findByIdAndDelete(id);
        if(result)
            res.send(result);
        else
            res.send("No expense with this id");
    }catch(err){ 
        res.send(err);
    }
})

app.post('/expense', async (req, res) => {
    try{
        console.log(req.body);
        const newExpense = req.body;
        await Expense.create(newExpense);
        res.send("Created");
    }catch(err){ 
        res.send(err);
    }
})

app.put('/expense/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const updateObject = req.body;
        const updatedObject = await Expense.findByIdAndUpdate(id,
            {$set: {"title": "foods"}},
            {$set: updateObject},
            {
                new: true
            });
        res.send(updatedObject);
    }catch(err){ 
        res.send(err);
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
