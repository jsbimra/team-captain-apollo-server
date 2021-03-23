const { RESTDataSource } = require("apollo-datasource-rest");

class CaptainsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://www.doableyo.com/team-captain/api/";
  }

  async getAllCaptains() {
    // console.log("getAllCaptains  invoked!");
    const response = await this.get("captains");
    console.log(response, Array.isArray(response));
    return Array.isArray(response)
      ? response.map((captain) => this.captainsReducer(captain))
      : [];
  }

  async getCaptainById({ captainId }) {
    const response = await this.get("captains", { id: captainId });
    return this.captainsReducer(response[0]);
  }

  getCaptainsByIds({ captainsIds }) {
    return Promise.all(
      captainsIds.map((captainId) => this.getCaptainById({ captainId }))
    );
  }

  captainsReducer(captain) {
    // console.log("captain reducer datasource ", { captain });
    return {
      id: captain.id || 0,
      name: captain.name,
      onDate: captain.onDate,
      already: captain.already
    };
  }

  async addCaptain({ name, onDate, already }) {
    // console.log({ name, onDate, already })
    const response = await this.post("captains/add", { name, onDate, already });
    // console.log('response =>>> ', response)
    return this.captainAddReducer(response);
  }


  captainAddReducer(captain) {
    // console.log("captain add reducer datasource ", { captain });
    return {
      id: captain.id || 0,
      name: captain.name,
      message: captain.message
    };
  }

  
  async updateCaptain({ id, name, onDate, already }) {
    console.log({ id, name, onDate, already })
    const response = await this.post("captains/update", { id, name, onDate, already });
    console.log('captainUpdateReducer response =>>> ', response)
    return this.captainUpdateReducer(response);
  }

  captainUpdateReducer(captain) {
    // console.log("captain update reducer datasource ", { captain });
    return {
      id: captain.id || 0,
      name: captain.name,
      message: captain.message
    };
  }

  async deleteCaptain({ id }) {
    console.log({ id });
    const response = await this.post("captains/delete", { id });
    // console.log("response =>>> ", response);
    return response;
  }
}

module.exports = CaptainsAPI;
