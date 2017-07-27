import Flight from 'flight';
import NameSpace from 'namespace';
import Events from 'events';
import jquery from 'jquery';
import template from './user-badge.html';
const $ = jquery;


class UserBadgeComponent extends Flight.UIComponent {

    listen() {
        this.renderTemplate();

        this.on(NameSpace.GitHub).listen(
            Events.User.Chosen, event => this.loadUser(event.user),
        );

        this.ui(this.view).listen(
            'click', event => this.showUsers(),
        );
    }

    renderTemplate() {
        this.view.innerHTML = template;
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
