const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    first_name:      { type: String, required: true, trim: true },
    last_name:       { type: String, required: true, trim: true },
    email:           { type: String, required: true, unique: true, trim: true },
    position:        { type: String, required: true, trim: true },
    salary:          { type: Number, required: true },
    date_of_joining: { type: Date, required: true },
    department:      { type: String, required: true, trim: true },
    created_at:      { type: Date, default: Date.now },
    updated_at:      { type: Date, default: Date.now },
});

module.exports = mongoose.model('Employee', EmployeeSchema);
