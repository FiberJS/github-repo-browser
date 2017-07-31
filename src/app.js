import Flight from 'flight';
import NameSpace from 'namespace';
import Events from 'events';
import GitHubComponent from 'components/data/github';
import FlowManagerComponent from 'components/ui/flow-manager';
import UserSearchComponent from 'components/ui/user-search';
import UserBadgeComponent from 'components/ui/user-badge';
import RepositoryListComponent from 'components/ui/repository-list';

import usersTemplate from 'components/ui/flow-manager/pages/users.html';
import repositoriesTemplate from 'components/ui/flow-manager/pages/repositories.html';

require('./app.scss');

// Debugger
Flight.Debugger.showEvents = true;
// Flight.Debugger.showView = true;
Flight.Debugger.init();

Flight.app(() => {
    // data components
    GitHubComponent.attachTo(NameSpace.GitHub);

    // ui components
    FlowManagerComponent.attachTo('flow-manager')
        .addStep({
            name: 'users',
            template: usersTemplate,
            components: [ UserSearchComponent ],
        })
        .addStep({
            name: 'repositories',
            template: repositoriesTemplate,
            components: [ UserBadgeComponent, RepositoryListComponent ],
            nameSpace: NameSpace.GitHub,
            events: [ Events.User.Chosen ],
        });
});

// debugging
window.Flight = Flight;
NameSpace.GitHub.listen(
    Events.UserQuery.Error, event => {
        console.log(event);
    },
);
