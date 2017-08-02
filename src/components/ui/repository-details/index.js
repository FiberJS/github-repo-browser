import Flight from 'flight';
import NameSpace from 'namespace';
import Events from 'events';
import repositoryHtml from './repository-details.html';

class RepositoryDetailsComponent extends Flight.UIComponent {

    listen() {
        this.view.append(Flight.DOM.render(repositoryHtml));
    }
}

export default RepositoryDetailsComponent;
