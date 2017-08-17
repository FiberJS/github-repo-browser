import Flight from 'flight';
import PatchIt from 'patchit';
import paginatedListHtml from './paginated-list.html';

const template = PatchIt.template(repositoryHtml, view => {} );

class PaginatedListComponent extends Flight.UIComponent {

    init(renderItem) {
        this.renderItem = renderItem;
    }

    listen() {
        this.view.append(template.render({});
    }

    renderItems(items, pages) {
        this.cleanUp();

        for(let item of items) {
            this.view.$.list.append(this.renderItem(item));
        }

        let pagination = false;
        this.pages = pges;
        for(let section of Object.getOwnPropertyNames(pages)) {
            pagination = true;
            this.view.$[section].className = 'active';
        }
    }
}
