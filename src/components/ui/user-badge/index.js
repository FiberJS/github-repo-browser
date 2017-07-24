import Flight from 'flight';
import NameSpace from 'namespace';
import Events from 'events';
import jquery from 'jquery';
const $ = jquery;


class UserBadgeComponent extends Flight.UIComponent {

    listen() {
        this.on(NameSpace.GitHub).listen(
            Events.User.Chosen, event => this.showUser(event.user),
        );
    }

    showUser(user) {
        $('img', this.view).attr('src', user.avatar_url);
        $('user-name', this.view).html('@' + user.login);
    }
}

export default UserBadgeComponent;
