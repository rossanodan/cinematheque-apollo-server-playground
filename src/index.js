import express from "express";
import { ApolloServer } from "apollo-server-express";
import { importSchema } from "graphql-import";
import { MoviesAPI, GenresAPI, PeopleAPI } from "./datasources";

require("dotenv").config();

const { API_KEY } = process.env;

const typeDefs = importSchema("./schemas/schema.graphql");

const resolvers = {
  Query: {
    movie_latest: async (
      _source,
      { language },
      { dataSources },
    ) => dataSources.moviesAPI.getLatest(language),
    movie_popular: async (
      _source,
      { language, page, region },
      { dataSources },
    ) => dataSources.moviesAPI.getPopular(
      language,
      page,
      region,
    ),
    genres_movie: async (
      _source,
      { language },
      { dataSources },
    ) => dataSources.genresAPI.getMovieGenres(language),
    genres_tv: async (
      _source,
      { language },
      { dataSources },
    ) => dataSources.genresAPI.getTvGenres(language),
    person_popular: async (
      _source,
      { language },
      { dataSources },
    ) => dataSources.peopleAPI.getPopular(
      language,
    ),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    moviesAPI: new MoviesAPI(),
    genresAPI: new GenresAPI(),
    peopleAPI: new PeopleAPI(),
  }),
  context: () => ({
    token: API_KEY,
  }),
});

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4001 }, () => {
  // eslint-disable-next-line no-console
  console.log(`🚀 Server ready at http://localhost:4001${server.graphqlPath}`);
});
