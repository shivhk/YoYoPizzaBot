 const express = require('express')

const orderController = include('controllers/OrderController');

module.exports = app => {
    app.post('/createOrder', orderController.create);
    app.get('/orderStatus/:id', orderController.getOrder)

}

