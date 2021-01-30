import { RESTDataSource } from "apollo-datasource-rest";

class PeopleAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.themoviedb.org/3/person/";
  }

  willSendRequest(request) {
    request.headers.set("Authorization", `Bearer ${this.context.token}`);
  }

  // Get the most newly created person.
  // This is a live response and will continuously change.
  async getLatest(language = "en-US") {
    return this.get("latest", {
      language,
    });
  }

  // Get the list of popular people on TMDb.
  // This list updates daily.
  async getPopular(language = "en-US", page = 1) {
    return this.get("popular", {
      language,
      page,
    });
  }
}

export default PeopleAPI;
