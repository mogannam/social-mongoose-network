const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend
} = require('../../controllers/user-controller');

// /api/User
router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

   // /api/users/:id/firends/:friendId
   router.route('/:id/friends/:friendId')
   .post(addFriend)
   .delete(deleteFriend)

// /api/users/:id
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

 

module.exports = router;
