const express = require("express");
const {protect} = require("../middleware/authMiddleware")
const upload = require("../middleware/uploadmiddleware");

const {
  registerUser,
  loginUser,
  getUserInfo  
} = require("../controllers/authController");

const router = express.Router();

 
router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/getUser",protect,getUserInfo);


router.post("/uploads-image",protect,upload.single("image"),async (req,res)=>{
  if(!req)return res.status(400).json({
    message:"No File Uploaded!"
  })

  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

  const user = req.user;
  user.profileImageUrl = imageUrl;
  await user.save();
  res.status(200).json({imageUrl});
});

module.exports = router;