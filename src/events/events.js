import Flight from 'flight';
import Repository from 'domain/repository';
import User from 'domain/user';

const ErrorResponse = Flight.defineEventType({
    error: 'any',
    request: 'any',
});

const UserEvent = Flight.defineEventType({
    user: User
});

const RepositoryEvent = Flight.defineEventType({
    repository: Repository
});

const RepositoryDetailsEvent = Flight.defineEventType({
    details: Object
});

const UserQueryEvent = Flight.defineEventType({
    query: 'string'
});

const RepositoriesRequest = Flight.defineEventType({
    user: Object
});

const ItemListEvent = Flight.defineEventType({
    items: Array
});

const Events = {};

Events.UserQuery = {};
Events.UserQuery.Request = Flight.defineEvent(UserQueryEvent, 'UserQuery:Request');
Events.UserQuery.Response = Flight.defineEvent(ItemListEvent, 'UserQuery:Response');
Events.UserQuery.Error = Flight.defineEvent(ErrorResponse, 'UserQuery:Error');

Events.User = {};
Events.User.Chosen = Flight.defineEvent(UserEvent, 'User:Chosen');

Events.Repositories = {};
Events.Repositories.Request = Flight.defineEvent(RepositoriesRequest, 'Repositories:Request');
Events.Repositories.Response = Flight.defineEvent(ItemListEvent, 'Repositories:Response');
Events.Repositories.Error = Flight.defineEvent(ErrorResponse, 'Repositories:Error');

Events.Repository = {};
Events.Repository.Chosen = Flight.defineEvent(RepositoryEvent, 'Repository:Chosen');
Events.Repository.DetailsRequest = Flight.defineEvent(RepositoryEvent, 'Repository:DetailsRequest');
Events.Repository.DetailsReady = Flight.defineEvent(RepositoryDetailsEvent, 'Repository:DetailsReady');
Events.Repository.Error = Flight.defineEvent(ErrorResponse, 'Repository:Error');

import { ShowStepEvent, StepBackEvent } from 'FlowManager/events';
Events.Flow = {};
Events.Flow.ShowStep = ShowStepEvent;
Events.Flow.StepBack = StepBackEvent;

export default Events;
