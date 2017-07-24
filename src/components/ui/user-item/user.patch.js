const userPatch = (view) => {
    return {
        login : (login) => {
            view.$.login.innerHTML = shortened(login);
            view.$.login.title = login;
        },
        avatar_url : (avatar_url) => {
            view.$.avatar.src = avatar_url;
        },
    };
};
export default userPatch;

function shortened(str) {
    return str.length > 13
        ? str.substr(0, 10) + '...'
        : str
        ;
}
