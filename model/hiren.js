/**
 * Created by prism on 5/9/14.
 */

var authSchema = new mongoose.Schema({
    tag: String,
    email: String,
    username: String,
    createdOn: Date,
    updatedOn: { type: Date, default: Date.now },
    url: String,
    password: String,
    icon: String
});

mongoose.model('Auth', authSchema);