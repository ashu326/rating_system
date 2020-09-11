const dbClient = require("../../client/db").client;

/**
 * This class holds all the user related db logics
 */
class UserDAO {
  /**
   * This method fetches avg rating of a user round to 1 decimal place
   * @param {number} reviewee reviewee user_id
   */
  async getUserRatings(reviewee) {
    let userRating = await dbClient.query(
      `SELECT ROUND(AVG(rating), 1) AS rating FROM user_review_rating WHERE reviewee=${reviewee}`
    );
    return userRating.rows[0];
  }
}

module.exports = new UserDAO();
