const express = require('express');// it will not create new instance , it will fetch the existing instance

const router = express.Router();// it helps in separating routes and controller

const postApi = require("../../../controllers/api/v1/posts_api");

router.get('/',postApi.index);
router.delete('/:id',postApi.destroy);
module.exports= router;