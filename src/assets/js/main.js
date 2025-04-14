const headerCollapsBtn     = document.querySelector(".collaps-btn");
const collapsSideLinks     = document.querySelector(".collaps-side-links");
const closeMobileSideBtn   = document.querySelector(".close-mobile-side-btn");
const themeMode            = document.querySelector("#theme-mode")
const darkCssFile          = document.createElement("link");
const head                 = document.getElementsByTagName("head")[0];
const sideCollapsBtn       = document.querySelector(".side-collaps");
const sideBar              = document.querySelector(".side-container");
const mainContent          = document.querySelector(".main-content-container");
const collapsIcon          = document.querySelector(".side-collaps i");
const sideLabels           = document.querySelectorAll(".side-label");
const settingsList         = document.querySelector(".side-drop-down .accordion-collapse");
const sideLogo             = document.querySelector(".logo span");
// const sideSeparetor        = document.querySelector("aside .separetor");
const sidebarText          = document.querySelectorAll("aside .side-text");
const arr = [1,2,3,4,4]
// open mobile side
headerCollapsBtn.addEventListener("click", () => {
    collapsSideLinks.classList.add("collaps-active-side-links");
});
// close mobile side
closeMobileSideBtn.addEventListener("click", () => {
    collapsSideLinks.classList.remove("collaps-active-side-links");
})


// create css link
function createCssLink(fileName , parent) {
    fileName.type = "text/css"
    fileName.rel  = "stylesheet"
    fileName.href = "assets/css/dark-style.css"
    console.log("create");
    parent.appendChild(fileName);
}

// remove css link
function removeCssFile(fileName , parent) {
    parent.removeChild(fileName);
}

// change theme mode
themeMode.addEventListener("change", () => {
    themeMode.checked ? createCssLink(darkCssFile , head) : removeCssFile(darkCssFile , head);
});


// collaps sidebar
sideCollapsBtn.addEventListener("click" , ()=>{
    changeSize()
    clearText()
});

// change columns size 

function changeSize(){
    sideBar.classList.toggle("col-lg-2");
    mainContent.classList.toggle("col-lg-10");
    if (sideBar.classList.contains("col-lg-2")) {
        mainContent.style.flexGrow="0";
        sideBar.style.width=""
    }else{
        sideBar.style.width="5%"
        mainContent.style.flexGrow="3";
    }
    sideLabels.forEach( (label )=>{
        label.classList.toggle("d-none");
    })
    collapsIcon.classList.toggle("fa-collapse");
    collapsIcon.classList.toggle("fa-expand");
    // sideSeparetor.classList.toggle("d-none");
    sideLogo.classList.toggle("d-none");
    settingsList.classList.toggle("show");
}

function clearText(){
    console.log(sidebarText);
    const text = [ ...sidebarText].map(span =>{
        span.classList.toggle("d-none")
    })
}