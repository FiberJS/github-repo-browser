import Fiber from 'fiber';
import Events from 'events';

const NameSpace = {
    System : Fiber.namespace('data/system'),
    GitHub : Fiber.namespace('data/github'),
};

NameSpace.GitHub.defineState({
    currentUser : (state) => [
        Events.User.Chosen, event => { state.currentUser = event.user },
    ],
    currentRepo : (state) => [
        Events.Repository.Chosen, event => { state.currentRepo = event.repository },
    ]
});

export default NameSpace;
