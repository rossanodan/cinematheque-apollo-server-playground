import { RESTDataSource } from "apollo-datasource-rest";

class GenresAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.themoviedb.org/3/genre/";
  }

  willSendRequest(request) {
    request.headers.set("Authorization", `Bearer ${this.context.token}`);
  }

  // Get the list of official genres for movies.
  async getMovieGenres(language = "en-US") {
    return this.get("movie/list", {
      language,
    });
  }

  // Get the list of official genres for TV shows.
  async getTvGenres(language = "en-US") {
    return this.get("tv/list", {
      language,
    });
  }
}

export default GenresAPI;
