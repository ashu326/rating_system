class ValidateUserApis {
  validateUser(req, res, next) {
    // assuming code to validate user using jwt
    // lets assume we have sent app name and user_id in req body and validate it

    if (!req.body.user_id) {
      res.status(400).send({ message: "Parameter Missing: user_id" });
    }
    next();
  }
}

module.exports = new ValidateUserApis();
