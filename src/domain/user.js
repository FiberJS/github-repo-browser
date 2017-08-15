class User {
    constructor(user) {
        this.login = user.login;
        this.avatar_url = user.avatar_url;
    }

    clone() {
        return new User(this);
    }
}

export default User;
