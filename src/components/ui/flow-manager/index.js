import Flight from 'flight';
import NameSpace from 'namespace';
import Events from 'events';
import jquery from 'jquery';
const $ = jquery;

const ENTER = 13;

class FlowManagerComponent extends Flight.UIComponent {

    init() {
        this.steps = [
            'user',
            'repository'
        ];
        this.rootUrl = document.location.toString().split('#')[0];
    }

    listen() {
        this.on(NameSpace.System).listen(
          Flight.System.Ready, event => this.setup(),
        );
        this.on(NameSpace.GitHub).listen(
            Events.User.Chosen, event => this.moveTo('repository'),
        );
        this.ui(this.view).listen(
            Events.Flow.ShowStep, event => this.moveTo(event.step),
        );
        window.onpopstate = (event) => this.moveTo(event.state);
    }

    hideSteps() {
        $('flow-step', this.view).removeClass('active');
    }

    showStep(step) {
        history.pushState(step, step, `${this.rootUrl}#${step}`);
        $(`flow-step#step-${step}`, this.view).addClass('active');
    }

    setup() {
        this.hideSteps();
        this.showStep(this.steps[0]);
    }

    moveTo(step) {
        this.hideSteps();
        this.showStep(step);
    }
}

export default FlowManagerComponent;
