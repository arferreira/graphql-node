const { RESTDataSource } = require("apollo-datasource-rest");

class UsersApi extends RESTDataSource {

  constructor() {
    super();
    this.baseURL = "http://localhost:3000";
  }

  // get users
  async getUsers() {
    const users = await this.get("/users");
    return users.map(async (user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: await this.get(`/roles/${user.role}`)
    }));
  }

  async getUserById(id) {
    const user = await this.get(`/users/${id}`);
    user.role = await this.get(`/roles/${user.role}`);
    return user;
  }

  async addUser(user) {
    const users = await this.get(`/users/`);
    user.id = users.length + 1;
    const role = await this.get(`/roles?type=${user.role}`);

    await this.post("users", { ...user, role: role[0].id });

    return ({
      ...user,
      role: role[0]
    });
  }

  async updateUser(newData) {
    const role = await this.get(`/roles?type=${newData.role}`);

    await this.put(`/users/${newData.id}`, { ...newData, role: role[0].id });
    return ({
      ...newData,
      role: role[0]
    });
  }

  async deleteUser(id) {
    await this.delete(`/users/${id}`);
    return id;
  }
}

module.exports = UsersApi;