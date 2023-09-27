const express = require("express");
const router = express.Router();
const Offer = require('../models/offerModel')

//get all profs
router.get("/getalloffers", async (req, res) => {
 
    try {
        const offers = await Offer.find({})
        res.send(offers)
    } catch (error) {
        return res.status(400).json({ message: error });
    }

});


//add new prof
router.post("/addoffer", async (req, res) => { 
    const  offers  = req.body.offers

    try {
        const newoffer = new Offer({
            idoffer: offers.idoffer,
            name: offers.name,
            offer: offers.offer
        });

        await newoffer.save();
        res.send('New offer added successfully');
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});


//get prof by id
router.post("/getofferbyid", async (req, res) => {
    const offerid = req.body.offerid


    try {
        const offer = await Offer.findOne({ _id: offerid })
        res.send(offer)
    } catch (error) {
        return res.status(400).json({ message: error })

    }
})

//edit prof 
router.post("/editoffer", async (req, res) => {
    const editedoffer = req.body.editedoffer
    try {
        const offers = await Offer.findOne({ _id: editedoffer._id })


        offers.idoffer = editedoffer.idoffer,
        offers.name = editedoffer.name,
        offers.offer = editedoffer.offer
       

        await offers.save()
        res.send('Offer details edited succesfully')

    } catch (error) {
        return res.status(400).json({ message: error })

    }
})

//delete prof
router.post("/deleteoffer", async (req, res) => {

    const offerid = req.body.offerid

    try {
        await Offer.findOneAndDelete({ _id: offerid })
        res.send('Offer Deleted successfully')
    } catch (error) {
        return res.status(400).json({ message: error })

    }
})
module.exports = router;