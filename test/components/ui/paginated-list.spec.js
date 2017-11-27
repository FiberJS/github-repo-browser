import PaginatedListComponent from 'components/ui/paginated-list/paginated-list';
import NameSpace from 'namespace';
import Fiber from 'fiber/test';
import Events from 'events';

describe('PaginatedListComponent', () => {
    let component, wrapper, renderItem;

    beforeEach(() => {
        renderItem = item => Fiber.DOM.render(`<div>${item}</div>`);
        component = new PaginatedListComponent(renderItem);
        wrapper = component.render();
    });

    
});
