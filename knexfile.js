// Update with your config settings.

module.exports = {
  development: {
    client: "mysql",
    connection: {
      database: "node_rest_api",
      user: "root",
      password: ""
    },
    migrations: {
      directory: __dirname + "/database/migrations"
    },
    seeds: {
      directory: __dirname + "/database/seeds"
    }
  }
};
