const mongoose = require('mongoose');

/**
 * Mongoose Model for our MongoDB Collection
 * See:
 *  https://mongoosejs.com/docs/models.html
 *  https://docs.mongodb.com/manual/core/databases-and-collections/#collections
 */

const userItemSchema = new mongoose.Schema({
    username: {
        type: String,
        // This prevents duplicate documents w/the exact same info from being created for this model.
        unique: true,
        required: true,
    },
    password: {
        type: String,
        // This prevents duplicate documents w/the exact same info from being created for this model.
        unique: false,
        required: true,
    }
});

const UserItem = mongoose.model('UserItem', userItemSchema);

module.exports = UserItem;