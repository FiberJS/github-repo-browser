import Flight from 'flight';
import NameSpace from 'namespace';
import Events from 'events';
import Repository from 'domain/repository';
import repositoryHtml from './repository.html';
import repositoryPatch from './repository.patch';
import PatchIt from 'PatchIt';
import styles from './repository-item.scss';


const repositoryTemplate = PatchIt.template(repositoryHtml, repositoryPatch);

class RepositoryItemComponent extends Flight.UIComponent {

    init(repository) {
        this.repository = new Repository(repository);
        this.view = repositoryTemplate.render(this.repository);
    }

    listen() {
        this.ui(this.view).listen(
            'click', () => this.choose(),
        );
    }

    choose() {
        console.log(NameSpace.GitHub.state.currentUser);
        // this.on(NameSpace.GitHub).trigger(
        //     new Events.Repositories.Chosen(this.repository)
        // );
    }
}

export default RepositoryItemComponent;
