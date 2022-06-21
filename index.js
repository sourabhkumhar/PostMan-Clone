console.log('This is my Project 6 from JS course');

// Utility function:
// 1. to get DOM element from string
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    console.log(div);
    return div.firstElementChild;
}

// initialize no of parameters
let addedParamCount = 0;

// hide the parametersBox initaially
let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';

// If the user click on params box, hide the json box
let params = document.getElementById('params');
params.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'none';
    document.getElementById('parametersBox').style.display = 'block';
})

// If the user click on json box, hide the params box
let json = document.getElementById('json');
json.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'flex';
    document.getElementById('parametersBox').style.display = 'none';
})


// If user clicks on + button, add more paramters
let addParam = document.getElementById('addParam');
addParam.addEventListener('click', () => {
    let newParameters = document.getElementById('newParameters');
    let string = `<div class="row g-3 my-2">
                    <label class="col-form-label col-sm-2 pt-0">Parameter ${addedParamCount + 2}</label>
                    <div class="col">
                        <input type="text" class="form-control" id="parameterKey${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} Key">
                    </div>
                    <div class="col">
                        <input type="text" class="form-control" id="parameterValue${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} Value">
                    </div>
                    <div class="col">
                        <button class="btn btn-primary deleteParam"> - </button>
                    </div>
                </div>`;

    // Convert the element string ot DOM node
    let paramElement = getElementFromString(string);
    newParameters.appendChild(paramElement);

    // Add an eventListner to remove the parameter on clicking - button
    let deleteParam = document.getElementsByClassName('deleteParam');
    for (let item of deleteParam) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.parentElement.remove();
        })
    }

    addedParamCount++;

})

// If the user click on submit button
let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    // Show please wait in the response box to request patience from the user
    document.getElementById('responsePrism').value = "Please Wait! System is fetching...";

    // Fetch all the value user has entered
    let url = document.getElementById("url").value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;

    // if user has used params option instead of josn, collect all the parameters in an object
    if (contentType == 'params') {
        data = {};
        for (let i = 0; i < addedParamCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
    }
    else {
        data = document.getElementById('requestJsonText').value;
    }

    // Log all the values in the console for debugging
    console.log('Url is ', url);
    console.log('requestType is ', requestType);
    console.log('contentType is ', contentType);
    console.log('data is ', data);

    // If the request type is post, invoke fetch api to create a post request
    if (requestType == 'GET') {
        fetch(url, {
            method: 'GET',
        })
            .then(response => response.text())
            .then((text) => {
                document.getElementById('responsePrism').innerHTML = text;
                Prism.highlightAll();
            });
    }
    else {
        fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
            .then(response => response.text())
            .then((text) => {
                document.getElementById('responsePrism').innerHTML = text;
                Prism.highlightAll();
            });
    }
})