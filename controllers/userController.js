const validateUserApis = require("../services/validateUserApis");
const userDAO = require("../services/DAO/userDAO");

/**
 * This controller handles all the user related business logics
 */
class UserController {
  constructor(userRouter) {
    this.userRouter = userRouter;
    this.registerRoutes();
  }

  registerRoutes() {
    this.userRouter.get(
      "/rating",
      validateUserApis.validateUser,
      this.getUserRating
    );
  }

  /**
   * This method fetches average user rating
   */
  async getUserRating(req, res, next) {
    let reviewee = req.body.user_id;

    let userRating = await userDAO.getUserRatings(reviewee);

    userRating = userRating.rating == null ? 0 : userRating.rating;

    res.status(200).send({ message: "Fetched Successfully", userRating });
    next();
  }
}

const userController = (userRouter) => new UserController(userRouter);

module.exports = {
  userController,
  UserController,
};
