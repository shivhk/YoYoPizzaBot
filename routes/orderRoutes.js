 const express = require('express')

const orderController = include('controllers/orderController');

module.exports = app => {
    app.post('/createOrder', orderController.create);
    app.get('/orderStatus/:id', orderController.getOrder)

}

