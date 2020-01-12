const { Menu, OrderDetails } = include('database');
const mongoose = require('mongoose')

//to create order
//send selected itemId
exports.create = async (req, res) =>{

    // if (Object.keys(req.body).length !== 0)
    //     res.send({success:false, message:"Missing request body"});

    try{
        console.log(req.body);
        let items = req.body;

        let sum = 0;
        items.forEach(item =>{
            let quantity = item.quantity;
            let price = item.price;
            sum += quantity * price;
        });

        let saved = await new OrderDetails({
            notes : req.body.notes,

            //why zero elements are stored in db?
            itemsOrders: items,
            totalAmount: sum,
            // paid : true
        }).save();

        console.log(saved);
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

exports.getOrder = async (req, res) =>{

    const { orderId } = req.params;

    // const query = {_id : mongoose.Types.ObjectId(orderId) , status : "approved"};
    //
    // console.log(query);

    let order = await OrderDetails.findOne({ _id: orderId});

    if (order)
    {
        res.send({ success: true, status : order.status });
    }
    else
    {
        res.send({success : false, status : "Looks like there's no order for this ID."})
    }

}