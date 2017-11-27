import Fiber from 'fiber';
import NameSpace from 'namespace';
import Events from 'events';
import debounce from 'debounce';
import template from './user-search.html';
import styles from './user-search.scss';

const ENTER = 13;

class UserSearchComponent extends Fiber.UIComponent.withTemplate(template) {

    listen() {
        this.searchBar = this.view.querySelector('#search-query');
        const debouncedKeyPress = debounce(()=>this.onKeyPress(), 400);

        this.on(NameSpace.System).listen(
            Fiber.System.Ready, event => this.searchBar.focus(),
        );
        this.ui('#search-query').listen(
            'keyup paste', event => debouncedKeyPress(),
        );

        this.onKeyPress();
    }

    onKeyPress(event) {
        if(this.searchBar.value.length >= 3) {
            this.on(NameSpace.GitHub).trigger(
                new Events.UserQuery.Request(this.searchBar.value)
            );
        }
    }
}

export default UserSearchComponent;
