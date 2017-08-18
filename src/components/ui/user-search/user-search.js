import Flight from 'flight';
import NameSpace from 'namespace';
import Events from 'events';
import jquery from 'jquery';
import debounce from 'debounce';
import template from './user-search.html';
import styles from './user-search.scss';
const $ = jquery;

const ENTER = 13;

class UserSearchComponent extends Flight.UIComponent.withTemplate(template) {

    listen() {
        this.$searchBar = $('#search-query', this.view);
        const debouncedKeyPress = debounce(()=>this.onKeyPress(), 400);

        this.on(NameSpace.System).listen(
            Flight.System.Ready, event => this.$searchBar.focus(),
        );
        this.ui('#search-query').listen(
            'keyup paste', event => debouncedKeyPress(),
        );

        this.onKeyPress();
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
