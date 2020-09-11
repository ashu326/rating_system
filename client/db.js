const { Client } = require("pg");
const { dbConfig } = require("../config/config");

const client = new Client(dbConfig);

let connection = async () => {
  try {
    client.connect();
    console.log("database connected...");
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  client,
  connection,
};
