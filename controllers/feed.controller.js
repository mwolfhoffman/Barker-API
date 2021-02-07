import feedRepo from '../repositories/feed.repository';

export default class {
    static async getFeed(req, res) {
        let allPosts = await feedRepo.getAllFeedPosts();
        let allComments = await feedRepo.getAllFeedComments();

        allPosts.forEach(p => {
            p.comments = [];

            allComments.forEach(c => {
                if (c.post_id === p.id) {
                    p.comments.push({
                        id: c.id,
                        username: c.username,
                        profilePic: c.profile_pic,
                        comment: c.comment,
                        user_id: c.user_id
                    });
                }
            })
        });

        return res.send({ posts: allPosts });
    };

    static async postComment(req, res) {
        let success = await feedRepo.createCommentOnPosts(req.body.comment, req.body.userId, req.body.postId)
        return res.send({ success });
    }

}