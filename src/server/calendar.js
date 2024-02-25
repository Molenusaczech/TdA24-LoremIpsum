import ical, { ICalCalendarMethod } from 'ical-generator';
import { getMyBookings } from './dbHandler.js';
import dayjs from 'dayjs';

function generateDescription(booking) {
    return `
    Email: ${booking.email}, Telefon: ${booking.phone}, 
    ${booking.note}, ${booking.Tags.map(tag => tag.name).join(', ')}
    `;
}

async function generateCalendar(token) {

    const data = await getMyBookings(token);

    //console.log(data);

    const bookings = data.bookings;
    const lector = data.lector;

    const calendar = ical({ name: 'Teacher digital Agency' });
    // A method is required for outlook to display event as an invitation
    calendar.method(ICalCalendarMethod.REQUEST);

    /*const startTime = new Date();
    const endTime = new Date();
    endTime.setHours(startTime.getHours() + 1);
    calendar.createEvent({
        start: startTime,
        end: endTime,
        summary: 'Example Event',
        description: 'It works ;)',
        location: 'my room',
        url: 'http://sebbo.net/'
    });*/

    for (let i = 0; i < bookings.length; i++) {
        const booking = bookings[i];
        const startTime = dayjs(booking.start);
        const endTime = dayjs(booking.start).add(booking.length, 'hour');
        calendar.createEvent({
            start: startTime.toDate(),
            end: endTime.toDate(),
            summary: "Výuka - " + booking.name,
            description: generateDescription(booking),
            location: booking.isOnline ? 'Online' : lector.location
        });
    }

    return calendar.toString();
}

export default generateCalendar;