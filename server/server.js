const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');

const app = express();
const cors = require('cors');

app.use(
  '/graphql', cors(),
  expressGraphQL({
      schema,
    graphiql: true
  })
);

app.listen(4000, () => {
  console.log('Listening');
});
