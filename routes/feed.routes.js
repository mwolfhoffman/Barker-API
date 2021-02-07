import feedController from '../controllers/feed.controller';
import * as express from 'express';
const router = express.Router()

router.get("/", feedController.getFeed);
router.post("/:post_id", feedController.postComment)

module.exports = router