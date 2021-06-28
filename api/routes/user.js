const router = require("express").Router()
const checkAuth = require("../middleware/check-auth")
const UserController = require("../controllers/user")


router.post('/signup', UserController.users_signup)
router.delete('/:userId', checkAuth, UserController.users_delete_user)
router.post('/login', UserController.users_login)

module.exports = router