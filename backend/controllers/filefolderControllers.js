const FileFolderModel = require("../model/fileSchema");

const getFileFolders = async (req, res) => {
    const { _id } = req.user;
    const { parentId } = req.body;
    try {
        const fileFolders = await FileFolderModel.find({ userId: _id, parentId });
        res.status(200).json({ status: "success", message: "Folders fetched successfully", data: { fileFolders } });
        
    } catch (error) {
        res.status(500).json({status: "fail", message: "Internal Server Error" });
    }
}

module.exports = { getFileFolders };