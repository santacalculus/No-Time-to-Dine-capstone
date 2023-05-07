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
    //console.log("here")
    xhr.send()
    var d = new Date(); 
    var secs = d.getSeconds();
    console.log(secs)
}

function updatePage(xhr) {
    if (xhr.status == 200) {
        let response = JSON.parse(xhr.responseText)
        let numresponse = response.num_people 
        let lineDiv = document.getElementById("id_line_num")
        //console.log(numresponse)
        lineDiv.innerHTML = numresponse
        updateTime(response)
        
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

function updateTime(response) {
    let waitresponse = response.wait_time
    let waitdiv = document.getElementById("id_predicted_time")
    waitdiv.innerHTML = waitresponse
    //console.log(waitresponse)
    let createresponse = response.creation_time
    let creatediv = document.getElementById("id_creation_time")
    creatediv.innerHTML = createresponse
    let finalresponse = response.final_time
    let finaldiv = document.getElementById("id_final_time")
    finaldiv.innerHTML = finalresponse
    
}

function displayError(message) {
    let errorElement = document.getElementById("error")
    errorElement.innerHTML = message
}


// function to check whether the dining hall is open
function checkPrima() {
    var d = new Date(); 
    var hours = d.getHours();
    var day = d.getDay();
    let headerdiv = document.getElementById("id_prima_head")
    if(1 < day && day < 5) {
        //console.log(day)
        if(8 <= hours && hours <= 18) {
            //console.log(hours)
            
            headerdiv.innerHTML = "OPEN"
        }
    } else {
        headerdiv.innerHTML = "CLOSED"
    }

}

function checkExchange() {
    var d = new Date(); 
    var hours = d.getHours();
    var day = d.getDay();
    let headerdiv = document.getElementById("id_exchange_head")
    if(0 < day && day < 7) {
        //console.log(day)
        if (3 <= day && day <= 4) {
            if (8 <= hours && hours <= 15) {
                headerdiv.innerHTML = "OPEN"
            }
        }
        if (day == 1) {
            if (8 <= hours && hours <= 19) {
                headerdiv.innerHTML = "OPEN"
            }
        }
        if (day == 2) {
            if (8 <= hours && hours <= 17) {
                //console.log(hours)
                
                headerdiv.innerHTML = "OPEN"
            }
        }
        if (day == 5) {
            if (8 <= hours && hours <= 18) {
                headerdiv.innerHTML = "OPEN"
            }
        }
        if (day == 6) {
            if (10 <= hours && hours <= 14) {
                headerdiv.innerHTML = "OPEN"
            }
        }
        else {
            headerdiv.innerHTML = "CLOSED"
        }
    } else {
        headerdiv.innerHTML = "CLOSED"
    }

}
