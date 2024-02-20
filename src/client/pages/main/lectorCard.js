import sanitizeHtml from "sanitize-html";
import { getLectorName } from "../../getLectorName";
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

function lectorCard(lecturer) {
    //console.log(lector);
    return /*html */`
    <div class="lectorListLector" ${lectorMetadata(lecturer)}>
            <div class="flexbox">
    
                <div class="lectorLeftBox">
                    <img class="lectorListPicture" id="lectorPic" src="${sanitizeHtml(lecturer.picture_url)}" alt="Lecturer picture">
                </div>

                <div class="lectorSwitchBox">
                    ${getLectorName(lecturer)}
                </div>

                <div class="lectorRightBox">
                    <hr>
                    <h2 class="lectorLocation"> ${sanitizeHtml(lecturer.location)} </h2>
                    <h3 class="lectorClaim"> ${sanitizeHtml(lecturer.claim)} </h3>
                    <div class="lectorBio"> ${sanitizeHtml(lecturer.bio)} </div>
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