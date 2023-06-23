import './sections.scss';
import accordion from "../assets/js/accordion";
import { initModals } from "../assets/js/modal";
import contentLoaded from "../assets/js/vendor/contentloaded";
import timer from '../assets/js/timer';
import rolodex from '../assets/js/rolodex';
import initTelInputs from '../assets/js/intl-tel-input.js'

contentLoaded(window, () => {
    initModals();
    accordion();
    timer();
    rolodex();
    initTelInputs();
})