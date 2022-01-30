const router = require('express').Router();
const userRoutes = require('./user-routes.js');
//const pizzaRoutes = require('./pizza-routes');

// when /api/users is called -> /api come from the parent route, so we only need /users
router.use('/users', userRoutes);
//router.use('/pizzas', pizzaRoutes);

module.exports = router;