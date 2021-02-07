import profileController from '../controllers/profile.controller';
import * as express from 'express';
const router = express.Router()


router.get('/:userId', profileController.getProfile);

module.exports = router