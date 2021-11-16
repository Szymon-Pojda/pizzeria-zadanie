import { templates, select, settings, } from '../settings.js';
import utils from '../utils.js';
import AmountWidget from './AmountWidget.js';
import DatePicker from './DatePicker.js';
import HourPicker from './HourPicker.js';

class Booking {
  constructor(element) {
    const thisBooking = this;

    thisBooking.render(element);
    thisBooking.initWidgets();
    thisBooking.getData();
  }

  getData() {
    const thisBooking = this;

    const startDateParam = settings.db.dateStartParamKey + '=' + utils.dateToStr(thisBooking.datePicker.minDate);
    const endDateParam = settings.db.dateEndParamKey + '=' + utils.dateToStr(thisBooking.datePicker.maxDate);


    const params = {
      booking: [
        startDateParam,
        endDateParam,      
      ],
      eventsCurrent:[
        settings.db.notRepeatParam,
        startDateParam,
        endDateParam,     
      ],
      eventsRepeat:[
        settings.db.repeatParam,
        endDateParam,     
      ],
    };

    const urls = {
      booking:        settings.db.url + '/' + settings.db.booking 
                                      + '?' + params.booking.join('&'),
      eventsCurrent:  settings.db.url + '/' + settings.db.event   
                                      + '?' + params.eventsCurrent.join('&'),
      eventsRepeat:   settings.db.url + '/' + settings.db.event   
                                      + '?' + params.eventsRepeat.join('&'),



    };

    Promise.all ([
      fetch(urls.booking),
      fetch(urls.eventsCurrent),
      fetch(urls.eventsRepeat),
    ])
      .then(function(allResponses){
        const bookingsResponse =allResponses[0];
        const eventsCurrentResponse =allResponses[1];
        const eventsRepeatResponse =allResponses[2];
        return Promise.all([
          bookingsResponse.json(),
          eventsCurrentResponse.json(),
          eventsRepeatResponse.json(),
        ]);
      })
      .then(function([bookings, eventsCurrent, eventsRepeat]){
        console.log(bookings);
        console.log(eventsCurrent);
        console.log(eventsRepeat);
      });
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

    thisBooking.dom.datePickerWrapper = element.querySelector(select.widgets.datePicker);

    thisBooking.dom.hourPickerWrapper = element.querySelector(select.widgets.hourPicker);
  }

  initWidgets () {
    const thisBooking= this;

    thisBooking.peopleAmount = new AmountWidget(thisBooking.dom.peopleAmount);

    thisBooking.dom.peopleAmount.addEventListener('updated', function () {
    });

    thisBooking.hoursAmount = new AmountWidget(thisBooking.dom.hoursAmount);

    thisBooking.dom.hoursAmount.addEventListener('updated', function () {
    });

    thisBooking.datePicker = new DatePicker(thisBooking.dom.datePicker);

    thisBooking.dom.datePicker.addEventListener('updated', function () {
    });

    thisBooking.hourPicker = new HourPicker(thisBooking.dom.hourPicker);

    thisBooking.dom.hourPicker.addEventListener('updated', function () {
    });
  }
}






export default Booking;