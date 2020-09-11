const dbClient = require("../../client/db").client;

/**
 * This class holds all the ride related db
 */
class RideDAO {
  /**
   * Method to fetch ride details using ride id
   * @param {number} rideId
   */
  async getRideDetails(rideId) {
    let rideDetails = await dbClient.query(
      `SELECT passenger_id, rider_id FROM rides WHERE id=${rideId}`
    );

    return rideDetails.rows;
  }

  /**
   * Method to update review by the user
   * @param {Object} reviewPrams
   */
  async reviewRideSession(reviewPrams) {
    let { rideId, rating, reviewee, reviewer, review } = reviewPrams;

    await dbClient.query(`INSERT INTO user_review_rating(reviewee, reviewer, ride_id, review, rating)
                          VALUES (${reviewee}, ${reviewer}, ${rideId}, '${review}', ${rating})
                          `);
  }

  /**
   * Method to fetch rating of a ride by ride id and reviewer
   * @param {number} rideId ride id
   * @param {number} reviewer reviewer of the ride
   */
  async getRideRating(rideId, reviewer) {
    let rideRating = await dbClient.query(
      `SELECT * FROM user_review_rating WHERE ride_id=${rideId} AND reviewer=${reviewer}`
    );
    return rideRating;
  }
}

module.exports = new RideDAO();
