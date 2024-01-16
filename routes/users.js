const router = require('express').Router();

const { getMyInfo, updateUserInfo } = require('../controllers/users');
const { newUserDataIsValid } = require('../middlewares/validation');

router.get('/me', getMyInfo);
router.patch('/me', newUserDataIsValid, updateUserInfo);

module.exports = router;
