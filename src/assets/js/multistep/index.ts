import { Step } from './inc/step';

/**
 * @class MultiStep
 * @extends HTMLElement
 * @description This is a multi-step form, it is a wrapper for a set of steps. 
 * @example <form is="muti-step"></form>
 * 
 * @property counter {HTMLElement} - The counter element, this is the element that displays the current step
 * @property activeStep {Step} - The active step, this is the step that is currently active
 */
export class MultiStep extends HTMLFormElement {
  activeStep: Step;
  counter: HTMLElement;

  constructor() {
    super();
    this.init();
  }

  set returnStep(index: number) {
    this.setAttribute('return', String(index));
  }

  get returnStep(): any {
    return this.getAttribute('return');
  }


  set steps(steps : NodeListOf<Step>) {
    let i = 0;
    steps.forEach(step => {
       step.index = i;
       if(step.active) {
         this.activeStep = step;
       }
       i++;
     });    
 }

 get steps() : NodeListOf<Step> {
   return this.querySelectorAll('step-item');
 }

 get event() : Event {
   return new CustomEvent('stepChange', { bubbles: true, detail: { step: this.activeStep } });
 }


  init() {
    this.steps = this.querySelectorAll('step-item');
    this.setActive();
    this.listen();
    this.counter = this.querySelector('.counter');
    this.outputCounter();
  }


  setClasses(index: number) {
    if (this.activeStep) {
      this.classList.remove('forward');
      this.classList.remove('backward');

      if (index > this.activeStep.index) {
        this.classList.add('forward');
      }
      if (index < this.activeStep.index) {
        this.classList.add('backward');
      }
    }
  }

  updateCounter() {
    let counter = this.counter.querySelectorAll('li');
    counter.forEach(item => {
      item.classList.remove('active');
    });
    counter[this.activeStep.index].classList.add('active');
  }

  outputCounter() {
    if (this.counter) {
      for (let i = 0; i < this.steps.length; i++) {
        let num = document.createElement('li');
        if (i == this.activeStep.index) {
          num.classList.add('active');
        }
        this.counter.appendChild(num);
      }
    }
  }

  getSkips() {
    let num = -1;
    if (this.activeStep.skipQueue) {
      for (let key in this.activeStep.skipQueue) {
        if (this.activeStep.skipQueue[key] > -1) {
          num = this.activeStep.skipQueue[key];
        }
      }
    }
    return num;
  }

  onsubmit = (E : Event) => {
    this.activeStep.forceValidation();
    if(this.activeStep.valid != 'true') {
      E.preventDefault();
    }
  }

  next() {
    this.returnStep = null;
    // If the step is valid, move to the next step
    if (JSON.parse(this.activeStep.valid) != false && this.activeStep.index + 1 < this.steps.length) {
      this.activeStep.active = false;
      let index = this.activeStep.index;
      let skipTo = this.getSkips();
      let nextIndex = 0;

      if (skipTo > -1) {
        nextIndex = skipTo;
        this.returnStep = index;
      } else {
        nextIndex = index + 1;
      }

      this.setActive(nextIndex);
      this.updateCounter();
    } else {
      this.activeStep.showErrors();
    }
  }
  prev() {
    if (this.activeStep.index - 1 >= 0) {
      this.activeStep.active = false;
      if (this.returnStep !== 'null') {
        this.setActive(this.returnStep);
      } else {
        this.setActive(this.activeStep.index - 1);
      }
      this.activeStep.forceValidation();
      this.activeStep.listen();
      this.updateCounter();
    }
  }
  setActive(index: number = 0) {
    this.setClasses(index);
    this.steps[index].active = true;
    this.activeStep = this.steps[index];
    if(this.event) {
      this.dispatchEvent(this.event);
    }
  }

  listen() {
    let self = this;
    this.querySelectorAll('[data-next]').forEach(element => {
      element.addEventListener('click', e => {
        self.next();
      });
    });
    this.querySelectorAll('[data-prev]').forEach(element => {
      element.addEventListener('click', e => {
        self.prev();
      });
    });

    this.addEventListener('keydown', function (event) {
      // Number 13 is the "Enter" key on the keyboard
      if (event.keyCode === 13) {
        event.preventDefault();
        self.next();
      }
    });
  }
}
