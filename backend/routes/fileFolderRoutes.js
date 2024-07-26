const express = require('express');
const {
    getFileFolders,
    renameFileFolder,
    deleteFileFolder,
    shareFileFolder
} = require('../controllers/filefolderControllers');

const filefolderRouter = express.Router();

// Route to get file folders
filefolderRouter.route('/').post(getFileFolders);

// Route to rename a file or folder
filefolderRouter.route('/:id').patch(renameFileFolder);

// Route to delete a file or folder
filefolderRouter.route('/:id').delete(deleteFileFolder);

// Route to add email with whom file or folder is shared
filefolderRouter.route('/share').post(shareFileFolder);

module.exports = filefolderRouter;
