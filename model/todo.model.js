const mongoose = require('../util/db');

const TodoSchema = new mongoose.Schema({
    todo_title: {
        required: true,
        type: String
    },
    todo_desc: {
        required: false,
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: null
    },
    created_by: {
        type: mongoose.Types.ObjectId,
        default: null
    },
    updated_by: {
        type: mongoose.Types.ObjectId,
        default: null
    }
});

module.exports = mongoose.model('Todo', TodoSchema);