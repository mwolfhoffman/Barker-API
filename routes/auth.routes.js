import { login, getUserById } from '../controllers/auth.controller';
import * as express from 'express';
const router = express.Router()
import { authenticated}   from '../controllers/auth.controller';


router.post('/login', login)
router.get('/:id', authenticated, getUserById)

module.exports = router