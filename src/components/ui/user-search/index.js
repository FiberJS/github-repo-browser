import Flight from 'flight';
import NameSpace from 'namespace';
import Events from 'events';
import jquery from 'jquery';
const $ = jquery;

const ENTER = 13;

class UserSearchComponent extends Flight.UIComponent {

    listen() {
        this.on(NameSpace.GitHub).listen(
            Events.UserQuery.Response, event => this.showUsers(event.items),
        );
        this.ui('#search-query').listen(
            'keypress', event => this.onKeyPress(event),
        );

        this.$searchBar = $('#search-query');
        this.$userList = $('#user-list');
    }

    clearUsers() {
        this.$userList.html('');
    }

    showUsers(users) {
        this.clearUsers();

        for(let user of users) {
            this.$userList.append($(`<li>${user.login}</li>`));
        }
    }

    onKeyPress(event) {
        if(event.charCode == ENTER && this.$searchBar.val().length >= 3) {
            this.on(NameSpace.GitHub).trigger(
                new Events.UserQuery.Request(this.$searchBar.val())
            );
        }
    }
}

export default UserSearchComponent;
