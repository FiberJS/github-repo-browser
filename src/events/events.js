import Fiber from 'fiber';
import Repository from 'domain/repository';
import User from 'domain/user';

const Any = 'any';
const ErrorResponse = Fiber.defineEventType({
    error: Any,
    request: Any,
});

const UserEventType = Fiber.defineEventType({
    user: User
});

const RepositoryEventType = Fiber.defineEventType({
    repository: Repository
});

const RepositoryDetails = Fiber.defineEventType({
    details: Object
});

const UserQuery = Fiber.defineEventType({
    query: 'string'
});

const ItemsResponse = Fiber.defineEventType({
    items: Array,
    links: Any
});

const PageRequest = Fiber.defineEventType({
    pageUri: 'string'
});

const Events = {};

Events.UserQuery = {};
Events.UserQuery.Request = Fiber.defineEvent(UserQuery, 'UserQuery:Request');
Events.UserQuery.PageRequest = Fiber.defineEvent(PageRequest, 'UserQuery:PageRequest');
Events.UserQuery.Response = Fiber.defineEvent(ItemsResponse, 'UserQuery:Response');
Events.UserQuery.Error = Fiber.defineEvent(ErrorResponse, 'UserQuery:Error');

Events.User = {};
Events.User.Chosen = Fiber.defineEvent(UserEventType, 'User:Chosen');

Events.Repositories = {};
Events.Repositories.Request = Fiber.defineEvent(UserEventType, 'Repositories:Request');
Events.Repositories.PageRequest = Fiber.defineEvent(PageRequest, 'Repositories:PageRequest');
Events.Repositories.Response = Fiber.defineEvent(ItemsResponse, 'Repositories:Response');
Events.Repositories.Error = Fiber.defineEvent(ErrorResponse, 'Repositories:Error');

Events.Repository = {};
Events.Repository.Chosen = Fiber.defineEvent(RepositoryEventType, 'Repository:Chosen');
Events.Repository.DetailsRequest = Fiber.defineEvent(RepositoryEventType, 'Repository:DetailsRequest');
Events.Repository.DetailsReady = Fiber.defineEvent(RepositoryDetails, 'Repository:DetailsReady');
Events.Repository.Error = Fiber.defineEvent(ErrorResponse, 'Repository:Error');

import { ShowStepEvent, StepBackEvent } from 'FlowManager/events';
Events.Flow = {};
Events.Flow.ShowStep = ShowStepEvent;
Events.Flow.StepBack = StepBackEvent;

export default Events;
