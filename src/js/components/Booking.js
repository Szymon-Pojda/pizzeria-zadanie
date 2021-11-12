import { templates,  } from '../settings.js';
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
  }
}






export default Booking;