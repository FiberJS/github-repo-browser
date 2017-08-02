import Flight from 'flight';
import Events from 'events';

const NameSpace = {
    System : Flight.getOrCreateEventPool('data/system'),
    GitHub : Flight.getOrCreateEventPool('data/github'),
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
