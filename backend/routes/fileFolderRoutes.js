const express = require('express');
const { getFileFolders } = require('../controllers/filefolderControllers');


const filefolderRouter = express.Router();

filefolderRouter.route("/").post(getFileFolders);

module.exports = filefolderRouter;