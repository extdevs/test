export default function date() {
    let months    = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    let now       = new Date();
    let thisMonth = months[now.getMonth()]; // getMonth method returns the month of the date (0-January :: 11-December)
    let thisYear = now.getFullYear();

    let monthEls = document.querySelectorAll('.dyn-month');
    let yearEls = document.querySelectorAll('.dyn-year');

    monthEls.forEach(function(el, index){
        el.textContent = thisMonth;
    });

    yearEls.forEach(function(el, index){
        el.textContent = thisYear;
    });
}
