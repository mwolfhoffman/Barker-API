import dao from "./dao";
const bcrypt = require("bcrypt");
const saltRounds = 10;

export default class {
  static async asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

  static async getAllPosts() {
    return await dao.all(`SELECT * FROM posts `, []);
  }

  static async getAllFeedPosts() {
    let result = [];
    let allPosts = await this.getAllPosts();

    await this.asyncForEach(allPosts, async (p) => {
      let userInfo = await dao.get(
        `SELECT  id as user_id, username, profile_pic FROM users WHERE id = ?`,
        [p.user_id]
      );

      result.push({
        id: p.id,
        username: userInfo.username,
        profile_pic: userInfo.profile_pic,
        content: p.content,
        user_id:p.user_id
      });
    });
    return result;
  }

  static async getAllFeedComments() {
    return await dao.all(
      "SELECT users.id as user_id, users.username, users.profile_pic, comments.id, comments.post_id, comments.comment FROM comments INNER JOIN users ON users.id = comments.user_id",
      []
    );
  }

  static async createCommentOnPosts(comment, userId, postId) {
    return await dao.run(
      "INSERT INTO comments (comment, user_id, post_id)  VALUES(?,?,?) ",
      [comment, userId, postId]
    );
  }

  static async getPostById(id) {
    return await dao.get("SELECT * FROM posts WHERE id = ?", [id]);
  }

  static async getPostsByUserId(userId) {
    return await dao.all("SELECT * FROM posts WHERE user_id = ?", [userId]);
  }

  static async getCommentById(id) {
    return await dao.get("SELECT * FROM comments WHERE id = ?", [id]);
  }

  static async getFollowerIdsForUser(userId) {
    return await dao.all(
      "SELECT follower_id FROM followers WHERE user_id = ?",
      [userId]
    );
  }
  static async getFollowersForUser(userId) {
    let sql = `SELECT u.id, u.username, u.profile_pic FROM users u LEFT JOIN followers f WHERE u.id = f.follower_id AND f.user_id = ?`;
    return await dao.all(sql, [userId]);
  }
}
