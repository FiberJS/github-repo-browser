import Flight from 'flight';
import NameSpace from 'namespace';
import Events from 'events';
import Repository from 'domain/repository';
import repositoryHtml from './repository.html';
import repositoryPatch from './repository.patch';
import PatchIt from 'PatchIt';

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
        // this.on(NameSpace.GitHub).trigger(
        //     new Events.Repositories.Chosen(this.repository)
        // );
    }
}

export default RepositoryItemComponent;
