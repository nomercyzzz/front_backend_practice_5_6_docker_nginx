const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { gql } = require('graphql-tag');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 4000;

// Загружаем данные из JSON
const productsData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'xxx.json')));

// Определяем схему GraphQL
const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    price: Int!
    description: String
  }

  type Query {
    products(id: ID, name: String, description: String, price: Int): [Product]
  }
`;

// Определяем резолверы
const resolvers = {
  Query: {
    products: (_, { id, name, description, price }) => {
      let filteredProducts = productsData;

      if (id) {
        filteredProducts = filteredProducts.filter(product => product.id.toString() === id.toString());
      }
      if (name) {
        filteredProducts = filteredProducts.filter(product => product.name.toLowerCase().includes(name.toLowerCase()));
      }
      if (description) {
        filteredProducts = filteredProducts.filter(product => product.description.toLowerCase().includes(description.toLowerCase()));
      }
      if (price) {
        filteredProducts = filteredProducts.filter(product => product.price === price);
      }

      return filteredProducts;
    }
  }
};

// Создаём Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers
});

// Запускаем сервер Apollo и Express
async function startServer() {
  await server.start();
  app.use('/graphql', cors(), bodyParser.json(), expressMiddleware(server));

  app.listen(PORT, () => {
    console.log(' Apollo Server запущен на http://localhost:'+PORT+'/graphql');
  });
}

startServer();