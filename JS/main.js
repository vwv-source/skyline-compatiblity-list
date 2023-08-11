const searchbar = document.querySelector('.searchbar')
const searchok = document.querySelector('.searchbutton')
const listcontainer = document.querySelector('.gamelistcontainer')
const topbar = document.querySelector('.topbar')
const filterbuttons = document.querySelectorAll('.filterbutton')

const fplayable = document.querySelector('#fplayable')
const fingame = document.querySelector('#fingame')
const fboots = document.querySelector('#fboots')
const fnothing = document.querySelector('#fnothing')
const fall = document.querySelector('#fall')

//var appender = '<div class="gamelistcontainer"> <div class="gamecontainer"> <p class="gametitle">PC Building Simulator</p> <p class="gamedate">15:00 5 Oct</p> <div class="gameinfocontainer"> <p class="gamestatustitle">Status:</p> <p class="gamestatus" id="ingame">status-ingame</p> </div> <div class="extralabels"> <p class="extralabelstitle">Labels:</p> <p class="labels" id="regression">regression</p> <p class="labels" id="services">services</p> <p class="labels" id="ingame">status-ingame</p> </div> </div> </div>'

var currentfilter = "";

var playablenum = "";
var nothingnum = "";
var ingamenum = "";
var bootsnum = "";
var totalnum = "";

var topperc = ``

var date = new Date()
date.setDate(date.getDate() + 1)

searchbar.value = ""

function percentagecalculator(){
    var responseObj = JSON.parse(this.responseText);
    console.log(responseObj)
    if(!responseObj.items[0].labels[0]){
        totalnum = responseObj.total_count
        if(playablenum & nothingnum & totalnum & ingamenum & bootsnum){
            document.cookie = `playableper=${Math.round((playablenum / totalnum) * 100)}; expires=${date.toUTCString()}`;
            document.cookie = `ingameper=${Math.round((ingamenum / totalnum) * 100)}; expires=${date.toUTCString()}`;
            document.cookie = `nothingper=${Math.round((nothingnum / totalnum) * 100)}; expires=${date.toUTCString()}`;
            document.cookie = `bootsper=${Math.round((bootsnum / totalnum) * 100)}; expires=${date.toUTCString()}`;
        }
        return
    }
    if(responseObj.items[0].labels[0].name == 'status-playable'  && responseObj.total_count < 500){
        playablenum = responseObj.total_count
    }
    if(responseObj.items[0].labels[0].name == 'status-ingame'  && responseObj.total_count < 500){
        ingamenum = responseObj.total_count
    }
    if(responseObj.items[0].labels[0].name == 'status-boots'  && responseObj.total_count < 500){
        bootsnum = responseObj.total_count
    }
    if(responseObj.items[0].labels[0].name == 'status-nothing' && responseObj.total_count < 500){
        nothingnum = responseObj.total_count
    }
    if(responseObj.total_count > 500){
        totalnum = responseObj.total_count
    }
    if(playablenum & nothingnum & totalnum & ingamenum & bootsnum){
        document.cookie = `playableper=${Math.round((playablenum / totalnum) * 100)}; expires=${date.toUTCString()}`;
        document.cookie = `ingameper=${Math.round((ingamenum / totalnum) * 100)}; expires=${date.toUTCString()}`;
        document.cookie = `nothingper=${Math.round((nothingnum / totalnum) * 100)}; expires=${date.toUTCString()}`;
        document.cookie = `bootsper=${Math.round((bootsnum / totalnum) * 100)}; expires=${date.toUTCString()}`;
    }
}

function loadissues() {
    var responseObj = JSON.parse(this.responseText);
    listcontainer.innerHTML = "";
    if(!getCookie(playablenum)){
        //listcontainer.innerHTML += `<div class="percentagecontainer"> <div class="circlecontainer" ingamep=" "> <svg-progress-circle percent="31" textid="ingameper" color="rgba(83, 145, 68, 0.795)"></svg-progress-circle> <p class="percentagetitle" id="ingameper">In-Game</p> </div> <div class="circlecontainer" nothingp=" "> <svg-progress-circle percent="30" textid="nothingper" color="rgb(255, 70, 70)"></svg-progress-circle> <p class="percentagetitle" id="nothingper">Nothing</p> </div> <div class="circlecontainer" bootp=" "> <svg-progress-circle percent="22" textid="bootsper" color="rgb(214, 121, 0)"></svg-progress-circle> <p class="percentagetitle" id="bootsper">Boots</p> </div> <div class="circlecontainer" playp=" "> <svg-progress-circle percent="16"textid="playper" color="rgba(83, 255, 68, 1)"></svg-progress-circle> <p class="percentagetitle" id="playper">Playable</p> </div> </div>`
    }else{
        //listcontainer.innerHTML += `<div class="percentagecontainer"> <div class="circlecontainer" ingamep=" "> <svg-progress-circle percent="${getCookie('ingameper')}" textid="ingameper" color="rgba(83, 145, 68, 0.795)"></svg-progress-circle> <p class="percentagetitle" id="ingameper">In-Game</p> </div> <div class="circlecontainer" nothingp=" "> <svg-progress-circle percent="${getCookie('nothingper')}" textid="nothingper" color="rgb(255, 70, 70)"></svg-progress-circle> <p class="percentagetitle" id="nothingper">Nothing</p> </div> <div class="circlecontainer" bootp=" "> <svg-progress-circle percent="${getCookie('bootsper')}" textid="bootsper" color="rgb(214, 121, 0)"></svg-progress-circle> <p class="percentagetitle" id="bootsper">Boots</p> </div> <div class="circlecontainer" playp=" "> <svg-progress-circle percent="${getCookie('playableper')}"textid="playper" color="rgba(83, 255, 68, 1)"></svg-progress-circle> <p class="percentagetitle" id="playper">Playable</p> </div> </div>`
    }
    responseObj.items.forEach(element => {
        i = 1;
        var labels = "";
        if(!element.labels[0]){
            listcontainer.innerHTML += `<div class="gamecontainer"> <a class="gametitle" href="${element.html_url}" target="_blank">${element.title}</a><div class="gameinfocontainer"> <p class="gamestatustitle">Status:</p> <p class="gamestatus" id="nothing">no-status</p> </div> <div class="extralabels"> <p class="extralabelstitle">Labels:</p> <p class="labels" id="regression">regression</p> <p class="labels" id="services">services</p> </div> </div>`
            return
        }
        element.labels.forEach(label => {
            if(!element.labels[1]){
                labels += `<p class="labels" id="nothing">none</p>`
            }
            if(label.name == "status-nothing" || label.name == "status-ingame" || label.name == "status-playable" || label.name == "status-boots"){
                return
            }
            labels += `<p class="labels" id="${label.name}">${label.name}</p>`
        })
        
        listcontainer.innerHTML +=  `<div class="gamecontainer"> <a class="gametitle" href="${element.html_url}" target="_blank">${element.title}</a><div class="gameinfocontainer"> <p class="gamestatustitle">Status:</p> <p class="gamestatus" id="${element.labels[0].name}">${element.labels[0].name.replace('status-', "")}</p> </div> <div class="extralabels"> <p class="extralabelstitle">Labels:</p> ${labels} </div> </div>`
    });
}

searchok.addEventListener('click', function(e){
        var request = new XMLHttpRequest();
        request.onload = loadissues; 
        request.open('get', `https://api.github.com/search/issues?q=${searchbar.value.split(' ').join('+')}${currentfilter}state:open+in:title+repo:skyline-emu/skyline-games-list&per_page=100`, true)
        request.send()
})

fplayable.addEventListener('click', function(e){
    if(this.getAttribute('selected') == " "){
        this.removeAttribute('selected')
        currentfilter = "";
            var request = new XMLHttpRequest();
            request.onload = loadissues; 
            request.open('get', `https://api.github.com/search/issues?q=${searchbar.value.split(' ').join('+')}${currentfilter}state:open+in:title+repo:skyline-emu/skyline-games-list&per_page=100`, true)
            request.send()      
        
        return
    }
    currentfilter = "label:status-playable+"
    console.log(Array.prototype.slice.call(this.parentElement.children))
    Array.prototype.slice.call(this.parentElement.children).forEach(element => {
        element.removeAttribute('selected');
    })
    this.setAttribute('selected', " ")
        var request = new XMLHttpRequest();
        request.onload = loadissues; 
        request.open('get', `https://api.github.com/search/issues?q=${searchbar.value.split(' ').join('+')}${currentfilter}state:open+in:title+repo:skyline-emu/skyline-games-list&per_page=100`, true)
        request.send()      
})

fboots.addEventListener('click', function(e){
    if(this.getAttribute('selected') == " "){
        this.removeAttribute('selected')
        currentfilter = "";
            var request = new XMLHttpRequest();
            request.onload = loadissues; 
            request.open('get', `https://api.github.com/search/issues?q=${searchbar.value.split(' ').join('+')}${currentfilter}state:open+in:title+repo:skyline-emu/skyline-games-list&per_page=100`, true)
            request.send()      
        return
    }
    currentfilter = "label:status-boots+"
    Array.prototype.slice.call(this.parentElement.children).forEach(element => {
        element.removeAttribute('selected');
    })
    this.setAttribute('selected', " ")
        var request = new XMLHttpRequest();
        request.onload = loadissues; 
        request.open('get', `https://api.github.com/search/issues?q=${searchbar.value.split(' ').join('+')}${currentfilter}state:open+in:title+repo:skyline-emu/skyline-games-list&per_page=100`, true)
        request.send()      
})

fall.addEventListener('click', function(e){
    searchbar.value = ""
    currentfilter = ""
    Array.prototype.slice.call(this.parentElement.children).forEach(element => {
        element.removeAttribute('selected');
    })
    var request = new XMLHttpRequest();
    request.onload = loadissues; 
    request.open('get', `https://api.github.com/search/issues?q=${searchbar.value.split(' ').join('+')}${currentfilter}state:open+in:title+repo:skyline-emu/skyline-games-list&per_page=100`, true)
    request.send()      
})

fingame.addEventListener('click', function(e){
    if(this.getAttribute('selected') == " "){
        this.removeAttribute('selected')
        currentfilter = "";
            var request = new XMLHttpRequest();
            request.onload = loadissues; 
            request.open('get', `https://api.github.com/search/issues?q=${searchbar.value.split(' ').join('+')}${currentfilter}state:open+in:title+repo:skyline-emu/skyline-games-list&per_page=100`, true)
            request.send()      
        return
    }
    currentfilter = "label:status-ingame+"
    Array.prototype.slice.call(this.parentElement.children).forEach(element => {
        element.removeAttribute('selected');
    })
    this.setAttribute('selected', " ")
        var request = new XMLHttpRequest();
        request.onload = loadissues; 
        request.open('get', `https://api.github.com/search/issues?q=${searchbar.value.split(' ').join('+')}${currentfilter}state:open+in:title+repo:skyline-emu/skyline-games-list&per_page=100`, true)
        request.send()      
})

fnothing.addEventListener('click', function(e){
    if(this.getAttribute('selected') == " "){
        this.removeAttribute('selected')
        currentfilter = "";
            var request = new XMLHttpRequest();
            request.onload = loadissues; 
            request.open('get', `https://api.github.com/search/issues?q=${searchbar.value.split(' ').join('+')}${currentfilter}state:open+in:title+repo:skyline-emu/skyline-games-list&per_page=100`, true)
            request.send()      
        return
    }
    currentfilter = "label:status-nothing+"
    Array.prototype.slice.call(this.parentElement.children).forEach(element => {
        element.removeAttribute('selected');
    })
    this.setAttribute('selected', " ")
        var request = new XMLHttpRequest();
        request.onload = loadissues; 
        request.open('get', `https://api.github.com/search/issues?q=${searchbar.value.split(' ').join('+')}${currentfilter}state:open+in:title+repo:skyline-emu/skyline-games-list&per_page=100`, true)
        request.send()
})

searchbar.addEventListener('mouseover', function(e){
    filterbuttons.forEach(element => {
        element.style.display = 'unset';
    })
})

listcontainer.addEventListener('mouseover', function(e){
    if(window.innerWidth < 1100){
        return
    }
    filterbuttons.forEach(element => {
        element.style.display = 'none';
    })
})

topbar.addEventListener('mouseover', function(e){
    if(window.innerWidth < 1100){
        return
    }
    if(e.target.getAttribute('class') == 'topbar'){
        filterbuttons.forEach(element => {
            element.style.display = 'none';
        })
    }
})

searchbar.addEventListener('keyup', function(e){
    if (e.key === 'Enter' || e.keyCode === 13) {
            var request = new XMLHttpRequest();
            request.onload = loadissues; 
            request.open('get', `https://api.github.com/search/issues?q=${searchbar.value.split(' ').join('+')}${currentfilter}state:open+in:title+repo:skyline-emu/skyline-games-list&per_page=100`, true)
            request.send()      
    }
})

// if(getCookie('playableper')){
    
// }else{
//     setTimeout(() => {
//         var request = new XMLHttpRequest();
//         request.onload = percentagecalculator; 
//         request.open('get', `https://api.github.com/search/issues?q=label:status-ingame+state:open+in:title+repo:skyline-emu/skyline-games-list&per_page=0`, true)
//         request.send()
//     }, 1000)
//     setTimeout(() => {
//         var request = new XMLHttpRequest();
//         request.onload = percentagecalculator; 
//         request.open('get', `https://api.github.com/search/issues?q=label:status-nothing+state:open+in:title+repo:skyline-emu/skyline-games-list&per_page=0`, true)
//         request.send()
//     }, 2000);
//     setTimeout(() => {
//         var request = new XMLHttpRequest();
//         request.onload = percentagecalculator; 
//         request.open('get', `https://api.github.com/search/issues?q=label:status-playable+state:open+in:title+repo:skyline-emu/skyline-games-list&per_page=0`, true)
//         request.send()
//     }, 3000)
//     setTimeout(() => {
//         var request = new XMLHttpRequest();
//         request.onload = percentagecalculator; 
//         request.open('get', `https://api.github.com/search/issues?q=label:status-boots+state:open+in:title+repo:skyline-emu/skyline-games-list&per_page=0`, true)
//         request.send()
//     }, 5000)
//     setTimeout(() => {
//         var request = new XMLHttpRequest();
//         request.onload = percentagecalculator; 
//         request.open('get', `https://api.github.com/search/issues?q=state:open+in:title+repo:skyline-emu/skyline-games-list&per_page=0`, true)
//         request.send()
//     }, 4000)
// }    

var request = new XMLHttpRequest();
request.onload = loadissues; 
request.open('get', `https://api.github.com/search/issues?q=${searchbar.value.split(' ').join('+')}state:open+in:title+repo:skyline-emu/skyline-games-list&per_page=100`, true)
request.send()

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}