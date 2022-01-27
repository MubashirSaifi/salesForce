const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    accountIds:{type:[String]},
    name:{type:String},
    userLogin:{type:Boolean, default:false},
    connection:{type:Boolean, default:false},
    userId:{type:String},
},{timeStamps:true});
const SalesforceUser = mongoose.model('SalesforceUser',UserSchema);
module.exports = SalesforceUser;