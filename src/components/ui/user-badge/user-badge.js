import Fiber from 'fiber';
import NameSpace from 'namespace';
import Events from 'events';
import template from './user-badge.html';
import styles from './user-badge.scss';


class UserBadgeComponent extends Fiber.UIComponent.withTemplate(template) {

    listen() {
        this.on(NameSpace.GitHub).listen(
            Events.User.Chosen, event => this.loadUser(event.user),
        );

        this.ui().listen(
            'click', event => this.stepBack(),
        );
    }

    loadUser(user) {
        this.view.querySelector('img').src = user.avatar_url;
        this.view.querySelector('user-name').innerHTML = '@' + user.login
    }

    stepBack() {
        this.ui().trigger(
            new Events.Flow.StepBack()
        )
    }
}

export default UserBadgeComponent;
