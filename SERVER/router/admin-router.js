const express = require("express");
const adminController = require("../controllers/admin-controller");
const authMiddleware = require("../middlewares/auth-middleware");
//const isAdmin = require("../middlewares/admin-middleware");

const router = express.Router();

router.route("/users").get(authMiddleware,adminController.getAllUsers);
router.route("/users/:id").get(authMiddleware,adminController.getUserById);
router.route("/users/update/:id").patch(authMiddleware, adminController.updateUserById);
router.route("/users/delete/:id").delete(authMiddleware,adminController.deleteUserById);
router.route("/contacts/delete/:id").delete(authMiddleware,adminController.deleteContactById);
router.route('/contacts').get(authMiddleware , adminController.getAllContacts);

module.exports = router;