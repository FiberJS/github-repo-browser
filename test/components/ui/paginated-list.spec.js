import PaginatedListComponent from 'components/ui/paginated-list/paginated-list.js';
import Fiber from 'fiber';

describe('PaginatedListComponent', () => {
    let component, wrapper, renderItem, query$;
    const items = [1, 2, 3];

    beforeEach(() => {
        renderItem = item => Fiber.DOM.render(`<item>${item}</item>`);
        component = new PaginatedListComponent(renderItem);
        wrapper = component.render();
        query$ = (q) => wrapper.querySelectorAll(q);
    });

    it("should render all the pagination links", () => {
        expect(query$('page-links a').length).to.be(4);
    });

    describe('loadingState()', () => {
        it("should empty all items", () => {
            component.renderItems(items, {});
            component.loadingState();
            expect(query$('item-list item')).to.be.empty;
        });

        it("should reset all pagination links", () => {
            component.renderItems(items, { prev: true, next: true });
            component.loadingState();
            expect(query$('page-links a.active').length).to.be(0);
        });

        it("should add 'loading' class", () => {
            component.loadingState();
            expect(component.view.$.list.className).to.contain('loading');
        });
    });

    describe('renderItems()', () => {
        it("should render all the items", () => {
            component.renderItems(items, {});
            expect(query$('item-list item').length).to.be(items.length);
        });

        it("should remove 'loading' state", () => {
            component.renderItems(items, {});
            expect(
                query$('item-list item').length
            ).to.be(items.length);
        });

        it("should render all the pager links", () => {
            component.renderItems([], {
                prev: true,
                first: true
            });
            expect(query$('page-links a.active').length).to.be(2);
        });
    });

    describe('triggers PageEvent on click', () => {
        beforeEach(() => {
            component.renderItems(items, { prev: true, next: true });
        });

        it("should remove 'loading' state", () => {
            // query$('page-links a#previous-page').click();
        });
    });

});
