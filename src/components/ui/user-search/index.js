import Flight from 'flight';
import NameSpace from 'namespace';
import UserItemComponent from 'components/ui/user-item';
import Events from 'events';
import jquery from 'jquery';
import debounce from 'debounce';
import template from './user-search.html';
import styles from './user-search.scss';
const $ = jquery;

const ENTER = 13;

class UserSearchComponent extends Flight.UIComponent {

    listen() {
        this.renderTemplate();

        this.$searchBar = $('#search-query', this.view);
        this.$userList = $('user-list', this.view);
        const debouncedKeyPress = debounce(()=>this.onKeyPress(), 400);

        this.on(NameSpace.System).listen(
            Flight.System.Ready, event => this.$searchBar.focus(),
        );
        this.on(NameSpace.GitHub).listen(
            Events.UserQuery.Response, event => this.showUsers(event.items),
        );
        this.ui('#search-query').listen(
            'keyup change paste', event => debouncedKeyPress(),
        );

        this.onKeyPress();
    }

    renderTemplate() {
        this.view.innerHTML = template;
    }

    clearUsers() {
        this.$userList.html('');
    }

    showUsers(users) {
        this.clearUsers();

        for(let user of users) {
            const userItem = new UserItemComponent(user);
            this.$userList.append(userItem.render());
        }
    }

    onKeyPress(event) {
        if(this.$searchBar.val().length >= 3) {
            this.on(NameSpace.GitHub).trigger(
                new Events.UserQuery.Request(this.$searchBar.val())
            );
        }
    }
}

export default UserSearchComponent;
