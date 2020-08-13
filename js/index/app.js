"use strict";

//Getting searchbox
const searchbox = document.querySelector('.textBox');
const ui = new UI();

const profile_container = document.querySelector('.profile_container');


//Creating an instance of the oauth object
const getGithub = new oauth();

searchbox.addEventListener('keyup', (e) => {

    // Testing Network Before Query
    if (!navigator.onLine) {
        console.log(navigator.onLine);
        ui.showAlert("warningAlert", "⚠️ Please connect to the internet!");

        return;
    }

    //If textbox is not empty....
    if (e.target.value !== "") {

        // ....receive promise from oauth instance
        getGithub.getUser(e.target.value)
            .then((data) => {

                //If promise has a message of null or not found....
                if (data.profile.message === "Not Found" ) {

                    //..display error message
                    ui.profileNotFound();
                } else {
                    //...else display user profile
                    ui.setProfile(data.profile);

                    if(data.repos.length === 0){
                        document.querySelector(".repos").innerHTML = "No repos available"
                        return;
                    }
                    //...display user repo
                    ui.setRepos(data.repos);
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




//Click event to scroll to position of repositories
window.addEventListener('click', (e)=>{
    if(e.target.className === "focused" || e.target.classList.contains("focus")){


        window.scrollTo({
            top: document.getElementById("rHead").offsetTop,
            left: document.getElementById("rHead").offsetLeft,
            behavior: 'smooth'
        })

    }
});

//Instantiating UTILL class
const utill = new UTILL();

// calling util methods
utill.showGoToTop();
utill.scrollUp();
utill.toggleTheme();

//Tooltip
window.addEventListener("mouseenter",(e)=>{
    if(e.target.className="language"){
        // utill.appendToolTip(e.x,e.y,"Programming language");
        console.clear();
        console.log("here");
    }
    else{
        console.clear();
        console.log(e.target.className);
    }
})

// const language = document.getElementById("language");
// language.addEventListener("mouseenter", utill.appendToolTip);
// language.addEventListener("mouseleave",utill.removeToolTip);