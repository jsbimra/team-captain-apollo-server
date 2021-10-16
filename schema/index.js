const { gql } = require("apollo-server");

const typeDefs = gql`
  # Your schema will go here

  type Captain {
    id: ID!
    name: String
    onDate: String
    already: Boolean!
    description: String
    photo: String
    created: String
    updated_at: String
  }

  type AddCaptainReturn {
    id: ID!
    name: String
    message: String
  }

  # Input type for add new captain
  input AddCaptain {
    name: String
    onDate: String
    already: Boolean!
  }

  # Input type for add new captain
  input UpdateCaptain {
    id: ID!
    name: String
    onDate: String
    already: Boolean
    description: String
  }

  # Input type for upload image
  input UploadImageInput {
    id: ID!
    photo: String!
  }

  # Input type for delete captain
  input DeleteCaptain {
    id: ID!
  }

  type UploadImageReturn {
    success: Boolean
    message: String
    photo: String
  }

  type UpdateCaptainReturn {
    id: ID!
    message: String
    name: String
    onDate: String
    already: Boolean
    description: String
  }

  type DeleteCaptainReturn {
    # id: ID!
    message: String
  }

  type Query {
    captains: [Captain]!
    captainById(id: ID!): Captain
  }

  type Mutation {
    uploadCaptainImage(uploadImage: UploadImageInput!): UploadImageReturn!
    addCaptain(captain: AddCaptain!): AddCaptainReturn!
    updateCaptain(captain: UpdateCaptain!): UpdateCaptainReturn!
    deleteCaptain(captain: DeleteCaptain!): DeleteCaptainReturn
  }
`;

module.exports = typeDefs;
