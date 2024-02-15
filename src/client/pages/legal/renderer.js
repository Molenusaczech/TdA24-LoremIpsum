import vlevoDole from "../../img/Tvar_vlevo_dole.png";
import vpravoDole from "../../img/Tvar_vpravo_dole.png";
import vpravoNahore from "../../img/Tvar_pravo_nahore.png";
import whiteLogo from "../../img/LOGO_white.svg?url";

function renderGDPR() {
  return /*html*/`
  <img src="${whiteLogo}" alt="Logo" class="backButton" id="backButton">

    <div class="mainPageContainer">
        <h1 class="pageTitle">GDPR</h1>
        
        <div class="gdprText">
        
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vehicula eu velit non fermentum. Etiam nec neque ac quam ullamcorper mattis. Nulla porttitor neque at rutrum tristique. Phasellus vel ante ac enim sodales facilisis. Nam viverra, urna non condimentum ornare, tellus urna cursus nulla, eget aliquet dui ipsum vitae metus. Vivamus sit amet leo ultrices, semper lectus eu, aliquet risus. Mauris semper dapibus fermentum. Donec tristique nunc nec leo accumsan, eget rutrum risus pellentesque. Curabitur lobortis libero turpis, eget ornare turpis ullamcorper in.

Cras euismod quam sit amet massa luctus rutrum. Quisque euismod augue lorem. Aenean non dictum ex. Sed non nunc sed purus auctor dignissim eget eget lacus. Morbi faucibus vehicula ligula non facilisis. Fusce arcu lacus, volutpat quis eleifend et, placerat non tortor. Ut hendrerit velit ac massa porta cursus. Praesent magna urna, scelerisque eu lacus lacinia, euismod vulputate est. Sed odio urna, iaculis sit amet dignissim id, tristique eu ligula.

Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus ullamcorper mauris sit amet feugiat pharetra. Maecenas nisl turpis, dignissim in porttitor ac, congue in libero. Maecenas in lacus vel mauris feugiat auctor. Curabitur sagittis posuere purus, id semper erat feugiat sit amet. Aliquam ornare facilisis sem id consectetur. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris dapibus at justo a imperdiet. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla tortor nunc, consequat in dapibus id, sodales vel augue. Nullam egestas lectus quis malesuada porttitor. Aenean quis sem id mauris vestibulum posuere.

Duis pharetra tempor volutpat. Vivamus vel leo at lorem eleifend sollicitudin ac non nunc. Vivamus ac lacus vitae lacus dictum vestibulum id luctus sapien. Aliquam et tempor est. Morbi tempor, neque non gravida posuere, massa enim finibus mi, at ullamcorper elit libero non massa. Sed sit amet turpis elementum, elementum urna pellentesque, dapibus elit. Duis aliquam lorem commodo, tempus metus vehicula, ullamcorper sem. Sed dignissim diam ac mauris rhoncus lacinia. Quisque commodo semper lorem, nec luctus enim convallis a. Nullam ultricies ipsum odio, sit amet volutpat mi vulputate fermentum.

        </div>

    </div>

    <img class="vlevoDole" src="${vlevoDole}">
    <img class="vpravoDole" src="${vpravoDole}">
    <img class="vpravoNahore" src="${vpravoNahore}">
    `;
}

function renderToS() {
  return /*html*/`
  <img src="${whiteLogo}" alt="Logo" class="backButton" id="backButton">

    <div class="mainPageContainer">
        <h1 class="pageTitle">ToS</h1>
        
        <div class="tosText">
        
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vehicula eu velit non fermentum. Etiam nec neque ac quam ullamcorper mattis. Nulla porttitor neque at rutrum tristique. Phasellus vel ante ac enim sodales facilisis. Nam viverra, urna non condimentum ornare, tellus urna cursus nulla, eget aliquet dui ipsum vitae metus. Vivamus sit amet leo ultrices, semper lectus eu, aliquet risus. Mauris semper dapibus fermentum. Donec tristique nunc nec leo accumsan, eget rutrum risus pellentesque. Curabitur lobortis libero turpis, eget ornare turpis ullamcorper in.

Cras euismod quam sit amet massa luctus rutrum. Quisque euismod augue lorem. Aenean non dictum ex. Sed non nunc sed purus auctor dignissim eget eget lacus. Morbi faucibus vehicula ligula non facilisis. Fusce arcu lacus, volutpat quis eleifend et, placerat non tortor. Ut hendrerit velit ac massa porta cursus. Praesent magna urna, scelerisque eu lacus lacinia, euismod vulputate est. Sed odio urna, iaculis sit amet dignissim id, tristique eu ligula.

Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus ullamcorper mauris sit amet feugiat pharetra. Maecenas nisl turpis, dignissim in porttitor ac, congue in libero. Maecenas in lacus vel mauris feugiat auctor. Curabitur sagittis posuere purus, id semper erat feugiat sit amet. Aliquam ornare facilisis sem id consectetur. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris dapibus at justo a imperdiet. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla tortor nunc, consequat in dapibus id, sodales vel augue. Nullam egestas lectus quis malesuada porttitor. Aenean quis sem id mauris vestibulum posuere.

Duis pharetra tempor volutpat. Vivamus vel leo at lorem eleifend sollicitudin ac non nunc. Vivamus ac lacus vitae lacus dictum vestibulum id luctus sapien. Aliquam et tempor est. Morbi tempor, neque non gravida posuere, massa enim finibus mi, at ullamcorper elit libero non massa. Sed sit amet turpis elementum, elementum urna pellentesque, dapibus elit. Duis aliquam lorem commodo, tempus metus vehicula, ullamcorper sem. Sed dignissim diam ac mauris rhoncus lacinia. Quisque commodo semper lorem, nec luctus enim convallis a. Nullam ultricies ipsum odio, sit amet volutpat mi vulputate fermentum.

        </div>

    </div>

    <img class="vlevoDole" src="${vlevoDole}">
    <img class="vpravoDole" src="${vpravoDole}">
    <img class="vpravoNahore" src="${vpravoNahore}">
    `;
}

export { renderGDPR, renderToS };