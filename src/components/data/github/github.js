import Fiber from 'fiber';
import NameSpace from 'namespace';
import Events from 'events';
import jquery from 'jquery';

// for working offline
// import usersJson from './users.json';
// import reposJson from './repos.json';

const GITHUB_SEARCH_URL = (query) => `https://api.github.com/search/users?q=${query}`;
const GITHUB_REPO_URL = (user) => `https://api.github.com/users/${user}/repos`;
const GITHUB_README_URL = (user, repo) => `https://api.github.com/repos/${user}/${repo}/readme`;
const MISSING_README = (repoName) => `# ${repoName}\n-- No information provided --`;

class GitHubComponent extends Fiber.DataComponent {

    listen() {
        this.on(NameSpace.GitHub).listen(
            Events.UserQuery.Request,
                event => this.processPage(GITHUB_SEARCH_URL(event.query), Events.UserQuery),

            Events.UserQuery.PageRequest,
                event => this.processPage(event.pageUri, Events.UserQuery),

            Events.Repositories.Request,
                event => this.processPage(GITHUB_REPO_URL(event.user.login), Events.Repositories),

            Events.Repositories.PageRequest,
                event => this.processPage(event.pageUri, Events.Repositories),

            Events.Repository.DetailsRequest,
                event => this.getRepository(event.repository),
        );
    }

    processPage(pageUri, EventParent) {
        jquery.getJSON(
            pageUri
        ).done((data, status, response) => {
            const links = parseLinks(response.getResponseHeader('Link'));
            this.on(NameSpace.GitHub).trigger(
                new EventParent.Response(
                    data instanceof Array ? data : data.items, links
                )
            );
        }).fail(error => {
            this.on(NameSpace.GitHub).trigger(
                new EventParent.Error(error, pageUri)
            );
        });
    }

    getRepositories(user) {
        jquery.getJSON(
            GITHUB_REPO_URL(user.login)
        ).done(response => {
            this.on(NameSpace.GitHub).trigger(
                new Events.Repositories.Response(response)
            );
        }).fail(error => {
            this.on(NameSpace.GitHub).trigger(
                new Events.Repositories.Error(error, user)
            );
        });
    }

    getRepository(repository) {
        const login = NameSpace.GitHub.state.currentUser.login;
        jquery.getJSON(
            GITHUB_README_URL(login, repository.name)
        ).done(response => {
            jquery
            .get(response.download_url)
            .done(response => {
                this.on(NameSpace.GitHub).trigger(
                    new Events.Repository.DetailsReady({
                        name: repository.name,
                        readme: response || MISSING_README(repository.name),
                    })
                );
            })
            .fail(response => {
                this.on(NameSpace.GitHub).trigger(
                    new Events.Repository.Error(error, user)
                );
            })

        }).fail(error => {
            if(error.status == 404) {
                this.on(NameSpace.GitHub).trigger(
                    new Events.Repository.DetailsReady({
                        name: repository.name,
                        readme: MISSING_README(repository.name),
                    })
                );
            } else {
                this.on(NameSpace.GitHub).trigger(
                    new Events.Repository.Error(error, repository)
                );
            }
        });
    }
}

export default GitHubComponent;

function parseLinks(linkHeader) {
    if (!linkHeader || linkHeader.length == 0) {
        return {};
    }
    var links = {};
    linkHeader.split(',').forEach( part => {
        var section = part.split(';');
        var url = section[0].replace(/<(.*)>/, '$1').trim();
        var name = section[1].replace(/rel="(.*)"/, '$1').trim();
        links[name] = url;
    });

    return links;
}
