import Flight from 'flight';
import NameSpace from 'namespace';
import Events from 'events';
import GitHubComponent from 'components/data/github';
import UserSearchComponent from 'components/ui/user-search';

// Debugger
Flight.Debugger.showEvents = true;
// Flight.Debugger.showView = true;
Flight.Debugger.init();

Flight.app(() => {
    // data components
    GitHubComponent.attachTo(NameSpace.GitHub);

    // ui components
    UserSearchComponent.attachTo('#user-search');
});

NameSpace.GitHub.listen(
    Events.UserQuery.Response, event => {
        for(let item of event.items) {
            console.log(item.login);
        }
    },

    Events.UserQuery.Error, event => {
        console.log(event);
    },
);

NameSpace.GitHub.trigger(new Events.UserQuery.Request('buzz'));


// for debugging
window.Flight = Flight;
