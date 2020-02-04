const Express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { config } = require("./config/enviroment");
const { readFileSync } = require("fs");
const { buildSchema } = require("graphql");
const gqlMiddleware = require("express-graphql");
const resolvers = require("./lib/resolvers");
const app = new Express();

const schema = buildSchema(
  readFileSync(path.join(__dirname, "lib", "schema.graphql"), "utf-8")
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  "/api",
  gqlMiddleware({
    schema: schema,
    rootValue: resolvers,
    graphiql: true
  })
);

/* eslint-disable no-console */
app.listen(config.PORT, () => {
  console.log(`Server listening port: ${config.PORT}`);
  console.log(`URL: ${config.URL}api`);
});
