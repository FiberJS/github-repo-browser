import Flight from 'flight';
import NameSpace from 'namespace';
import Events from 'events';
import userHtml from './user.html';
import userPatch from './user.patch';
import PatchIt from 'PatchIt';
import styles from './user-item.scss';

const userTemplate = PatchIt.template(userHtml, userPatch);

class UserItemComponent extends Flight.UIComponent {

    init(user) {
        this.user = user;
        this.view = userTemplate.render(this.user);
    }

    listen() {
        this.ui(this.view).listen(
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
