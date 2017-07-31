import Flight from 'flight';
import NameSpace from 'namespace';
import Events from 'events';
import jquery from 'jquery';
const $ = jquery;

import usersTemplate from './pages/users.html';
import repositoriesTemplate from './pages/repositories.html';

const ENTER = 13;

class FlowManagerComponent extends Flight.UIComponent {

    init() {
        this.rootUrl = document.location.toString().split('#')[0];
    }

    listen() {
        this.on(NameSpace.System).listen(
          Flight.System.Ready, event => this.setup(),
        );
        this.ui(this.view).listen(
            Events.Flow.ShowStep, event => this.moveTo(event.step),
        );

        window.onpopstate = (event) => {
            this.showStep(event.state || this.steps[0]);
        };
    }

    showStep(step) {
        if(this.view.firstElementChild) {
            this.view.firstElementChild.remove();
        }
        this.view.append(this.pages[step]);
    }

    setup() {
        this.showStep(this.steps[0]);
    }

    moveTo(step) {
        this.showStep(step);
        history.pushState(step, step, `${this.rootUrl}#${step}`);
    }

    addStep(stepDefinition) {
        (this.pages || (this.pages = {}));
        (this.steps || (this.steps = [])).push(stepDefinition.name);

        const root = document.createElement('flow-step');
        root.innerHTML = stepDefinition.template;

        this.pages[stepDefinition.name] = root;

        if(stepDefinition.components) {
            for(let component of stepDefinition.components) {
                component.populate(root);
            }
        }

        if(stepDefinition.events) {
            for(let StepEvent of stepDefinition.events) {
                this.on(stepDefinition.nameSpace).listen(
                    StepEvent, event => this.moveTo(stepDefinition.name),
                );
            }
        }

        return this;
    }
}

export default FlowManagerComponent;
