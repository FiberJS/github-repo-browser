import Flight from 'flight';
import NameSpace from 'namespace';
import RepositoryItemComponent from 'components/ui/repository-item/repository-item.js';
import PaginatedListComponent from 'components/ui/paginated-list/paginated-list.js';
import Events from 'events';
import styles from './repository-list.scss';

class RepositoryListComponent extends Flight.UIComponent {

    listen() {
        this.paginatedList = PaginatedListComponent.attachTo(
            this.view, item => (new RepositoryItemComponent(item)).render()
        );

        this.on(NameSpace.GitHub).listen(
            Events.User.Chosen, event => this.requestRepositories(event.user),
            Events.Repositories.Response, event => this.showUsers(event),
        );

        this.ui().listen(
            PaginatedListComponent.Events.PageEvent, event => this.paginate(event),
        );
    }

    requestRepositories(user) {
        this.paginatedList.loadingState();
        this.on(NameSpace.GitHub).trigger(
            new Events.Repositories.Request(user)
        );
    }

    showUsers(event) {
        this.paginatedList.renderItems(
            event.items, event.links
        );
    }

    paginate(pageEvent) {
        this.on(NameSpace.GitHub).trigger(
            new Events.Repositories.PageRequest(pageEvent.data)
        );
    }
}

export default RepositoryListComponent;
