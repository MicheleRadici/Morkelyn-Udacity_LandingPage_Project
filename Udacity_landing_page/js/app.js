/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
var SectionContainer;
var NavlistItems;
const fragment = document.createDocumentFragment();

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
function GetSections() {
    SectionContainer = document.body.querySelectorAll("section");
   }
   
   function AddNewSection() {
    let last_item = SectionContainer.item(SectionContainer.length - 1);
    let new_item = document.createElement("section");
    new_item.innerHTML = last_item.innerHTML;
    new_item.setAttribute("id", "section" + (SectionContainer.length + 1).toString());
    new_item.setAttribute("data-nav", "Section " + (SectionContainer.length + 1).toString());
    new_item.querySelector("h2").innerText = "Section " + (SectionContainer.length + 1).toString();
    document.body.querySelector("main").appendChild(new_item);
    GetSections();
   }
   
   
   function SetNavListAttr(params) {
    params.classList.add("navbar-nav");
    params.classList.add("auto");
    params.classList.add("mt-2");
    params.classList.add("mt-0");
    params.setAttribute("style", "text-align:left;");
   }
   
   function SetNavList() {
    var NavlistItems = document.body.querySelector("#navbar__list");
    for (const container of SectionContainer) {
     let listitem = document.createElement('li');
     let textstyle = document.createElement('div');
     listitem.classList.add("nav-item");
     textstyle.classList.add("nav-link");
     textstyle.innerText = container.querySelector("h2").innerText;
     listitem.appendChild(textstyle);
     fragment.appendChild(listitem);
    }
    NavlistItems.appendChild(fragment);
    SetNavListAttr(NavlistItems);
   }
   
   function BuildBurgerButton() {
   
    let burgebutton = document.createElement("button");
    let span = document.createElement("span");
    console.log(burgebutton.data);
    burgebutton.classList.add("navbar-toggler");
    burgebutton.classList.add("collapsed");
    burgebutton.setAttribute("type", "button");
    burgebutton.setAttribute("data-toggle", "collapse");
    burgebutton.setAttribute("data-target", "#navbarTogglerDemo01");
    burgebutton.setAttribute("aria-controls", "navbarTogglerDemo01");
    burgebutton.setAttribute("aria-expanded", "false");
    burgebutton.setAttribute("aria-label", "Toggle navigation");
    span.classList.add("navbar-toggler-icon");
    burgebutton.appendChild(span);
    return burgebutton;
   
   }
   
   function BuildHomeLink() {
    let homelink = document.createElement("a");
    homelink.classList.add("navbar-brand");
    homelink.innerText = 'Manipulating the DOM';
    homelink.href = './index.html';
    return homelink;
   }
   
   function BuildDivStyle(params) {
    let homelink = BuildHomeLink();
    let listanav = params.querySelector("ul");
    let divstyle = document.createElement('div');
    divstyle.classList.add("navbar-collapse");
    divstyle.classList.add("collapse");
    divstyle.setAttribute("id", "navbarTogglerDemo01");
    divstyle.appendChild(homelink);
    divstyle.appendChild(listanav);
    return divstyle;
   }
   
   function SetNavStyle(params) {
    params.classList.add("navbar");
    params.classList.add("navbar-expand-lg");
    params.classList.add("navbar-light");
    params.classList.add("bg-light");
   }
   
   function SetNavStructure(params) {
    let nav = document.body.querySelector("nav");
    let burgebutton = BuildBurgerButton();
    let divstyle = BuildDivStyle(nav);
    nav.appendChild(burgebutton);
    nav.appendChild(divstyle);
    SetNavStyle(nav);
   }


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function BuildNav() {
    SetNavList();
   }

// Add class 'active' to section when near top of viewport
function SetScrollState() {
    let sectionindex;
    for (let container of SectionContainer) {
     if (container.getBoundingClientRect().y < 20) {
      container.setAttribute("style", "opacity:1");
      sectionindex = container.querySelector("h2").innerText;
   
     } else {
      container.setAttribute("style", "opacity:0.2");
     }
    }
    document.body.querySelectorAll(".nav-item").forEach(element => {
     if (element.querySelector("div").innerText == sectionindex) {
      element.setAttribute("style", "opacity:1");
     } else {
      element.setAttribute("style", "opacity:0.5");
     }
   
    });
   
   }

// Scroll to anchor ID using scrollTO event
function ScrollToElement(params) {
    for (const container of SectionContainer) {
     if (params.querySelector("div").innerText === container.querySelector("h2").innerText) {
      container.scrollIntoView({
       behavior: 'smooth'
      });
     }
    }
   }

/**
 * End Main Functions
 * Begin Events
 * 
*/
document.addEventListener("DOMContentLoaded", event => {
 //Load actual section in index.html
 GetSections();
 //add N section to the page
 for (let index = 0; index < 6; index++) {
  AddNewSection();
 }
// Build menu 
BuildNav();
SetNavStructure();
BuildBurgerButton();
// Scroll to section on link click
// Set sections as active
let NavElements = document.body.querySelectorAll("#navbar__list li");
NavElements.forEach(element => {
 element.addEventListener("click", event => ScrollToElement(element));
});
document.body.querySelector("main");
addEventListener("scroll", event => SetScrollState());
});