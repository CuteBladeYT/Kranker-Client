//================================//
// Import FileSystem module
const fs = require("fs");

// Initialize settings
let settings = {
  "start": {
      "fullscreen": true,
      "maximized": false,
      "window": [800, 600]
  },
  "customs": {
      "load_scripts": true,
      "load_styles": true
  },
  "client_menu": {
      "show_keybind": "F3"
  }
}


//================================//
// Create the client's menu
function createClientMenu() {
  let id_base = "KRANKER_CLIENT_MENU";
  // Create container
  document.body.innerHTML += `
  <div id="${id_base}_BGDIM">
    <div id="${id_base}">

      <div class="${id_base}_tabs">
        <button id="KCM_tweaks">Tweaks</button>
        <button id="KCM_scripts">Userscripts</button>
        <button id="KCM_styles">Custom CSS</button>
      </div>

      <div class="${id_base}_content">
        <div class="content" id="${id_base}_content_tweaks">

          <div class="tweak_menu_keybind">
            <p>Type in the key you want to open the menu with</p>
            <input type="text" placeholder="Example: F3" value="${settings.client_menu.show_keybind}" class="client_menu/show_keybind">          
          </div>

          <div class="tweak_enable_scripts">
            <p>Enable Userscripts</p>
            <input type="checkbox" checked="${settings.customs.load_scripts}" class="customs/load_scripts">
          </div>

          <div class="tweak_enable_styles">
            <p>Enable Custom CSS</p>
            <input type="checkbox" checked="${settings.customs.load_styles}" class="customs/load_styles">
          </div>

          <div class="tweak_save">
            <p></p>
            <input type="submit" value="Save all tweaks" title="Tweaks will save automatically after closing the menu.\nStill there's an option to save them manually.">
          </div>
          
        </div>

        <div class="content" id="${id_base}_content_scripts">
          
        </div>

        <div class="content" id="${id_base}_content_styles">
          
        </div>
      </div>
    </div>
  </div>
  `;

  // Get the menu
  let menu = document.querySelector(`div#${id_base}`);

  // Get the menu background
  let bgDim = document.querySelector(`div#${id_base}_BGDIM`);

  // Get menu content
  let content = document.querySelector(`div.${id_base}_content`);

  // Make the tweaks save
  content.querySelector(`#${menu.id}_content_tweaks > .tweak_save > input`).onclick = () => {
    let tweaks = content.querySelector(`#${menu.id}_content_tweaks`);
    let scripts = content.querySelector(`#${menu.id}_content_scripts`);
    let styles = content.querySelector(`#${menu.id}_content_styles`);

    let s = JSON.parse(JSON.stringify(settings));

    for (let child_i in tweaks.childNodes -1) {
      let child = tweaks.children[child_i];

      let inputElement = child.children[1];

      let value = inputElement.type == "checkbox" ? inputElement.value : inputElement.checked;

      let option = {
        "path": inputElement.className.split("/"),
        "value": value
      };

      console.log(option);
      
      s[option.path[0]][option.path[1]] = option.value;
    };

    console.log(s);
  };
  
  // Open the menu on keybind
  document.addEventListener("keyup", (e) => {
    if (e.key == settings.client_menu.show_keybind) {
      bgDim.style.display = "unset";
    };
  });

  // Close the menu when clicked outside it's container
  bgDim.onclick = (e) => {
    if (e.target == bgDim)
      bgDim.style.display = "none";
  };

  // Create the menu stylesheet
  let menuStylesheet = document.createElement("style");
  menuStylesheet.id = id_base + "_STYLESHEET";
  menuStylesheet.textContent = `
    div#${bgDim.id} {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      margin: 0;
      padding: 0;
      background: rgba(0, 0, 0, 0.4);
      z-index: 2147483647;
    }

    div#${menu.id} {
      position: absolute;
      top: 32px;
      left: calc(50% - 256px);
      width: 512px;
      height: calc(100% - 64px);
      background: #11111b;
      color: #cdd6f4;
      border: 3px #a6e3a1 solid;
    }

    div#${menu.id} > div.${menu.id}_tabs {
      position: asbolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 32px;
      border-bottom: inherit;
    }

    div#${menu.id} > div.${menu.id}_tabs > button {
      position: relative;
      top: 0;
      left: 0;
      height: calc(100% + 3px);
      margin: 0;
      background: transparent;
      border: none;
      border-bottom: 3px transparent solid;
      color: #cdd6f4;
      cursor: pointer;
      font-family: gamefont;
      font-size: 13px;
    }
    div#${menu.id} > div.${menu.id}_tabs > button:hover {
      border-bottom: 3px #fab387 solid;
    }
    div#${menu.id} > div.${menu.id}_tabs > button:active {
      border-bottom: 3px #cba6f7 solid;
    }
    div#${menu.id} > div.${menu.id}_content {
      position: absolute;
      top: calc(32px + 3px);
      left: 0;
      margin: 0;
      width: 100%;
      height: calc(100% - 32px - 3px);
      overflow: hidden scroll;
    }
    div#${menu.id} > div.${menu.id}_content > div.content {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
    }
    div#${menu.id} > div.${menu.id}_content > div.content > div {
      position: relative;
      top: 0;
      left: 0;
      margin: 0;
      margin-bottom: 8px;
      width: 100%;
    }
    div#${menu.id} > div.${menu.id}_content > div.content > div > * {
      position: relative;
      top: 0;
      left: 0;
      margin: 0;
      width: 100%;
      font-family: gamefont;
      font-size: 11px;
    }
    div#${menu.id} > div.${menu.id}_content > div.content > div > p {
      text-align: center;
    }
    div#${menu.id} > div.${menu.id}_content > div.content > div > input {
      background: #1e1e2e;
      border: 1px #a6e3a1 solid;
      border-left: none;
      border-right: none;
      color: #cdd6f4;
    }
    div#${menu.id} > div.${menu.id}_content > div.content > div > input[type*="submit"] {
      cursor: pointer;
    }
    div#${menu.id} > div.${menu.id}_content > div.content > div > input[type*="submit"]:hover {
      background: #181825;
      border-color: #fab387;
      color: #fab387;
    }
    div#${menu.id} > div.${menu.id}_content > div.content > div > input[type*="submit"]:active {
      background: #313244;
      color: #cba6f7;
      border-color: #cba6f7;
    }
  `;

  // Append the menu to the document's body
  document.body.appendChild(bgDim);
  // Append the stylesheet to document
  document.head.appendChild(menuStylesheet);
};

//================================//
window.addEventListener("DOMContentLoaded", () => {
  // Load settings
  settings = JSON.parse(fs.readFileSync("./settings.json", "utf-8"));

  //================================//
  // Call the menu creation function
  // createClientMenu();

  //================================//
  // Append stylesheets
  // Check if styles are enabled
  // if (settings.customs.load_styles == true)
  fs.readdir("./styles/", (err, files) => {
    // Stop when error
    if (err) return;

    // Iterate through every file
    for(let file_i in files) {
      let file = files[file_i];
      // Check if it's a .css file
      if (file.endsWith(".css")) {
        // Create the element and append it's class
        let style = document.createElement("style");
        style.className = "KRANKER_CLIENT_STYLESHEET";
        // Get the file content and append it to the style
        let fileContent = fs.readFileSync(`./styles/${file}`, "utf-8");
        style.textContent = fileContent;
        // Append the style to the document
        document.head.appendChild(style);

        console.log(`Loaded stylesheet "${file}"`);
      };
    };
  });

  // Append userscripts
  // Check if scripts are enabled
  // if (settings.customs.load_scripts == true)
  fs.readdir("./scripts/", (err, files) => {
    // Stop when error
    if (err) return;

    // Iterate through every file
    for(let file_i in files) {
      let file = files[file_i];
      // Check if it's a .js file
      if (file.endsWith(".js")) {
        // Create the element and append it's class
        let script = document.createElement("script");
        script.className = "KRANKER_CLIENT_USERSCRIPT";
        // Get the file content and append it to the script
        let fileContent = fs.readFileSync(`./scripts/${file}`, "utf-8");
        script.textContent = fileContent;
        // Append the script to the document
        document.head.appendChild(script);

        console.log(`Loaded userscript "${file}"`);
      };
    };
  });
});


//================================//
// Replace content of elements with id 
// of chrome, node and electron version
// with actual versions.
window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  };

  for (const type of ["chrome", "node", "electron"]) {
    replaceText(`${type}-version`, process.versions[type])
  };
});