import Flight from 'flight';
import NameSpace from 'namespace';
import Events from 'events';
import GitHubComponent from 'components/data/github';
import FlowManagerComponent from 'components/ui/flow-manager';
import UserSearchComponent from 'components/ui/user-search';
import UserBadgeComponent from 'components/ui/user-badge';
import RepositoryListComponent from 'components/ui/repository-list';
require('./app.scss');

// Debugger
Flight.Debugger.showEvents = true;
// Flight.Debugger.showView = true;
Flight.Debugger.init();

Flight.app(() => {
    // data components
    GitHubComponent.attachTo(NameSpace.GitHub);

    // ui components
    FlowManagerComponent.attachTo('flow-manager');
    UserSearchComponent.attachTo('user-search');
    UserBadgeComponent.attachTo('user-badge');
    RepositoryListComponent.attachTo('repository-list');
});

// debugging
window.Flight = Flight;
NameSpace.GitHub.listen(
    Events.UserQuery.Error, event => {
        console.log(event);
    },
);
