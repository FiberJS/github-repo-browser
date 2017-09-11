import Fiber from 'fiber';
import PatchIt from 'patchit';
import template from './paginated-list.html';
import style from './paginated-list.scss';

const PAGES = ['first', 'prev', 'next', 'last'];

class PaginatedListComponent extends Fiber.UIComponent.withTemplate(template) {

    init(renderItem) {
        this.renderItem = renderItem;
    }

    listen() {
        PatchIt.assignVariables(this.view);

        PAGES.forEach(page => {
            this.ui(this.view.$[page]).listen(
                'click', event => this.paginate(event, page)
            );
        });
    }

    loadingState() {
        this.cleanUp();
        this.view.$.list.className = 'loading';
    }

    renderItems(items, pages) {
        this.cleanUp();

        for(let item of items) {
            this.view.$.list.append(this.renderItem(item));
        }

        let pagination = false;
        this.pages = pages;
        for(let section of Object.getOwnPropertyNames(pages)) {
            pagination = true;
            this.view.$[section].className = 'active';
        }
    }

    paginate(event, page) {
        event.preventDefault();
        this.ui().trigger(
            new PaginatedListComponent.Events.PageEvent(
                page, this.pages[page]
            )
        );
    }

    cleanUp() {
        this.view.$.list.className = '';
        this.view.$.list.innerHTML = '';
        PAGES.forEach( page => {
            this.view.$[page].className = '';
        })
    }
}

const PageEvent = Fiber.defineEventType({
    page: 'string',
    data: 'any',
});

PaginatedListComponent.Events = {
    PageEvent : Fiber.defineEvent(PageEvent, 'Pagination:PageRequest'),
};

export default PaginatedListComponent;
