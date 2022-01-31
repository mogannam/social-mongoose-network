const router = require('express').Router();
const userRoutes = require('./user-routes.js');
const thoughtsRoutes = require('./thoughts-routes');

// when /api/users is called -> /api come from the parent route, so we only need /users
router.use('/user', userRoutes);
router.use('/thoughts', thoughtsRoutes);

module.exports = router;