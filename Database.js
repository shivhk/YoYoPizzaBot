const mongoose = require('mongoose');
const config = require("./config/default");
const {Schema} = mongoose;

const Menu = new Schema({
    name : String,
    description : String,
    price : {String, default:0}
});

const options = new Schema({
   description : String
});

var refObject = function (userName, number, salary) {
    this.name = name || "";
    this.number = number || "";
    this.salary = salary || 5000;


    //creates one function throughout all instances
    refObject.prototype.getSalary = function () {
        return "$"+this.salary;
    }

    //creates one function for each object created
    this.getSalary = function () {
        return "$"+this.salary;
    }

}

const orderDetails = new Schema(
    {
        id:String,
        notes: String,
        itemsOrders:[
            {
                itemId: String,
                itemName : String,
                price : {type : Number, default: 10},//rather than getting from backend again, send from UI.
                quantity: {type : Number, default: 0},//user input text box's value.
            }
        ],
        status : {type: String, default:"fresh out of the oven."},
        // paid : true, //online transaction allowed only, for ease's sake
        totalAmount : String
    });

module.exports = {
    Menu : mongoose.model('Menu', Menu, 'MenuItems'),
    OrderDetails : mongoose.model('OrderDetails',orderDetails, 'Orders' ),
    Options : mongoose.model('Options',options, 'Options' )
}