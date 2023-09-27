const mongoose = require("mongoose");

const csoonpizzaSchema = mongoose.Schema({
    idpizza: { type: String, require },
    name: { type: String, require },
    type : { type: String, require },
 


}, {
    timestamps: true,
})

module.exports = mongoose.model('csoonpizzas', csoonpizzaSchema)