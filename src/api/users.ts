class Users {
  static GetProfiles(ax: any) {
    return ax.get('/user/profiles');
  }

  static UpdateProfile(ax: any, data:any) {
    return ax.patch('/user/change-profiles', data);
  }
}

export default Users;
