/**
 * script to enter dummy values in db tables
 */
require("dotenv").config();
const { Client } = require("pg");
const { dbConfig } = require("./config/config");

createDbEntries = async () => {
  try {
    const client = new Client(dbConfig);
    await client.connect();

    await client.query(
      `INSERT INTO user_role (role) VALUES('RIDER'), ('PASSENGER')`
    );

    await client.query(`INSERT INTO "users" (username, password, email, user_role_id) VALUES
        ('rider1', '***', 'rider1@oye.com', 1),
        ('rider2', '***', 'rider2@oye.com', 1),
        ('passenger1', '***', 'passenger1@oye.com', 2),
        ('passenger2', '***', 'passenger2@oye.com', 2)
    `);

    await client.query(
      `INSERT INTO rides (rider_id, passenger_id) VALUES (1, 4), (2, 3), (1, 3)`
    );

    await client.end();
  } catch (err) {
    console.log(err);
  }
};

createDbEntries();
