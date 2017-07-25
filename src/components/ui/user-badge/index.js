import Flight from 'flight';
import NameSpace from 'namespace';
import Events from 'events';
import jquery from 'jquery';
const $ = jquery;


class UserBadgeComponent extends Flight.UIComponent {

    listen() {
        this.on(NameSpace.GitHub).listen(
            Events.User.Chosen, event => this.loadUser(event.user),
        );

        this.ui(this.view).listen(
            'click', event => this.showUsers(),
        );
    }

    loadUser(user) {
        $('img', this.view).attr('src', user.avatar_url);
        $('user-name', this.view).html('@' + user.login);
    }

    showUsers() {
        this.ui(this.view).trigger(
            new Events.Flow.ShowStep('user')
        )
    }
}

export default UserBadgeComponent;
