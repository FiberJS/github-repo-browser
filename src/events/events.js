import Flight from 'flight';
import Repository from 'domain/repository';
import User from 'domain/user';

const Any = 'any';
const ErrorResponse = Flight.defineEventType({
    error: Any,
    request: Any,
});

const UserEventType = Flight.defineEventType({
    user: User
});

const RepositoryEventType = Flight.defineEventType({
    repository: Repository
});

const RepositoryDetails = Flight.defineEventType({
    details: Object
});

const UserQuery = Flight.defineEventType({
    query: 'string'
});

const ItemsResponse = Flight.defineEventType({
    items: Array,
    links: Any
});

const Events = {};

Events.UserQuery = {};
Events.UserQuery.Request = Flight.defineEvent(UserQuery, 'UserQuery:Request');
Events.UserQuery.Response = Flight.defineEvent(ItemsResponse, 'UserQuery:Response');
Events.UserQuery.Error = Flight.defineEvent(ErrorResponse, 'UserQuery:Error');

Events.User = {};
Events.User.Chosen = Flight.defineEvent(UserEventType, 'User:Chosen');

Events.Repositories = {};
Events.Repositories.Request = Flight.defineEvent(UserEventType, 'Repositories:Request');
Events.Repositories.Response = Flight.defineEvent(ItemsResponse, 'Repositories:Response');
Events.Repositories.Error = Flight.defineEvent(ErrorResponse, 'Repositories:Error');

Events.Repository = {};
Events.Repository.Chosen = Flight.defineEvent(RepositoryEventType, 'Repository:Chosen');
Events.Repository.DetailsRequest = Flight.defineEvent(RepositoryEventType, 'Repository:DetailsRequest');
Events.Repository.DetailsReady = Flight.defineEvent(RepositoryDetails, 'Repository:DetailsReady');
Events.Repository.Error = Flight.defineEvent(ErrorResponse, 'Repository:Error');

import { ShowStepEvent, StepBackEvent } from 'FlowManager/events';
Events.Flow = {};
Events.Flow.ShowStep = ShowStepEvent;
Events.Flow.StepBack = StepBackEvent;

export default Events;
