import Fiber from 'fiber';
import NameSpace from 'namespace';
import Events from 'events';
import GitHubComponent from 'components/data/github/github';
import FlowManagerComponent from 'FlowManager';
import UserSearchComponent from 'components/ui/user-search/user-search.js';
import UserListComponent from 'components/ui/user-list/user-list.js';
import UserBadgeComponent from 'components/ui/user-badge/user-badge.js';
import RepositoryListComponent from 'components/ui/repository-list/repository-list.js';
import RepositoryDetailsComponent from 'components/ui/repository-details/repository-details.js';
import usersTemplate from 'pages/users.html';
import repositoriesTemplate from 'pages/repositories.html';
import repositoryTemplate from 'pages/repository.html';

require('./app.scss');

// Debugger
Fiber.Debugger.showEvents = true;
// Fiber.Debugger.showView = true;
Fiber.Debugger.init();

Fiber.app(() => {
    // data components
    GitHubComponent.attachTo(NameSpace.GitHub);

    // ui components
    FlowManagerComponent.attachTo('flow-manager')
        .addStep({
            name: 'users',
            template: Fiber.DOM.renderWithComponents(usersTemplate,
                UserSearchComponent, UserListComponent
            ),
        })
        .addStep({
            name: 'repositories',
            template: Fiber.DOM.renderWithComponents(repositoriesTemplate,
                UserBadgeComponent, RepositoryListComponent
            ),
            nameSpace: NameSpace.GitHub,
            events: [ Events.User.Chosen ],
        })
        .addStep({
            name: 'repository',
            template: Fiber.DOM.renderWithComponents(repositoryTemplate,
                UserBadgeComponent, RepositoryDetailsComponent
            ),
            nameSpace: NameSpace.GitHub,
            events: [ Events.Repository.Chosen ],
        })
        ;
});

// debugging
window.Fiber = Fiber;
NameSpace.GitHub.listen(
    Events.UserQuery.Error, event => {
        console.log(event);
    },
);
