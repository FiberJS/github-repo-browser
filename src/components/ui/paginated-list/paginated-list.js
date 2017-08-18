import Flight from 'flight';
import PatchIt from 'patchit';
import template from './paginated-list.html';
import style from './paginated-list.scss';

class PaginatedListComponent extends Flight.UIComponent.withTemplate(template) {

    init(renderItem) {
        this.renderItem = renderItem;
    }

    listen() {
        PatchIt.assignVariables(this.view);

        this.ui(this.view.$.first).listen(
            'click', event => this.paginate(event, 'first')
        );
        this.ui(this.view.$.prev).listen(
            'click', event => this.paginate(event, 'prev')
        );
        this.ui(this.view.$.next).listen(
            'click', event => this.paginate(event, 'next')
        );
        this.ui(this.view.$.last).listen(
            'click', event => this.paginate(event, 'last')
        );
    }

    loadingState() {
        console.log('loadingState');
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
        this.view.$.first.className = '';
        this.view.$.prev.className = '';
        this.view.$.next.className = '';
        this.view.$.last.className = '';
    }
}

const PageEvent = Flight.defineEventType({
    page: 'string',
    data: 'any',
});

PaginatedListComponent.Events = {
    PageEvent : Flight.defineEvent(PageEvent, 'Pagination:PageRequest'),
};

export default PaginatedListComponent;
