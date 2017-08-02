import Flight from 'flight';

const ErrorResponse = Flight.eventType(
    function(error, request) {
        this.error = error;
        this.request =request;
    }
);

const UserEvent = Flight.eventType(
    function(user) {
        this.user = user;
    }
);

const RepositoryEvent = Flight.eventType(
    function(repository) {
        this.repository = repository;
    }
);

const UserQueryEvent = Flight.eventType(
    function(query) {
        this.query = query;
    }
);

const RepositoriesRequest = Flight.eventType(
    function(user) {
        this.user = user;
    }
);

class ItemListEvent extends Flight.Event {
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
Events.UserQuery.Request = Flight.eventOfType(UserQueryEvent).alias('UserQuery:Request');
Events.UserQuery.Response = Flight.eventOfType(ItemListEvent).alias('UserQuery:Response');
Events.UserQuery.Error = Flight.eventOfType(ErrorResponse).alias('UserQuery:Error');

Events.User = {};
Events.User.Chosen = Flight.eventOfType(UserEvent).alias('User:Chosen');

Events.Repositories = {};
Events.Repositories.Request = Flight.eventOfType(RepositoriesRequest).alias('Repositories:Request');
Events.Repositories.Response = Flight.eventOfType(ItemListEvent).alias('Repositories:Response');

Events.Repository = {};
Events.Repository.Chosen = Flight.eventOfType(RepositoryEvent).alias('Repository:Chosen');

import { ShowStepEvent, StepBackEvent } from 'FlowManager/events';
Events.Flow = {};
Events.Flow.ShowStep = ShowStepEvent;
Events.Flow.StepBack = StepBackEvent;

export default Events;
