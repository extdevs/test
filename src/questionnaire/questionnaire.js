import './questionnaire.scss';
/**
 * Questionnaire page js here
 */
import contentLoaded from '../assets/js/vendor/contentloaded.js';
import multistep from '../assets/js/multi-step-form';

contentLoaded(window, function (e) {
    multistep();
});