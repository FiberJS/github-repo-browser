import Fiber from 'fiber';
import NameSpace from 'namespace';
import Events from 'events';
import PaginatedListComponent from 'components/ui/paginated-list/paginated-list.js';

describe('PaginatedListComponent', () => {
    let component, wrapper, renderItem, $, $$;
    const items = [1, 2, 3];

    beforeEach(() => {
        renderItem = item => Fiber.DOM.render(`<item>${item}</item>`);
        component = new PaginatedListComponent(renderItem);
        wrapper = component.render();
        $$ = (q) => wrapper.querySelectorAll(q);
        $ = (q) => wrapper.querySelector(q);
    });

    it("should render all the pagination links", () => {
        expect($$('page-links a').length).to.be(4);
    });

    describe('loadingState()', () => {
        it("should empty all items", () => {
            component.renderItems(items, {});
            component.loadingState();
            expect($$('item-list item')).to.be.empty;
        });

        it("should reset all pagination links", () => {
            component.renderItems(items, { prev: true, next: true });
            component.loadingState();
            expect($$('page-links a.active').length).to.be(0);
        });

        it("should add 'loading' class", () => {
            component.loadingState();
            expect(component.view.$.list.className).to.contain('loading');
        });
    });

    describe('renderItems()', () => {
        it("should render all the items", () => {
            component.renderItems(items, {});
            expect($$('item-list item').length).to.be(items.length);
        });

        it("should remove 'loading' state", () => {
            component.renderItems(items, {});
            expect(
                $$('item-list item').length
            ).to.be(items.length);
        });

        it("should render all the pager links", () => {
            component.renderItems([], {
                prev: true,
                first: true
            });
            expect($$('page-links a.active').length).to.be(2);
        });
    });

    describe('triggers PageEvent if active link is clicked', () => {
        beforeEach(() => {
            component.renderItems(items, {
                first: 'first',
                prev: 'prev',
                next: 'next',
                last: 'last'
            });
        });

        ['first', 'prev', 'next', 'last'].forEach( page => {
            it("trigger appropriate page event for " + page, (done) => {
                component.ui().listen(
                    PaginatedListComponent.Events.PageEvent, (event) => {
                        expect(event.page).to.be(page);
                        expect(event.data).to.be(page);
                        done();
                    }
                )
                $(`page-links a[var="${page}"]`).click();
            });
        });
    });

    describe('triggers no PageEvent on passive link', () => {
        beforeEach(() => {
            component.renderItems(items, {});
        });

        ['first', 'prev', 'next', 'last'].forEach( page => {
            it("trigger appropriate page event for " + page, (done) => {
                component.ui().listen(
                    PaginatedListComponent.Events.PageEvent, (event) => {
                        expect(1).to.be(0);
                        done();
                    }
                )

                $(`page-links a[var="${page}"]`).click();

                new Promise(resolve => resolve()).then(done);
            });
        });
    });

});
