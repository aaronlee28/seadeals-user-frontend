class Users {
  static GetProfiles(ax: any) {
    return ax.get('/user/profiles');
  }
}

export default Users;
