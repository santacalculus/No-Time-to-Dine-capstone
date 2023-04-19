"use strict"

function loadTime() {
    let xhr = new XMLHttpRequest()
    xhr.open("GET", getURL, true)
    xhr.onreadystatechange = function() {
        if (this.readyState != 4) return
        let line_data = JSON.parse(xhr.responseText);
        let num_people = line_data.num_people;
        console.log(num_people);
        
    }
    
    console.log("here")
    xhr.send()
}

function updatePage(xhr) {
    if (xhr.status == 200) {
        console.log("yes")
        let response = JSON.parse(xhr.responseText)
        let numresponse = response.num_people 
        let lineDiv = document.getElementById("id_line_num")
        lineDiv.textContent = `${numresponse}`
    }
    if (xhr.status == 0) {
        displayError("Cannot connect to server")
        return
    }

    if (!xhr.getResponseHeader('content-type') == 'application/json') {
        displayError("Received status=" + xhr.status)
        return
    }

    let response = JSON.parse(xhr.responseText)
    if (response.hasOwnProperty('error')) {
        displayError(response.error)
        return
    }
    displayError(response)
}

