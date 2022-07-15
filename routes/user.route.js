const router = require('express').Router();
const { checkToken } = require('../auth/token_validation');


router.get('/profile', checkToken, async (req, res, next) => {
    // console.log(req.user)
    const person = req.user
    res.status(200).json({
        success: 1,
        message: "Profile retrieved successfully",
        person
    });
})
module.exports = router;