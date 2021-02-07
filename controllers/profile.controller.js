import authRepository from "../repositories/auth.repository";
import feedRepo from "../repositories/feed.repository";

export default class {
  static async getProfile(req, res) {
    let userId = Number(req.params.userId);
    const posts = await feedRepo.getPostsByUserId(userId);
    const followers = await feedRepo.getFollowersForUser(userId);
    const userInfo = await authRepository.getUserById(userId);

    let profile = {
      id: userInfo.id,
      username: userInfo.username,
      profile_pic: userInfo.profile_pic,
      posts: posts,
      followers: followers,
    };
    return res.send(profile);
  }
}
