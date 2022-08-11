


const userResolvers = {
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