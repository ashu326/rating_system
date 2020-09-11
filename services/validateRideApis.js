const rideDAO = require("./DAO/rideDAO");

class ValidateRideApis {
  async validateUserReviewRatingRequest(req, res, next) {
    let err = null;
    let rating = req.body.rating;
    let rideId = req.params.id;
    let errorMessage = null;
    let userId = req.body.user_id;
    let statusCode = 400;
    try {
      if (!rideId) {
        err = true;
        errorMessage = "Parameter missing: ride id";
      }

      if (!rating) {
        err = true;
        errorMessage = "Parameter missing: rating";
      }

      if (req.body.rating > 5 || req.body.rating < 1) {
        err = true;
        errorMessage = "Invalid rating";
      }

      if (err) {
        throw errorMessage;
      }
      /**
       * Fetch ride details
       */
      let rideDetails = await rideDAO.getRideDetails(req.params.id);

      /**
       * Check if ride id is valid is not, if ride id is invalid throw error
       */
      if (rideDetails.length === 0) {
        statusCode = 401;
        throw "invalid ride id";
      }
      rideDetails = rideDetails[0];

      let passengerId = rideDetails.passenger_id;
      let riderId = rideDetails.rider_id;

      /**
       * if user is not involved in the ride then throw error
       */
      if (passengerId != userId && riderId != userId) {
        statusCode = 401;
        throw "you are not authorized to review this ride";
      }

      res.locals.reviewer = userId;
      res.locals.reviewee = riderId == userId ? passengerId : riderId;

      /**
       * fetch ride rating if already rated
       */
      let rideRating = await rideDAO.getRideRating(rideId, res.locals.reviewer);

      /**
       * if already rated throw error
       */
      if (rideRating.rows.length !== 0) {
        statusCode = 401;
        throw "You have already reviewed this ride";
      }

      next();
    } catch (err) {
      let response = { message: err };
      return res.status(statusCode).send(response);
    }
  }
}

module.exports = new ValidateRideApis();
