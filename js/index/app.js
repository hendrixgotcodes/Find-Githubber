"use strict";



// Instantiating UI object
const ui = new UI();
//Getting searchbox
const searchbox = document.querySelector('.textBox');

const profile_container = document.querySelector('.profile_container');
let userName = "";
let pageNumber = 2;

const gitReposNav = document.querySelector(".gitRepos_nav");
//Creating Navigation Links
const nextPage = document.createElement("h4");
nextPage.textContent = "Next Page";
nextPage.className = "pageSwitch";
nextPage.id = "nextPage";

const previousPage = document.createElement("h4");
previousPage.textContent = "Previous Page";
previousPage.className = "pageSwitch";
previousPage.id = "previousPage";


if (window.innerWidth <= 711) {
    console.log("hi")

    ui.replaceNavBar();
}

//Creating an instance of the oauth object
const getGithub = new oauth();

searchbox.addEventListener('keyup', (e) => {

    // removeNode(previousPage);
    // removeNode(nextPage);

    // Testing Network Before Query
    if (!navigator.onLine) {
        console.log(navigator.onLine);
        ui.showAlert("warningAlert", "⚠️ Please connect to the internet!");

        return;
    }

    //If textbox is not empty....
    if (e.target.value !== "") {

        userName = e.target.value;
        console.log(userName);
        // ....receive promise from oauth instance
        getGithub.getUser(e.target.value, 1)
            .then((data) => {

                //If promise has a message of null or not found....
                if (data.profile.message === "Not Found") {

                    //..display error message
                    ui.profileNotFound();
                } else {
                    //...else display user profile
                    ui.setProfile(data.profile);

                    if (data.repos.length === 0) {
                        document.querySelector(".repos").innerHTML = "No repos available"
                        return;
                    }
                    //...display user repo
                    ui.setRepos(data.repos);

                    if (gitReposNav.querySelector("#nextPage") === null) {
                        gitReposNav.appendChild(nextPage);
                    }
                }
            })

            //Catching error promise
            .catch((error) => {
                console.log(error);
            })

    }
    //If textbox is empty.....
    else if (e.target.value === "") {

        //...Set default BackGround
        ui.setBG();
    }




});

// document.getElementById("nextPage").addEventListener("click",()=>{


//     window.scrollTo({
//         top: document.getElementById("rHead").offsetTop,
//         left: document.getElementById("rHead").offsetLeft,
//         behavior: 'smooth'
//     });

//     getGithub.getUser(userName,pageNumber)
//     .then((data)=>{
//         ui.setRepos(data.repos);
//         pageNumber++;
//     })
// });




//Click event to scroll to position of repositories
window.addEventListener('click', (e) => {

    // if repository count is clicked
    if (e.target.className === "focused" || e.target.classList.contains("focus")) {


        window.scrollTo({
            top: document.getElementById("rHead").offsetTop,
            left: document.getElementById("rHead").offsetLeft,
            behavior: 'smooth'
        });

    }

    // If harmburger menu is clicked
    else if (e.target.className === "harmBurgerMenuCheckbox") {

        ui.addNavBox_links();

        const harmBurgerMenu = document.querySelector(".harmBurgerMenu");
        harmBurgerMenu.classList.toggle("harmBurgerMenu_checked");

    }

    //If nextPage navigator is clicked
    else if (e.target.id === "nextPage") {

        if (pageNumber < 0) {
            pageNumber = -(pageNumber);
        }

        window.scrollTo({
            top: document.getElementById("rHead").offsetTop,
            left: document.getElementById("rHead").offsetLeft,
            behavior: 'smooth'
        });

        getGithub.getUser(userName, pageNumber)
            .then((data) => {
                ui.setRepos(data.repos);
                pageNumber++;
            });

        if (gitReposNav.querySelector("#previousPage") === null) {
            gitReposNav.appendChild(previousPage);
        }
    }

    //Trigger if previousPage navigator is clicked
    else if (e.target.id === "previousPage") {
        if (pageNumber > 0) {
            window.scrollTo({
                top: document.getElementById("rHead").offsetTop,
                left: document.getElementById("rHead").offsetLeft,
                behavior: 'smooth'
            });


            getGithub.getUser(userName, pageNumber - 2)
                .then((data) => {
                    ui.setRepos(data.repos);
                    pageNumber--;
                });
        }

    }

});

window.addEventListener("resize", () => {
    if (window.innerWidth <= 720) {
        console.log("hi")

        ui.replaceNavBar();
    } else {
        ui.replaceNavBarInverse();
    }

})



//Function to remove nodes from DOM
function removeNode(node) {

    console.log(gitReposNav);

    if (gitReposNav.querySelector("#" + node.id) !== null) {
        console.log(node);
        gitReposNav.body.removeChild(node);

    }
}

//Instantiating UTILL class
const utill = new UTILL();

// calling util methods
utill.showGoToTop();
utill.toggleTheme();

//Tooltip
window.addEventListener("mouseenter", (e) => {
    if (e.target.className = "language") {
        // utill.appendToolTip(e.x,e.y,"Programming language");
        console.clear();
        console.log("here");
    } else {
        console.clear();
        console.log(e.target.className);
    }
})

// const language = document.getElementById("language");
// language.addEventListener("mouseenter", utill.appendToolTip);
// language.addEventListener("mouseleave",utill.removeToolTip);


//Appending Event Listener to scroll
const scrollUp = document.getElementById("scrollUp");

scrollUp.addEventListener("click",(e)=>{
    e.preventDefault();

    window.scrollTo({
        top: document.getElementById("top").offsetTop,
        left: document.getElementById("top").offsetLeft,
        behavior: "smooth"
    });
})


scrollUp.addEventListener("auxclick",(e)=>{
    window.scrollTo({
        top: document.getElementById("top").offsetTop,
        left: document.getElementById("top").offsetLeft,
        behavior: "smooth"
    });
})

// else if (e.target.classList.contains("go-toTop") || e.target.id === "go_toTop") {



// }