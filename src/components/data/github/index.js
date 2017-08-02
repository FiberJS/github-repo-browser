import Flight from 'flight';
import NameSpace from 'namespace';
import Events from 'events';
import jquery from 'jquery';

import usersJson from './users.json';
import reposJson from './repos.json';

const GITHUB_SEARCH_URL = 'https://api.github.com/search/users';
const GITHUB_REPO_URL = (user) => `https://api.github.com/users/${user}/repos`;

class GitHubComponent extends Flight.DataComponent {

    listen() {
        this.on(NameSpace.GitHub).listen(
            Events.UserQuery.Request, event => this.queryUsers(event.query),
            Events.Repositories.Request, event => this.getRepositories(event.user),
        );
    }

    queryUsers(query) {
        jquery.getJSON(
            GITHUB_SEARCH_URL,
            { q: query }
        ).done((response) => {
            this.on(NameSpace.GitHub).trigger(
                new Events.UserQuery.Response(response.items)
            );
        }).fail((error) => {
            this.on(NameSpace.GitHub).trigger(
                new Events.UserQuery.Error(error, query)
            );
        });
    }

    getRepositories(user) {
        jquery.getJSON(
            GITHUB_REPO_URL(user.login)
        ).done((response) => {
            this.on(NameSpace.GitHub).trigger(
                new Events.Repositories.Response(response)
            );
        }).fail((error) => {
            this.on(NameSpace.GitHub).trigger(
                new Events.Repositories.Error(error, user)
            );
        });
    }
}

export default GitHubComponent;
