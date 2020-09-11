/**
 * script to creade database tables
 */
require("dotenv").config();
const { Client } = require("pg");
const { dbConfig } = require("./config/config");

createDbEntries = async () => {
  try {
    const client = new Client(dbConfig);
    await client.connect();

    await client.query(`CREATE TABLE user_role(
      id serial PRIMARY KEY,
      role VARCHAR(50) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);

    await client.query(`CREATE TABLE users(
      user_id serial PRIMARY KEY,
      username VARCHAR(50) NOT NULL,
      password VARCHAR(50) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      user_role_id INT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_role_id) REFERENCES user_role (id)
    )`);

    await client.query(`CREATE TABLE rides(
      id SERIAL PRIMARY KEY,
      rider_id INT NOT NULL,
      passenger_id INT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (rider_id) REFERENCES "users" (user_id),
      FOREIGN KEY (passenger_id) REFERENCES "users" (user_id) 
    )`);

    await client.query(`CREATE TABLE user_review_rating(
      id SERIAL PRIMARY KEY,
      reviewee INT NOT NULL,
      reviewer INT NOT NULL,
      ride_id INT NOT NULL,
      review VARCHAR(250),
      rating INT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (reviewee) REFERENCES "users" (user_id),
      FOREIGN KEY (reviewer) REFERENCES "users" (user_id),
      FOREIGN KEY (ride_id) REFERENCES rides (id)
    )`);

    await client.end();
  } catch (err) {
    console.log(err);
  }
};

createDbEntries();
