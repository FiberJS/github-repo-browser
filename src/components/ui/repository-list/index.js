import Flight from 'flight';
import NameSpace from 'namespace';
import RepositoryItemComponent from 'components/ui/repository-item';
import Events from 'events';

const LOADING_TEXT = "Loading repositories...";
const EMPTY_TEXT = "No repositories :(";

class RepositoryListComponent extends Flight.UIComponent {

    listen() {
        this.on(NameSpace.GitHub).listen(
            Events.User.Chosen, event => this.requestRepositories(event.user),
        );
        this.on(NameSpace.GitHub).listen(
            Events.Repositories.Response, event => this.showRepositories(event.items),
        );
    }

    requestRepositories(user) {
        this.clearItems(LOADING_TEXT);
        this.view.className = 'loading';
        this.on(NameSpace.GitHub).trigger(
            new Events.Repositories.Request(user)
        );
    }

    clearItems(placeHolder) {
        this.view.innerHTML = placeHolder || '';
    }

    showRepositories(items) {
        this.view.className = '';
        this.clearItems(items.length ? '' : EMPTY_TEXT);

        for(let item of items) {
            const repository = new RepositoryItemComponent(item);
            this.view.appendChild(repository.render());
        }
    }
}

export default RepositoryListComponent;
