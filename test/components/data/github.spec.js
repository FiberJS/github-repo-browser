import GitHubComponent from 'components/data/github';
import NameSpace from 'namespace';
import Flight from 'flight';
import helper from 'flight/test';
import Events from 'events';
import jquery from 'jquery';

const resolve = (stuff) => jquery.Deferred().resolve(stuff).promise();
const reject = (stuff) => jquery.Deferred().reject(stuff).promise();

describe('GitHubComponent', () => {
    const component = GitHubComponent.attachTo(NameSpace.GitHub);

    describe('Listens for UserQuery:Request', () => {
        it("should respond with UserQuery:Response on success", () => {
            const query = 'test';
            const items = [1, 2, 3];

            jquery.getJSON = (q) => resolve({items: items});

            NameSpace.GitHub.trigger(
                new Events.UserQuery.Request(query)
            );

            const lastTriggered = Events.UserQuery.Response.last();
            expect(lastTriggered).not.to.be(null);
            expect(lastTriggered.items.length).to.equal(items.length);
        });

        it("should respond with UserQuery:Error on error", () => {
            const query = 'test';
            const error = 'error';

            jquery.getJSON = (q) => reject(error);

            NameSpace.GitHub.trigger(
                new Events.UserQuery.Request(query)
            );

            const lastTriggered = Events.UserQuery.Error.last();
            expect(lastTriggered).not.to.be(null);
            expect(lastTriggered.error).to.equal(error);
            expect(lastTriggered.request).to.equal(query);
        });

    });

    describe('Listens for Repositories:Request', () => {
        it("should respond with Repositories:Response on success", () => {
            const user = aUser('test');
            const items = [1, 2, 3, 4];

            jquery.getJSON = (q) => resolve(items);

            NameSpace.GitHub.trigger(
                new Events.Repositories.Request(user)
            );

            const lastTriggered = Events.Repositories.Response.last();
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

            const lastTriggered = Events.Repositories.Error.last();
            expect(lastTriggered).not.to.be(null);
            expect(lastTriggered.error).to.equal(error);
            expect(lastTriggered.request).to.equal(user);
        });
    });
});

function aUser(login) {
    return {
        login: login
    };
}
