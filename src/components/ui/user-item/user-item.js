import Fiber from 'fiber';
import NameSpace from 'namespace';
import Events from 'events';
import User from 'domain/user';
import userHtml from './user.html';
import userPatch from './user.patch';
import PatchIt from 'PatchIt';
import styles from './user-item.scss';

const userTemplate = PatchIt.template(userHtml, userPatch);

class UserItemComponent extends Fiber.UIComponent {

    init(user) {
        this.user = new User(user);
        this.view = userTemplate.render(this.user);
    }

    listen() {
        this.ui().listen(
            'click', () => this.choose(),
        );
    }

    choose() {
        this.on(NameSpace.GitHub).trigger(
            new Events.User.Chosen(this.user)
        );
    }
}

export default UserItemComponent;
