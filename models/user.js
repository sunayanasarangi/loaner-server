
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name 				: String,
	email				: String, 
	hashed_password		: String,
	created_at			: String,
	temp_password		: String,
	temp_password_time	: String,
	type        		: String
});

//compile the schema to a model (is a class not an object)
const User = mongoose.model('User', userSchema);

exports.User = User; 