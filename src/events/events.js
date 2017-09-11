import Fiber from 'fiber';
import {
    ErrorResponse,UserEventType,RepositoryEventType,RepositoryDetails,
    UserQuery,ItemsResponse,PageRequest
} from './event-types';

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
