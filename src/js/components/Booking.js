import { templates, select, } from '../settings.js';
import AmountWidget from './AmountWidget.js';


class Booking {
  constructor(element) {
    const thisBooking = this;

    thisBooking.render(element);
    thisBooking.initWidgets();
  }

  render(element){
    const thisBooking = this;

    /* generate HTML based on template */
    const generatedHTML = templates.bookingWidget();

    /* empty object thisBooking.dom */
    thisBooking.dom ={};

    /* add wrapper to thisBooking*/
    thisBooking.dom.wrapper = element;

    /* generated HTML to wrapper.innerHTML*/
    thisBooking.dom.wrapper.innerHTML = generatedHTML;

    thisBooking.dom.peopleAmount = element.querySelector(select.widgets.booking.peopleAmount);

    thisBooking.dom.hoursAmount = element.querySelector(select.widgets.booking.hoursAmount);

    //thisBooking.dom.datePicker = element.querySelector(select.widgets.datePicker.wrapper);

    //thisBooking.dom.hourPicker = element.querySelector(select.widgets.hourPicker.wrapper);
  }

  initWidgets () {
    const thisBooking= this;

    thisBooking.peopleAmount = new AmountWidget(thisBooking.dom.peopleAmount);

    thisBooking.dom.peopleAmount.addEventListener('updated', function () {
    });

    thisBooking.hoursAmount = new AmountWidget(thisBooking.dom.hoursAmount);

    thisBooking.dom.hoursAmount.addEventListener('updated', function () {
    });

    //hisBooking.datePicker = new AmountWidget(thisBooking.dom.datePicker);

    //thisBooking.dom.datePicker.addEventListener('updated', function () {
    // });

    // thisBooking.hourPicker = new AmountWidget(thisBooking.dom.hourPicker);

    //thisBooking.dom.hourPicker.addEventListener('updated', function () {
    //});
  }
}






export default Booking;