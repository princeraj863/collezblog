const express = require('express');// it will not create new instance , it will fetch the existing instance

const router = express.Router();// it helps in separating routes and controller
const homeController = require('../controllers/home_controller');// to access home controller

console.log("router loaded");

//this router is acessing a home controller
router.get('/',homeController.home);//calling homeController.actionName

module.exports= router; //it will get exported to index.js in main folder