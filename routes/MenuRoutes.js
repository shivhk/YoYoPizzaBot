const express = require('express')

const menuController = include('controllers/MenuController');

module.exports = app =>{
    app.get('/menu', menuController.getMenu);
}