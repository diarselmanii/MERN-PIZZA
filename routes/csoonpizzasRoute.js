const express = require("express");
const router = express.Router();
const Csoonpizza = require('../models/csoonpizzaModel')

//get all classes
router.get("/getallcsoonpizzas", async (req, res) => {

    try {
        const csoonpizzas = await Csoonpizza.find({})
        res.send(csoonpizzas) 
    } catch (error) {
        return res.status(400).json({ message: error });
    }

});


//add new class
router.post("/addcsoonpizza", async (req, res) => {
    const csoonpizza = req.body.csoonpizza

    try {
        const newcsoonpizza = new Csoonpizza({
            idpizza: csoonpizza.idpizza,
            name: csoonpizza.name,
            type: csoonpizza.type
           
        })
        await newcsoonpizza.save()
        res.send('New cooming soon pizza added succesfully')
    } catch (error) {
        return res.status(400).json({ message: error })
    }
})

//get class by id
router.post("/getcsoonpizzabyid", async (req, res) => {
    const csoonpizzaid = req.body.csoonpizzaid


    try {
        const csoonpizza = await Csoonpizza.findOne({ _id: csoonpizzaid })
        res.send(csoonpizza)
    } catch (error) {
        return res.status(400).json({ message: error })

    }
})

//edit class 
router.post("/editcsoonpizza", async (req, res) => {
    const editedcsoonpizza = req.body.editedcsoonpizza
    try {
        const csoonpizza = await Csoonpizza.findOne({ _id: editedcsoonpizza._id })


        csoonpizza.idpizza = editedcsoonpizza.idpizza,
        csoonpizza.name = editedcsoonpizza.name,
        csoonpizza.type = editedcsoonpizza.type
       

        await csoonpizza.save()
        res.send('Cooming soon pizza details edited succesfully')

    } catch (error) {
        return res.status(400).json({ message: error })

    }
})

//delete class
router.post("/deletecsoonpizza", async (req, res) => {

    const csoonpizzaid = req.body.csoonpizzaid
 
    try {
        await Csoonpizza.findOneAndDelete({ _id: csoonpizzaid })
        res.send('Cooming soon pizza Deleted successfully')
    } catch (error) {
        return res.status(400).json({ message: error })

    }
})
module.exports = router;