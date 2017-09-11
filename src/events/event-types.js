import Fiber from 'fiber';
import { Mixed } from 'fiber/domain';
import Repository from 'domain/repository';
import User from 'domain/user';

export const ErrorResponse = Fiber.defineEventType({
    error: Mixed,
    request: Mixed,
});

export const UserEventType = Fiber.defineEventType({
    user: User
});

export const RepositoryEventType = Fiber.defineEventType({
    repository: Repository
});

export const RepositoryDetails = Fiber.defineEventType({
    details: Object
});

export const UserQuery = Fiber.defineEventType({
    query: String
});

export const ItemsResponse = Fiber.defineEventType({
    items: Array,
    links: Object
});

export const PageRequest = Fiber.defineEventType({
    pageUri: String
});
