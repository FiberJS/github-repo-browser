import { lastTriggeredOf } from 'fiber/test';
import GitHubComponent, { GITHUB_SEARCH_URL } from 'components/data/github/github.js';
import NameSpace from 'namespace';
import Events from 'events';
import User from 'domain/user';
import jquery from 'jquery';

const resolve = (...params) => jquery.Deferred().resolve(...params).promise();
const reject = (...params) => jquery.Deferred().reject(...params).promise();

describe('GitHubComponent', () => {
    const component = GitHubComponent.attachTo(NameSpace.GitHub);

    describe('Listens for UserQuery:Request', () => {

        describe('and on success', () => {
            const link = 'https://api.github.com/search/users?q=test&page=2';
            const linkHeader = `<${link}>; rel="next", <${link}>; rel="last"`;
            const query = 'test';
            const items = [1, 2, 3];
            let responseEvent;

            beforeEach(()=>{
                jquery.getJSON = (q) => resolve(
                    {items: items},
                    200,
                    { getResponseHeader: () => linkHeader }
                );

                NameSpace.GitHub.trigger(
                    new Events.UserQuery.Request(query)
                );

                responseEvent = lastTriggeredOf(Events.UserQuery.Response);
            });

            it("should respond with UserQuery:Response", () => {
                expect(responseEvent).not.to.be(null);
            });

            it("should return all items", () => {
                expect(responseEvent.items.length).to.equal(items.length);
            });

            it("should extract the links from the Link header", () => {
                expect(responseEvent.links.first).to.be(undefined);
                expect(responseEvent.links.prev).to.be(undefined);
                expect(responseEvent.links.next).to.equal(link);
                expect(responseEvent.links.last).to.equal(link);
            });
        });

        describe('and on error', () => {
            const query = 'test';
            const error = 'error';
            let errorEvent;

            beforeEach(()=>{
                jquery.getJSON = (q) => reject(error);

                NameSpace.GitHub.trigger(
                    new Events.UserQuery.Request(query)
                );

                errorEvent = lastTriggeredOf(Events.UserQuery.Error);
            });

            it("should respond with UserQuery:Error", () => {
                expect(errorEvent).not.to.be(null);
            });

            it("should return the error", () => {
                expect(errorEvent.error).to.equal(error);
            });

            it("should return the original request", () => {
                expect(errorEvent.request).to.equal(GITHUB_SEARCH_URL(query));
            });
        });
    });

    describe('Listens for Repositories:Request', () => {
        it("should respond with Repositories:Response on success", () => {
            const user = aUser('test');
            const items = [1, 2, 3, 4];

            jquery.getJSON = (q) => resolve(items, 200, { getResponseHeader: ()=>{} });

            NameSpace.GitHub.trigger(
                new Events.Repositories.Request(user)
            );

            const lastTriggered = lastTriggeredOf(Events.Repositories.Response);
            expect(lastTriggered).not.to.be(null);
            expect(lastTriggered.items.length).to.equal(items.length);
        });

        it("should respond with Repositories:Error on failure", () => {
            const user = aUser('test');
            const error = 'some error';

            jquery.getJSON = (q) => reject(error);

            NameSpace.GitHub.trigger(
                new Events.Repositories.Request(user)
            );

            const lastTriggered = lastTriggeredOf(Events.Repositories.Error);
            expect(lastTriggered).not.to.be(null);
            expect(lastTriggered.error).to.equal(error);
        });
    });
});

function aUser(login, avatar_url) {
    return new User({login, avatar_url});
}
