const users = [
  {
    name: "Antonio",
    status: true,
  },
  {
    name: "Mariana",
    status: false,
  }
];

const userResolvers = {
  Query: {
    users: () => users,
    firstUser: () => users[0]
  }
};



module.exports = userResolvers;