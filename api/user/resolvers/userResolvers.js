const { GraphQLScalarType } = require("graphql");


const userResolvers = {
  DateTime: new GraphQLScalarType({
    name: "DateTime",
    description: "string to datetime on format ISO-8601",
    serialize: (value) => value.toISOString(),
    parseValue: (value) => new Date(value),
    parseLiteral: (ast) => new Date(ast.value),
  }),
  Query: {
    users: (root, args, { dataSources }) => dataSources.usersApi.getUsers(),
    user: (root, { id }, { dataSources }) => dataSources.usersApi.getUserById(id),
  },
  Mutation: {
    addUser: (root, user, { dataSources }) => dataSources.usersApi.addUser(user),
    updateUser: (root, newData, { dataSources }) => dataSources.usersApi.updateUser(newData),
    deleteUser: (root, { id }, { dataSources }) => dataSources.usersApi.deleteUser(id),
  }
};



module.exports = userResolvers;