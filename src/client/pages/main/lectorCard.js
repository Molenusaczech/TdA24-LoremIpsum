import sanitizeHtml from "sanitize-html";
import { getLectorName } from "../../getLectorName";
import studiumBlue from "../../img/studium_blue.png";
import studiumWhite from "../../img/studium_white.png";
import { ifNull } from "../../ifNull";

function tagMetadata(tag) {
    //console.log(tag);
    return /*html */`
    data-tag-${sanitizeHtml(tag.name)}="${tag.uuid}"
    `;
}


function renderTag(tag) {
    //console.log(tag);
    return /*html */`
    <span class="lectorListTag" data-uuid="${tag.uuid}"> 
        ${sanitizeHtml(tag.name)} 
    </span>
    `;
}

function lectorMetadata(lector) {
    return /*html */`
    data-uuid="${lector.uuid}"  data-price_per_hour="${sanitizeHtml(lector.price_per_hour)}" ${lector.tags.map(tagMetadata).join("")}
    `;
}

function telephoneLink(phone) {
    if (phone) {
        return /*html */`
        <a href=""> 
        
            <span class="lectorContactOption">
                ${sanitizeHtml(phone)} 
            </span>
        
        </a>
        `;
    }
    return "";
}

function emailLink(email) {
    if (email) {
        return /*html */`
        <a href=""> 
        
            <span class="lectorContactOption">
                ${sanitizeHtml(email)} 
            </span>
        
        </a>
        `;
    }
    return "";
}

function lectorCard(lecturer) {
    //console.log(lector);
    return /*html */`
    <div class="lectorListLector" ${lectorMetadata(lecturer)}>
            <div class="flexbox">
    
                <div class="lectorLeftBox">
                    <img class="lectorListPicture" id="lectorPic" src="${sanitizeHtml(ifNull(lecturer.picture_url, "https://placehold.co/400x400/74C7D3/FFFFFF/png?text="+lecturer.first_name+"%5Cn"+lecturer.last_name))}" alt="Lecturer picture">
                </div>

                <div class="lectorSwitchBox">
                    ${getLectorName(lecturer)}
                </div>

                <div class="lectorSwitchBoxRight">
                    <img src="${studiumBlue}" alt="IkonaStudium" class="lectorIconTop">
                    <img src="${studiumWhite}" alt="IkonaStudium" class="lectorIconBottom">
                </div>

                <div class="lectorRightBox">
                    <hr>
                    <div class="lectorRightBoxInter">
                        <h2 class="lectorLocation"> ${sanitizeHtml(ifNull(lecturer.location, "⠀"))} </h2>
                        <span class="lectorListTag"> ${sanitizeHtml(ifNull(lecturer.price_per_hour, "0"))} Kč / hodina </span>
                    </div>
                    <h3 class="lectorClaim"> ${sanitizeHtml(ifNull(lecturer.claim), "⠀")} </h3>

                    <div class="lectorContact">   
                        ${lecturer.contact.telephone_numbers.map(telephoneLink).join("")}
                        ${lecturer.contact.emails.map(emailLink).join("")}
                    </div>

                    <div class="lectorBio"> ${sanitizeHtml(ifNull(lecturer.bio, "⠀"))} </div>
                </div>
            </div>
            <div class="lectorTags">
                ${lecturer.tags.map(renderTag).join("")}
            </div>
            <div class="moreInfo">
                Klikněte pro více informací
            </div>
        </div>
    `;
}

export { lectorCard };