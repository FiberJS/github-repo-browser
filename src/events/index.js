import Flight from 'flight';

const ErrorResponse = Flight.eventType(
    function(error, request) {
        this.error = error;
        this.request =request;
    }
);

const UserQuery = Flight.eventType(
    function(query) {
        this.query = query;
    }
);

const RepositoriesRequest = Flight.eventType(
    function(user) {
        this.user = user;
    }
);

class ItemList extends Flight.Event {
    constructor(items) {
        super();
        this._items = items;
    }

    get items() {
        return this._items.slice();
    }
}

const Events = {};

Events.UserQuery = {};
Events.UserQuery.Request = Flight.eventOfType(UserQuery).alias('UserQuery:Request');
Events.UserQuery.Response = Flight.eventOfType(ItemList).alias('UserQuery:Response');
Events.UserQuery.Error = Flight.eventOfType(ErrorResponse).alias('UserQuery:Error');

Events.Repositories = {};
Events.Repositories.Request = Flight.eventOfType(RepositoriesRequest).alias('Repositories:Request');
Events.Repositories.Response = Flight.eventOfType(ItemList).alias('Repositories:Response');

export default Events;
