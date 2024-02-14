javascript:(function() {
    /* Create custom popup with textarea for user input */
    var popupContent = "<div id='customPopup'>";
    popupContent += "<span id='closePopup'>&times;</span>";
    popupContent += "<h2>Enter Data</h2>";
    popupContent += "<textarea id='userInput' rows='5' cols='50'></textarea>";
    popupContent += "<button id='parseButton'>Parse Data</button>";
    popupContent += "<div id='parsedDomains'></div></div>";

    /* Append popup to body */
    document.body.insertAdjacentHTML('beforeend', popupContent);

    /* Add styles for the popup */
    var styles = `
        #customPopup {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #fff;
            padding: 20px;
            border: 1px solid #ccc;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
            z-index: 9999;
            color: #000;
            max-height: 80vh;
            overflow: auto;
        }
        #closePopup {
            position: absolute;
            top: 5px;
            right: 10px;
            cursor: pointer;
            font-size: 20px;
            color: #aaa;
        }
        #closePopup:hover {
            color: #000;
        }
        #customPopup h2 {
            margin-top: 0;
        }
        #userInput {
            width: 100%;
            margin-bottom: 10px;
        }
        #parseButton {
            padding: 5px 10px;
            background-color: #007bff;
            color: #fff;
            border: none;
            cursor: pointer;
        }
        #parseButton:hover {
            background-color: #0056b3;
        }
        #parsedDomains {
            margin-top: 10px;
        }
        #customPopup {

        }
    `;

    var styleElem = document.createElement('style');
    styleElem.textContent = styles;
    document.head.appendChild(styleElem);

    /* Add functionality to close popup */
    document.getElementById('closePopup').addEventListener('click', function() {
        document.getElementById('customPopup').remove();
    });

    /* Add functionality to parse data */
    document.getElementById('parseButton').addEventListener('click', function() {
        var userInput = document.getElementById('userInput').value;

        /* Regular expression to extract domains */
        var domainRegex = /(?:^|\s)(?:www\.)?([a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+)(?=\s|$)/g;

        /* Array to store unique domains */
        var domains = [];
        var match;

        /* Extract domains using regex */
        while ((match = domainRegex.exec(userInput)) !== null) {
            /* Check if the matched string is an IP address */
            if (!isValidIPAddress(match[1])) {
                /* Remove 'www.' if present and convert to lower case for better comparison */
                var domain = match[1].replace(/^www\./, '').toLowerCase();
                /* Add the domain to the array if it's not already included */
                if (!domains.includes(domain)) {
                    domains.push(domain);
                }
            }
        }

        /* Sort alphabetically */
        domains.sort();

        /* Display parsed domains */
        var htmlContent = '';
        htmlContent += `<h2 style="text-align: center;">Parsed Domains:</h2><ol>`;
        domains.forEach((domain) => {
            htmlContent += `<li>${domain}</li>`;
        });
        htmlContent += `</ol>`;
        document.getElementById('parsedDomains').innerHTML = htmlContent;
    });

    /* Function to validate IP address */
    function isValidIPAddress(ip) {
        var ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
        return ipRegex.test(ip);
    }
})();
