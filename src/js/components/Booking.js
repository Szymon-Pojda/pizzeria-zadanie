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
    const generatedHTML = templates.bookingWidget(element);

    /* empty object thisBooking.dom */
    thisBooking.dom ={};

    /* add wrapper to thisBooking*/
    thisBooking.dom.wrapper = element;

    /* generated HTML to wrapper.innerHTML*/
    thisBooking.dom.wrapper.innerHTML = generatedHTML;

    thisBooking.dom.peopleAmount = element.querySelector(select.booking.peopleAmount);

    thisBooking.dom.hoursAmount = element.querySelector(select.booking.hoursAmount);
  }

  initWidget () {
    const thisBooking= this;

    thisBooking.peopleAmount = new AmountWidget(thisBooking.dom.peopleAmount);

    thisBooking.dom.peopleAmount.addEventListener('updated', function () {
    });

    thisBooking.hoursAmount = new AmountWidget(thisBooking.dom.hoursAmount);

    thisBooking.dom.peopleAmount.addEventListener('updated', function () {
    });
  }
}






export default Booking;