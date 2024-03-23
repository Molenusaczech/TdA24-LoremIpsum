import whiteLogo from "../../img/LOGO_white.svg?url";
import pageTitleIcon from "../../img/pageTitleIcon_white.png";

import '@material/web/textfield/outlined-text-field';
import '@material/web/icon/icon';

import '@material/web/button/filled-button';

function renderAdmin(activities) {
    return /*html*/`
    <div class="pageTop">
      <div class=pageTopBack>
          <div class="pageTopRow">
              <img src="${whiteLogo}" alt="Logo" class="backButton" id="backButton">
              <h1>Projekt <span class="blueText">AMOS</span></h1>
              <div class="pageTopRowAdmin">
                  dadad
              </div>
          </div>
          <hr>
      </div>
  </div>

    <div class="aiPageContainer">

      <img src="${pageTitleIcon}" alt="IkonaTitle" class="mainTitleIcon">
      <h1 class="adminName">Admin</h1>
        
       ${activities.map(renderActivity).join("")}

    </div>
    `;
}

function verifyButton(activity) {
    if (activity.isVerified) {
        return ""
    }

    return /*html*/`
    <md-filled-button class="verifyButton" data-adminVerify="${activity.uuid}">Schválit</md-filled-button>
    `;
}

function renderActivity(activity) {
    console.log(activity);
    return /*html*/`
    <div class="activityCard" data-activityId="${activity.uuid}">
        <div class="activityCardTop">
            <h2>${activity.title}</h2>
            <div class="activityCardTopRight">
                <md-icon>schedule</md-icon>
                <p>${activity.lengthMin} - ${activity.lengthMax} minut</p>
            </div>
        </div>
        <div class="activityCardDesc">
            <p>${activity.description}</p>
        </div>

        ${verifyButton(activity)}

        <md-filled-button class="deleteButton" data-adminDelete="${activity.uuid}">Smazat</md-filled-button>
    </div>
    `;

}

export { renderAdmin };