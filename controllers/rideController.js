const validateRideApis = require("../services/validateRideApis");
const rideDAO = require("../services/DAO/rideDAO");
const validateUserApis = require("../services/validateUserApis");

/**
 * This class handles all the ride related business logics
 */
class RideController {
  constructor(rideRouter) {
    this.rideRouter = rideRouter;
    this.registerRoutes();
  }

  registerRoutes() {
    this.rideRouter.post(
      "/:id/review",
      validateUserApis.validateUser,
      validateRideApis.validateUserReviewRatingRequest,
      this.reviewRide
    );
  }

  /**
   * This method is used to review a ride given by a rider or taken by a passenger
   */
  async reviewRide(req, res, next) {
    let reviewParams = {
      rating: req.body.rating,
      review: req.body.review === undefined ? null : req.body.review,
      rideId: req.params.id,
      reviewer: res.locals.reviewer,
      reviewee: res.locals.reviewee,
    };

    await rideDAO.reviewRideSession(reviewParams);

    res.send({ message: "Ride reviewed successfully" });
    next();
  }
}

const rideController = (rideRouter) => new RideController(rideRouter);

module.exports = {
  rideController,
  RideController,
};
