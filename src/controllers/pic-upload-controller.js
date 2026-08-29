const imgUploadService = require("../services/image-service");
const user = require("../models/user");

// const getImageUploaded = async (req, res) => {
//     // console.log(req.file);
//     const currentUser = req.user.id;
//     if (!currentUser) {
//         return res.status(401).json(`Error: Unauthorized`);
//     }
//     if (!req.file) {
//         return res.status(500).json(`Error: No File`);
//     }
//     const file = req.file;
//     const result = await imgUploadService.uploadImage(file);
//     console.log(result);
//     if(result == "error") {
//         return res.status(500).json("Something went wrong");
//     }
//     const currUserDoc = await user.findById(currentUser);
//     currUserDoc.imageUrl = result.secure_url;
//     await currUserDoc.save();
//     res.json({
//         success: true,
//         imageUrl: result.secure_url
//     });
// }

const getImageUploaded = async (req, res) => {
    try {
        const currentUser = req.user.id;

        if (!currentUser) {
            return res.status(401).json("Error: Unauthorized");
        }

        if (!req.file) {
            return res.status(400).json("Error: No File");
        }

        const result = await imgUploadService.uploadImage(req.file);

        const currUserDoc = await user.findById(currentUser);

        currUserDoc.imageUrl = result.secure_url;

        await currUserDoc.save();

        res.json({
            success: true,
            imageUrl: result.secure_url
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};

module.exports = { getImageUploaded };