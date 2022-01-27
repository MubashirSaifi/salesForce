const mongoose = require('mongoose');
const AccountSchema = mongoose.Schema({
    accountId:{type:String},
    name:{type:String},
    phone:{type:String},
    site:{type:String},
    userLogin:{type:Boolean, default:false},
    connection:{type:Boolean, default:false},
    userId:{type:String},
},{timeStamps:true});
const Account = mongoose.model('Account',AccountSchema);
module.exports = Account;