(function () {

    function getScriptInstanceId(widgetKey) {

        // Ensure that our 'staWidgets' variable exists on the window.
        window.staWidgets = window.staWidgets || {};

        // If we haven't recorded anything for this widget type, add the widget type as a key under our widget variable and set the count to 1.
        // If we have started recording this widget type already, increment the count and then return it.
        return window.staWidgets[widgetKey] === undefined
            ? window.staWidgets[widgetKey] = 1
            : ++window.staWidgets[widgetKey];
    }

    // Submit Size search to T&S site.
    function tsMultiSSPopSize() {
        window.open("https://" + tsControl.site + "/TyreSearch/Results?Width=" + widthEle.value + "&Profile=" + profileEle.value + "&Rim=" + rimEle.value + "&Speed=" + speedEle.value + "&utm_source=widget&utm_medium=size", "_blank");
    }

    // Submit VRN search to T&S site.
    function tsMultiSSPopVrn() {
        if (vrnEle.value !== '') {
            window.open("https://" + tsControl.site + "/VRNSearch/Details?VRN=" + vrnEle.value + "&utm_source=widget&utm_medium=vrn", "_blank");
        }
    }

    // Prevent parent form elements from being submitted when the return key is pressed.
    function preventFormDefault(e) {
        if (e.keyCode === 13) {
            if (e.preventDefault)
                e.preventDefault();
            else
                e.returnValue = false;

            tsMultiSSPopVrn();
        }
    }

    // Polyfills adding an event to an element so that it works in IE8.
    function addEventListener(event, element, handler) {
        if (element.addEventListener)
            element.addEventListener(event, handler, false);		// Normality
        else if (element.attachEvent)
            element.attachEvent('on' + event, handler); 			// IE8
    }

    // Our config for the widget.
    var widgetKey = 'tsMultiSS',
        widthEle,
        profileEle,
        rimEle,
        speedEle,
        vrnEle,
        sizeSubmitBtnEle,
        vrnSubmitBtnEle,
        widths = [135, 145, 155, 165, 175, 185, 195, 205, 215, 225, 235, 245, 255, 265, 275, 285, 295, 305, 315, 325, 335, 345, 355],
        profiles = [25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85],
        rims = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
        speeds = ['C', 'G', 'H', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z', 'ZR'],
        dropdowns = [
            { label: 'Width', name: 'Width', options: widths },
            { label: 'Profile', name: 'Profile', options: profiles },
            { label: 'Rim size', name: 'Rim', options: rims },
            { label: 'Speed', name: 'Speed', options: speeds }
        ],
        scriptInstanceId = getScriptInstanceId(widgetKey),
        baseStyles =
            "#ts-fade{ display: none; background: url(//assets.tyresandservice.co.uk/images/tyreclick/fade-bg.png) repeat; position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 9998; }\r\n" +
            "#ts-combo-ss{ -moz-border-radius: 4px; -webkit-border-radius: 4px; -o-border-radius: 4px; border-radius: 4px; background-color: #FFF; max-width: 430px; width: 100%; padding:10px; overflow:hidden; z-index: 9999; }\r\n" +
            "#ts-combo-ss * { font-family: Arial, sans serif; -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; }\r\n" +
            "#ts-combo-ss h2{ color: #000; font-size: 24px; font-style: italic; text-transform: initial; margin: 0; line-height: normal; font-weight: bold; }\r\n" +
            "#ts-combo-ss img{ display:block; margin: 0 auto; max-width: 100%; }\r\n" +
            "#ts-combo-ss label{ font-size: 13px; font-weight: bold; }\r\n" +
            "#ts-combo-ss .ts-combo-ss-head{ margin-bottom: 10px; }\r\n" +
            "#ts-combo-ss .ts-combo-ss-size, #ts-combo-ss .ts-combo-ss-vrn{ float:left; width:50%; *width:45%; }\r\n" +
            "#ts-combo-ss .ts-combo-ss-size{ padding-right: 5%; border-right: 1px solid grey; *margin-right:5%; }\r\n" +
            "#ts-combo-ss .ts-combo-ss-vrn{ padding-left: 5%; *padding-left:0; }\r\n" +
            "#ts-combo-ss .ts-combo-ss-vrn input[type=text]{ -moz-border-radius: 4px; -webkit-border-radius: 4px; -o-border-radius: 4px; border-radius: 4px; border:none; height: 45px; line-height: 45px; padding-left: 40px; font-size: 25px; font-weight: bold; background: #FDF059 url(//assets.tyresandservice.co.uk/images/tyreclick/UK-Reg.png) no-repeat left center; text-transform: uppercase; *width:230px; }\r\n" +
            "#ts-combo-ss input, #ts-combo-ss select{ display:block; height:25px; line-height:25px; margin-bottom: 10px; padding:0; width:100%; }\r\n" +
            "#ts-combo-ss input[type=button]{ -webkit-appearance: none; -moz-appearance: none; appearance: none; margin: 0; line-height: normal; background-color: #4D90FE; border: none; color: #FFF; font-weight: normal; font-size: 14px; -moz-border-radius: 4px; -webkit-border-radius: 4px; -o-border-radius: 4px; border-radius: 4px; font-weight: bold; cursor: pointer; }\r\n" +
            "#ts-combo-ss input[type=button]:hover{ text-decoration: underline; }\r\n" +
            "#ts-combo-ss .pop-close{ position: absolute; top: -5px; right: -5px; text-align: center; color: #FFF; font-weight: bold; font-size: 1.3em; width: 40px; height: 35px; *height: 25px; padding: 6px 0; background-color: blue; text-decoration: none; border-radius: 0 0 0 5px; }\r\n" +
            "#ts-combo-ss p{ font-size: 12px; }\r\n" +
            "#ts-combo-ss p > a{ color: #000; font-weight: bold; word-break: break-word;  }\r\n" +
            "@media only screen and (max-width:479px){\r\n" +
                "#ts-combo-ss{ top: 10px; margin:0 10px; width: auto; }\r\n" +
                "#ts-combo-ss .ts-combo-ss-head h2{ font-size: 22px; padding:0 35px 0 10px; }\r\n" +
                "#ts-combo-ss .ts-combo-ss-size{ border-right: none; }\r\n" +
                "#ts-combo-ss .ts-combo-ss-size, #ts-combo-ss .ts-combo-ss-vrn{ float:none; width:100%; padding:10px; }\r\n" +
                "#ts-combo-ss input[type=button]{ height:30px; }\r\n" +
            "}";

    // Create the size search wrapper.
    var comboSizeWrapper = document.createElement('div');
    comboSizeWrapper.className = 'ts-combo-ss-size';

    // Loop over each dropdown we need tro generate.
    for (i = 0; i < dropdowns.length; i++) {

        // Retrieve the dropdown object that we're creating an element for.
        var dropdown = dropdowns[i];

        // Create the outer-most dropdown wrapper.
        var sizeDropdownWrapper = document.createElement('div');

        // Create the dropdown label.
        var sizeDropdownLabel = document.createElement('label');
        sizeDropdownLabel.innerText = dropdown.label + ':';
        sizeDropdownLabel.htmlFor = dropdown.name;

        // Create the dropdown itself.
        var sizeDropdown = document.createElement('select');
        sizeDropdown.id = dropdown.name;
        sizeDropdown.name = dropdown.name;

        // If the dropdown is for 'Speed', add a default 'Any' option.
        if (dropdown.name === 'Speed') {

            // Create the option element.
            var defaultDropdownOption = document.createElement('option');
            defaultDropdownOption.value = '';
            defaultDropdownOption.innerText = 'Any';

            // Add the option to the dropdown.
            sizeDropdown.appendChild(defaultDropdownOption);

        }

        // Loop over and create each option.
        for (x = 0; x < dropdown.options.length; x++) {

            // Cache the current dropdown option.
            var dropdownOption = dropdown.options[x];

            // Create the option element.
            var sizeDropdownOption = document.createElement('option');
            sizeDropdownOption.value = dropdownOption;
            sizeDropdownOption.innerText = dropdownOption;

            // Add the option to the dropdown.
            sizeDropdown.appendChild(sizeDropdownOption);

        }

        // Stack the elements for this dropdown.
        sizeDropdownWrapper.appendChild(sizeDropdownLabel);
        sizeDropdownWrapper.appendChild(sizeDropdown);
        comboSizeWrapper.appendChild(sizeDropdownWrapper);

    }

    // Create the size search button wrapper.
    var comboSizeBtnWrapper = document.createElement('div');

    // Create the size search button.
    var comboSizeBtn = document.createElement('input');
    comboSizeBtn.type = 'button';
    comboSizeBtn.value = 'Search';
    comboSizeBtn.id = 'Go';

    // Stack the elements of the size search button.
    comboSizeBtnWrapper.appendChild(comboSizeBtn);

    // Stack the elements of the size search.
    comboSizeWrapper.appendChild(comboSizeBtnWrapper);

    // Create the VRN search wrapper.
    var comboVRNWrapper = document.createElement('div');
    comboVRNWrapper.className = 'ts-combo-ss-vrn';

    // Create the VRN label wrapper.
    var vrnLabelWrapper = document.createElement('div');

    // Create the VRN label.
    var vrnLabel = document.createElement('label');
    vrnLabel.innerText = 'Search by registration: ';
    vrnLabel.htmlFor = 'VRN';

    // Create the VRN textbox wrapper.
    var vrnTextBoxWrapper = document.createElement('div');

    // Create the VRN textbox.
    var vrnTextBox = document.createElement('input');
    vrnTextBox.type = 'text';
    vrnTextBox.id = 'VRN';
    vrnTextBox.name = 'VRN';

    // Create the VRN button wrapper.
    var vrnButtonWrapper = document.createElement('div');
    sizeDropdown.id = dropdown.name;
    sizeDropdown.name = dropdown.name;

    // Create the VRN button.
    var vrnButton = document.createElement('input');
    vrnButton.type = 'button';
    vrnButton.value = 'Search';
    vrnButton.id = 'VRNGo';

    // Create the 'powered by' paragraph.
    var poweredByParagraph = document.createElement('p');
    poweredByParagraph.innerHTML = 'powered by ';

    // Create the 'powered by' link.
    var poweredByLink = document.createElement('a');
    poweredByLink.target = '_new';
    poweredByLink.href = 'https://' + tsControl.site + '/?utm_source=widget&utm_medium=link';
    poweredByLink.innerHTML = tsControl.site;

    // Create the tyre size help image.
    var tyreSizeHelpImg = document.createElement('img');
    tyreSizeHelpImg.src = '//assets.tyresandservice.co.uk/images/tyreclick/tyre-size-graphic.png';
    tyreSizeHelpImg.alt = 'Tyre size graphic';

    // Stack all the 'raw' elements inside their wrappers.
    vrnLabelWrapper.appendChild(vrnLabel);
    vrnTextBoxWrapper.appendChild(vrnTextBox);
    vrnButtonWrapper.appendChild(vrnButton);
    poweredByParagraph.appendChild(poweredByLink);

    // Stack all the wrappers inside the root wrapper.
    comboVRNWrapper.appendChild(vrnLabelWrapper);
    comboVRNWrapper.appendChild(vrnTextBoxWrapper);
    comboVRNWrapper.appendChild(vrnButtonWrapper);
    comboVRNWrapper.appendChild(poweredByParagraph);
    comboVRNWrapper.appendChild(tyreSizeHelpImg);

    // Create the inner-most wrapper.
    var comboInnerWrapper = document.createElement('div');
    comboInnerWrapper.id = 'tsComboSingle';
    comboInnerWrapper.className = 'tsComboSingle';

    // Stack all the root search type wrappers inside the inner wrapper.
    comboInnerWrapper.appendChild(comboSizeWrapper);
    comboInnerWrapper.appendChild(comboVRNWrapper);

    // Create the outer-most wrapper.
    var comboOuterWrapper = document.createElement('div');
    comboOuterWrapper.id = 'ts-combo-ss';

    // Stack the inner wrapper inside the outer wrapper.
    comboOuterWrapper.appendChild(comboInnerWrapper);

    // The same block of CSS styles can be used for multiple instances.
    if (scriptInstanceId <= 1) {

        // Create style tag in the head of the document.
        var styleTag = document.createElement("style");
        styleTag.type = "text/css";
        document.getElementsByTagName("head")[0].appendChild(styleTag);

        // Work around to fix IE8 problem when adding styles to style tag.
        if (styleTag.styleSheet) {   // IE
            styleTag.styleSheet.cssText = baseStyles;
        } else {                	 // Normality
            var styleNode = document.createTextNode(baseStyles);
            styleTag.appendChild(styleNode);
        }

    }

    // Create popup and append search options.
    document.write(comboOuterWrapper.outerHTML);

    // Find all instances of the tsmulti widget.
    var widgets = document.querySelectorAll('#ts-combo-ss');

    // Get the last instance of the tsmulti widget currently on the page.
    var widgetRootEle = widgets[widgets.length - 1];

    // Select and cache the elements we've just created.
    widthEle = widgetRootEle.querySelector('#Width');
    profileEle = widgetRootEle.querySelector('#Profile');
    rimEle = widgetRootEle.querySelector('#Rim');
    speedEle = widgetRootEle.querySelector('#Speed');
    vrnEle = widgetRootEle.querySelector('#VRN');
    sizeSubmitBtnEle = widgetRootEle.querySelector('#Go');
    vrnSubmitBtnEle = widgetRootEle.querySelector('#VRNGo');

    // Assign the event handlers.
    addEventListener('click', sizeSubmitBtnEle, tsMultiSSPopSize);
    addEventListener('click', vrnSubmitBtnEle, tsMultiSSPopVrn);
    addEventListener('keydown', vrnEle, preventFormDefault);

    // Assign default options.
    widthEle.selectedIndex = 7;
    profileEle.selectedIndex = 6;
    rimEle.selectedIndex = 4;

})();