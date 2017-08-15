import Flight from 'flight';
import Events from 'events';

const NameSpace = {
    System : Flight.namespace('data/system'),
    GitHub : Flight.namespace('data/github'),
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
