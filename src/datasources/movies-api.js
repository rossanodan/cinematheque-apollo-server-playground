import { RESTDataSource } from "apollo-datasource-rest";

class MoviesAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.themoviedb.org/3/movie/";
  }

  willSendRequest(request) {
    request.headers.set("Authorization", `Bearer ${this.context.token}`);
  }

  // Get the most newly created movie.
  // This is a live response and will continuously change.
  async getLatest(language = "en-US") {
    return this.get("latest", {
      language,
    });
  }

  // Get a list of the current popular movies on TMDb.
  // This list updates daily.
  async getPopular(language = "en-US", page = 1, region = "US") {
    return this.get("popular", {
      language,
      page,
      region,
    });
  }
}

export default MoviesAPI;
