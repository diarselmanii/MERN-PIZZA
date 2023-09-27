const mongoose = require("mongoose");

const offerSchema = mongoose.Schema({
    idoffer: { type: String, require },
    name: { type: String, require },
    offer: { type: String, require }
 


}, {
    timestamps: true,
})

module.exports = mongoose.model('offers', offerSchema)

