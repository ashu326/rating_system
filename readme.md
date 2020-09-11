Assumptions:

1. I have assumed that we use 2 apps: rider app and passenger app
2. user_id of the user using the current app is sent in req body, which could have been accesed while validating the user session
3. For a given user_id, if user_role is rider in the db then rider is rating the passenger and vice versa if passenger is using the app.
4. Ride which rider or passenger is rating is completed.
5. Rating can be between 1 to 5.

Approch:

1. I have made a user table, user_review_rating_table and rides table with minimal requirements to keep it simple.
2. If user using the app is rider then he will be reviewing the passenger and if user using the app is passenger then he will be reviewing the rider, which we can identify from the user using the app (So using the common api for both rider and passenger).
3. If user has already reviewed a ride then send him reply that already reviewed else rate the ride.
4. If wrong user_id is sent which is not involved in given ride then throw error that user is not authorised to rate the ride
5. For fetching the aggregate rating, I have fetched the average rating of the user from user_review_rating table where reviewee in the table is current user using the app.

DB Schema:

1. users table (contains user details)-
   user_id (user id of the user),
   username (name of the user),
   password (user password),
   email (user email which will be unique for every user),
   user_role_id (role id of the user in user_role table, if rider or passenger),
   created_at (time stamp of the table entry)

2. user_role table (contains available roles, rider and passenger)-
   id (user role id),
   role (role name, rider or passenger),
   created_at (time stamp of the table entry)

3. rides table (contains details of all the rides)-
   id (ride id),
   rider_id (user_id of the rider in the users table),
   passenger_id (user_id of the passenger in the users table),
   created_at (time stamp of the table entry)

4. user_review_rating table (contains rating and review of a ride)-
   id (user_review_rating id),
   reviewee (user id of the user being reviewed),
   reviewer (user id of the user reviewing the rider or passenger),
   ride_id (id of the ride in rides table),
   review (user review if any by reviewer),
   rating (rating given by reviewer),
   created_at (time stamp of the table entry)

Steps to run the application

1. Create db in local system
2. npm i
3. add db configs in env file
4. node creatingDBTablesScript.js
5. node insertingDBValuesScript.js
6. npm start
