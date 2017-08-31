import Fiber from 'fiber';
import NameSpace from 'namespace';
import UserItemComponent from 'components/ui/user-item/user-item.js';
import PaginatedListComponent from 'components/ui/paginated-list/paginated-list.js';
import Events from 'events';
import styles from './user-list.scss';

class UserListComponent extends Fiber.UIComponent {

    listen() {
        this.paginatedList = PaginatedListComponent.attachTo(
            this.view, item => (new UserItemComponent(item)).render()
        );

        this.on(NameSpace.GitHub).listen(
            Events.UserQuery.Request, event => this.paginatedList.loadingState(),
            Events.UserQuery.Response, event => this.showUsers(event),
        );

        this.ui().listen(
            PaginatedListComponent.Events.PageEvent, event => this.paginate(event),
        );
    }

    showUsers(event) {
        this.paginatedList.renderItems(
            event.items, event.links
        );
    }

    paginate(pageEvent) {
        this.on(NameSpace.GitHub).trigger(
            new Events.UserQuery.PageRequest(pageEvent.data)
        );
    }
}

export default UserListComponent;
