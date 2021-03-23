const { gql } = require("apollo-server");

const typeDefs = gql`
  # Your schema will go here

  type Captain {
    id: ID!
    name: String
    onDate: String
    already: Boolean!
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
    already: Boolean!
  }
  
  type UpdateCaptainReturn {
    id: ID!
    name: String
    message: String
  }

  # Input type for delete captain
  input DeleteCaptain {
    id: ID!
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
    addCaptain(captain: AddCaptain!): AddCaptainReturn!
    updateCaptain(captain: UpdateCaptain!): UpdateCaptainReturn!
    deleteCaptain(captain: DeleteCaptain!) : DeleteCaptainReturn
  }
`;

module.exports = typeDefs;
