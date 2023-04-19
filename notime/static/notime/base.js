"use strict"

function loadTime() {
    let xhr = new XMLHttpRequest()

    xhr.onerror = function() {
        console.log('Error occurred.');
      };
    
    xhr.onreadystatechange = function() {
        
        if (this.readyState != 4) {
            return
        }
        
        updatePage(xhr)
    }
    xhr.open("GET", getURL, true)
    console.log("here")
    xhr.send()
}

function updatePage(xhr) {
    if (xhr.status == 200) {
        console.log("yes")
        let response = JSON.parse(xhr.responseText)
        let numresponse = response.num_people 
        let lineDiv = document.getElementById("id_line_num")
        console.log(numresponse)
        lineDiv.innerHTML = numresponse
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
    
}

function displayError(message) {
    let errorElement = document.getElementById("error")
    errorElement.innerHTML = message
}