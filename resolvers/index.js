module.exports = {
  Query: {
    // All three resolver functions assign their first positional argument (parent) to the variable _ as a convention to indicate that they don't use its value.
    // The launches and me functions assign their second positional argument (args) to __ for the same reason.
    // (The launch function does use the args argument, however, because our schema's launch field takes an id argument.)
    // All three resolver functions do use the third positional argument (context). Specifically, they destructure it to access the dataSources we defined.
    // None of the resolver functions includes the fourth positional argument (info), because they don't use it and there's no other need to include it.

    captains: (_, __, { dataSources }, info) => {
      info.cacheControl.setCacheHint({ maxAge: 0, scope: "public" });
      // console.log(info, `[${new Date().toLocaleTimeString()}] `);
      return dataSources.captainsAPI.getAllCaptains();
    },
    captainById: (_, { id }, { dataSources }) =>
      dataSources.captainsAPI.getCaptainById(id)
    //   dataSources.launchAPI.getLaunchById({ launchId: id }),
  },
  Mutation: {
    // login: async (_, { email }, { dataSources }) => {
    //   const user = await dataSources.userAPI.findOrCreateUser({ email });
    //   if (user) {
    //     user.token = Buffer.from(email).toString('base64');
    //     return user;
    //   }
    // },
    uploadCaptainImage: async (
      _,
      { input: { ...uploadImage } },
      { dataSources }
    ) => dataSources.dsAPI.uploadImage(uploadImage),
    addCaptain: async (_, { captain }, { dataSources }) =>
      dataSources.captainsAPI.addCaptain(captain),
    updateCaptain: async (_, { captain }, { dataSources }) =>
      dataSources.captainsAPI.updateCaptain(captain),
    deleteCaptain: async (_, { captain }, { dataSources }) =>
      dataSources.captainsAPI.deleteCaptain(captain)
  }
};
