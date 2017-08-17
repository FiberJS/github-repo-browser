import Flight from 'flight';
import NameSpace from 'namespace';
import Events from 'events';
import PatchIt from 'patchit';
import Repository from 'domain/repository';
import repositoryHtml from './repository.html';
import repositoryPatch from './repository.patch';
import styles from './repository-item.scss';

const repositoryTemplate = PatchIt.template(repositoryHtml, repositoryPatch);

class RepositoryItemComponent extends Flight.UIComponent {

    init(repository) {
        this.repository = new Repository(repository);
        this.view = repositoryTemplate.render(this.repository);
    }

    listen() {
        this.ui().listen(
            'click', () => this.choose(),
        );
    }

    choose() {
        this.on(NameSpace.GitHub).trigger(
            new Events.Repository.Chosen(this.repository)
        );
    }
}

export default RepositoryItemComponent;
