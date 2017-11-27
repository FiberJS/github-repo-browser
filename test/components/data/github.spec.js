import { lastTriggeredOf } from 'fiber/test';
import GitHubComponent, {
    GITHUB_SEARCH_URL, GITHUB_REPO_URL
} from 'components/data/github/github.js';
import NameSpace from 'namespace';
import Events from 'events';
import User from 'domain/user';
import axios from 'axios';

const resolve = (data, headers) => new Promise( resolve => resolve({data, headers}) );
const reject = (error) => new Promise( (resolve, reject) => reject(error) );

describe('GitHubComponent', () => {
    const component = GitHubComponent.attachTo(NameSpace.GitHub);

    const linkUri = 'https://api.github.com/search/users?q=test&page=2';
    const items = [1, 2, 3];
    const error = "error";

    [
        {
            Request: Events.UserQuery.Request,
            Success: Events.UserQuery.Response,
            Failure: Events.UserQuery.Error,
            link: `<${linkUri}>; rel="next", <${linkUri}>; rel="last"`,
            query: 'users',
            uri: GITHUB_SEARCH_URL('users')
        },
        {
            Request: Events.UserQuery.PageRequest,
            Success: Events.UserQuery.Response,
            Failure: Events.UserQuery.Error,
            link: `<${linkUri}>; rel="next", <${linkUri}>; rel="last"`,
            query: 'usersPage',
            uri: 'usersPage'
        },
        {
            Request: Events.Repositories.Request,
            Success: Events.Repositories.Response,
            Failure: Events.Repositories.Error,
            link: `<${linkUri}>; rel="next", <${linkUri}>; rel="last"`,
            query: aUser('userLogin'),
            uri: GITHUB_REPO_URL('userLogin')
        },
        {
            Request: Events.Repositories.PageRequest,
            Success: Events.Repositories.Response,
            Failure: Events.Repositories.Error,
            link: `<${linkUri}>; rel="next", <${linkUri}>; rel="last"`,
            query: 'reposPage',
            uri: 'reposPage'
        },
    ].forEach(({Request, Success, Failure, link, query, uri}) => {

        describe('Listens for ' + Request.EventName, () => {

            describe('and on success', () => {
                let successEvent;

                beforeEach((done) => {
                    const promise = resolve({ items }, { link });

                    axios.get = (q) => promise;

                    NameSpace.GitHub.trigger(
                        new Request(query)
                    );

                    promise.then(ready => {
                        successEvent = lastTriggeredOf(Success);
                        done();
                    });
                });

                it("should respond with " + Response.EventName, () => {
                    expect(successEvent).not.to.be(null);
                });

                it("should return all items", () => {
                    expect(successEvent.items.length).to.equal(items.length);
                    expect(successEvent.items).to.eql(items);
                });

                it("should extract the links from the Link header", () => {
                    expect(successEvent.links.first).to.be(undefined);
                    expect(successEvent.links.prev).to.be(undefined);
                    expect(successEvent.links.next).to.equal(linkUri);
                    expect(successEvent.links.last).to.equal(linkUri);
                });
            });

            describe('and on failure', () => {
                let errorEvent;

                beforeEach( done => {
                    const errorPromise = reject(error);

                    axios.get = (q) => errorPromise;

                    NameSpace.GitHub.trigger(
                        new Request(query)
                    );

                    errorPromise.then(() => {
                        done();
                    }).catch(() => {
                        errorEvent = lastTriggeredOf(Failure);
                        done();
                    });
                });

                it("should respond with " + Failure.EventName, () => {
                    expect(errorEvent).not.to.be(null);
                });

                it("should return the error", () => {
                    expect(errorEvent.error).to.equal(error);
                });

                it("should return the original request", () => {
                    expect(errorEvent.request).to.equal(uri);
                });
            });
        });
    });
});

function aUser(login, avatar_url) {
    return new User({login, avatar_url});
}
