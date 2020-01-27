const { Menu, OrderDetails } = include('./Database');
const mongoose = require('mongoose')

//to create order
//send selected itemId
/**
 * This method is used to create orders by taking in the data from user send via req param
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.create = async (req, res) =>{
    try{
        let items = req.body;

        let sum = 0;

        //the total price is calculated for the given details
        items.forEach(item =>{
            let quantity = item.quantity;
            let price = item.price;
            sum += quantity * price;
        });

        let saved = await new OrderDetails({
            notes : req.body.notes,
            //why zero elements are stored in db?
            //because items=request.body,not some other value.
            itemsOrders: items,
            totalAmount: sum
        }).save();

        //building message to send as response
        const message = {
            toPay : `please pay ${sum}rs/- `,
            orderId : `${saved._id}`
        };

        res.send({success:true, message});
    }
    catch (err) {
        console.log(err);
    }
    //how to get request body?
    
}

/**
 * This method is used to find an order by its ID
 * @param req
 * @param res
 * @returns {Promise<void>} an order if it exists, else returns a message appropriately.
 */
exports.getOrder = async (req, res) =>{

//to handle an extra '=' sign that appears at the end of ID.
    const orderId = req.params.id.replace('=','');

    let allOrders = await OrderDetails.find({});

    let  orderOfInterest = allOrders.filter((order)=> {
        return order._id.toString().localeCompare(orderId) === 0;
    });

    let responseOrder = new OrderDetails({
        status: "Looks like there is no order for this ID."
    })

    let finalResponse  = [];
    finalResponse.push(responseOrder);

    let responseJSON = {
        exists : false,
        orders : orderOfInterest
    }

    if (Array.isArray(orderOfInterest) && orderOfInterest.length)
    {
        responseJSON.exists = true;
        res.send({success:true, orders: responseJSON});
    }
    else
    {
        responseJSON.orders = finalResponse;
        res.send({success:true, orders: responseJSON});
    }

}