import { linkClick } from "../../routing";
import { renderTimes, selectedIndex, lector_uuid, renderOnline, isOnline } from "./renderer";
import { renderSuccess } from "../../pages/success/renderer";
import { successAfter } from "../../pages/success/afterRender";
import flatpickr from "flatpickr";
import dayjs from "dayjs";

const emailRegex = /\S+@\S+\.\S+/;
const phoneRegex1 = /^\d{9}$/;
const phoneRegex2 = /^\d{3} \d{3} \d{3}$/;
const phoneRegex3 = /^\+\d{3}\d{9}$/;
const phoneRegex4 = /^\+\d{3} \d{3} \d{3} \d{3}$/;

function bookAfter(bookingData, lectorData) {
    document.getElementById("backButton").addEventListener("click", () => {
        linkClick("/");
    });

    flatpickr("#bookDate",{
        inline: true,
        minDate: new Date().fp_incr(1),
        maxDate: new Date().fp_incr(30),
        defaultDate: new Date().fp_incr(1),
        locale: {
            firstDayOfWeek: 1,
            weekdays: {
                shorthand: ['NE', 'PO', 'ÚT', 'ST', 'ČV', 'PÁ', 'SO'],
                longhand: ['Neděle', 'Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota'],
            },
            months: {
                shorthand: ['Led', 'Úno', 'Bře', 'Dub', 'Kvě', 'Čvn', 'Čvc', 'Srp', 'Zář', 'Říj', 'Lis', 'Pro'],
                longhand: ['Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen', 'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'],
            },
        },
        onChange: function(selectedDates, dateStr, instance) {
            renderTimes();
        }
    });

    document.getElementById("loginButton").addEventListener("click", () => {

        let curDate = document.getElementById('bookDate').value;

        console.log(curDate);

        let startIndex = Math.min(...selectedIndex);

        let curTime = dayjs().hour(8).minute(0).second(0).day(dayjs(curDate).day()).month(dayjs(curDate).month()).year(dayjs(curDate).year()).millisecond(0).add(startIndex, 'hour').toISOString();

        console.log(curTime);

        let name = document.getElementById('bookName').value;
        let email = document.getElementById('bookEmail').value;
        let telephone = document.getElementById('bookPhone').value;
        let note = document.getElementById('bookNote').value;

        let tagElements = document.querySelectorAll(".tagSelect.active");

        let tags = [];
        tagElements.forEach(element => {
            tags.push(element.dataset.tag);
        });

        console.log(tags);

        // TODO: check validity of input

        if (name == "" || email == "" || telephone == "") {
            alert("Prosím vyplňte všechny údaje");
            return;
        } else if (!emailRegex.test(email)) {
            alert("Prosím zadejte platný email");
            return;
        } else if (!phoneRegex1.test(telephone) && !phoneRegex2.test(telephone) && !phoneRegex3.test(telephone) && !phoneRegex4.test(telephone)) {
            alert("Prosím zadejte platné telefonní číslo");
            return;
        } else if (selectedIndex == -1) {
            alert("Prosím vyberte čas");
        }

        fetch("/api/createBooking", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                lector_uuid: lector_uuid,
                start: curTime,
                length: selectedIndex.length,
                name: name,
                email: email,
                phone: telephone,
                note: note,
                tags: tags,
                online: isOnline
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);

                data.code ??= 200;

                if (data.code == 200) {
                    let successData = {
                        "uuid": data.uuid,
                        "start": curTime,
                        "lector_uuid": lector_uuid,
                        "name": name,
                        "email": email,
                        "phone": telephone,
                        "note": note
                    }
                    
                    document.getElementById("mainPage").innerHTML = renderSuccess();
                    successAfter(successData);
                    window.history.pushState({ "html": "placeholder", "pageTitle": "/success" }, "", "/success");

                } else {
                    alert("Rezervace se nezdařila");
                }

            });

    });

    renderTimes();

    lectorData.tags.forEach(element => {
        element = element.uuid
        element = document.querySelector(`[data-tag="${element}"]`);
        //console.log(element);
        element.addEventListener("click", () => {
            console.log(element);

            if (element.classList.contains("active")) {
                element.classList.remove("active");
            } else {
                element.classList.add("active");
            }
        });
    });

    renderOnline();

}

export { bookAfter };