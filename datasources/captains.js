const { RESTDataSource } = require("apollo-datasource-rest");

class CaptainsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.BACKEND_API_END_POINT;
  }

  async getAllCaptains() {
    // console.log("getAllCaptains  invoked!", this.get);
    const response = await this.get("captains", null, {
      cacheOptions: { ttl: 0 }
    });
    // console.log("total captains", response);
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
      ...captain
    };
  }

  async uploadImage(uploadImage) {
    console.log("uploadImage", { uploadImage });
    try {
      const response = await this.post("upload-image", {
        ...uploadImage
      });
      console.log({ uploadImage: response });
      return {
        ...response
      };
    } catch (error) {
      console.error(new Error(error));
      return {
        ...error
      };
    }
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
    console.log("update captain call", { id, name, onDate, already });

    try {
      const response = await this.post(
        `captains/update.php?q=${new Date().getTime()}`,
        {
          id,
          name,
          onDate,
          already
        }
      );
      // console.log("captainUpdateReducer response =>>> ", response);
      return this.captainUpdateReducer(response);
    } catch (err) {
      console.log(err);
    }
  }

  captainUpdateReducer(captain) {
    console.log("captain update reducer datasource ", { captain });
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
