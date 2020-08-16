/**THIS UI CLASS IS A PROTOTYPE WHICH CONTAINS
SEVERAL METHODS FOR UPDATING THE DOM
**/

"use strict";

class UI {
  constructor() {
    //Creating DOM Elements
    this.profile = document.createElement('div');
    this.profile.className = "profile";

    //GETTING DOM ELEMENTS
    this.profile_container = document.querySelector('.profile_container');
    this.page = document.querySelector('.indexPage');
    this.body = document.querySelector('.body');

    this.reposDOM = document.querySelector(".repos");

  }

  /** Function updates the DOM with github users based on user 
  inputs 
**/
  setProfile(data) {


    let innerObject = "";

    if (data.public_repos > 10) {
      this.morethan10 = true;
    }


    innerObject =
      `
            <div class="profile_picture">
              <img src="${data.avatar_url}" alt="Profile picture" />
              <a href="${data.html_url}" target="_blank">${this.profileNullPasser(data.name)}</a>
            </div>
  
            <div class="profile_details">
              <div class="profile_stats">
                <div class="profile_stat focus">
                  <h4 class="profile_stat_header focused theme--text">${data.public_repos}</h4>
                  <h3 class="profile_stat_header focused theme--text">Public Repositories</h3>
                </div>
                <div class="profile_stat">
                  <h4 class="profile_stat_header theme--text">${data.public_gists}</h4>
                  <h3 class="profile_stat_header theme--text">Public Gists</h3>
                </div>
                <div class="profile_stat">
                  <h4 class="profile_stat_header theme--text">${data.followers}</h4>
                  <h3 class="profile_stat_header theme--text">Followers</h3>
                </div>
                <div class="profile_stat">
                  <h4 class="profile_stat_header theme--text">${data.following}</h4>
                  <h3 class="profile_stat_header theme--text">Following</h3>
                </div>
              </div>
  
              <div class="profile_descript">
                <div class="profile_descript_items"><span>Company: ${this.nullPasser(data.company)}</span></div>
                <div class="profile_descript_items"><a href="${this.nullPasser(data.blog)}" target="_blank">Website/Blog </a></div>
                <div class="profile_descript_items"><span>Location: ${this.nullPasser(data.location)}</span></div>
                <div class="profile_descript_items"><span>Joined: ${this.getTime(data.created_at)}</span></div>
              </div>
            </div>
            `;

    this.profile.innerHTML = innerObject;

    if (this.profile_container.querySelector('.profile') === null) {

      this.clearAlert("infoAlertShown");

      this.profile_container.innerHTML = "";

      this.profile_container.appendChild(this.profile);

    } else if (this.profile_container.querySelector('.profile') !== null) {


      this.profile.innerHTML = innerObject;
      this.profile_container.replaceChild(this.profile, this.profile_container.querySelector('.profile'))

    }

  }

  //Function to display repos in UI
  setRepos(repos) {

    if (repos.length === 0) {
      this.reposDOM.innerHTML = "No repos for this user";
      return;
    }

    let reposInnerHtml = ""

    repos.forEach((repo) => {


      reposInnerHtml +=
        `<div class="repo">
      <a class="repo_title" target="_blank" href="${repo.html_url}">${repo.name}</a>
      <p class="repo_description">${this.nullPasser(repo.description)}</p>
  
      <span class="update"><span class="repo_time">Last Updated At: </span>${this.getTime(repo.updated_at)}</span>
      <div class="repo_awards">
        
        <span id="language" class="language repo_award">
        <i class="fas fa-wrench"></i>:  <span>${this.nullPasser(repo.language)}</span>
        </span>

        <span class="stars repo_award">
        <i class="fas fa-star"></i>: <label>${repo.stargazers_count}</label>
        </span>

        <span class="forks repo_award">
        <i class="fas fa-project-diagram"></i>: <label>${repo.forks}</label>
        </span>
      </div>
      
      </div>
      `

    });



    this.reposDOM.innerHTML = reposInnerHtml;


    // if(this.reposDOM.innerHTML === ""){
    //   this.reposDOM.innerHTML === "No repositories available for this user";
    // }




  }

  //Function to be called when user is not found
  profileNotFound() {
    this.showAlert("infoAlert", "⚠️Sorry. User Not Found!");
    this.profile_container.innerHTML = `<img class="img" src="./img/error.png" alt="Sorry an error ocuured">`;
    document.querySelector(".repos").innerHTML = "";
  }

  // Sets the background to an image
  setBG() {
    this.profile_container.innerHTML = `<img class="img" src="./img/search.png" alt="">`;
    document.querySelector(".repos").innerHTML = "";

  }


  // Function which replaces null with visit profile
  profileNullPasser(nll) {
    if (nll === null) {
      return "Visit Profile";
    }
    return nll;
  }

  nullPasser(nll){
    if(nll === null){
      return "Unavailable";
    }
    return nll;
  }


  setAlert(className) {
    const warn = document.createElement('div');
    warn.className = className;

    if (className === "online") {
      warn.innerText = "You are now online";

    } else if (className === "offline") {
      warn.innerText = "You are offfline. Please reconnect!"
    }
    document.body.appendChild(warn);

    setTimeout(() => {
      warn.classList.toggle("pushed");

    }, 300);

    setTimeout(() => {
      document.body.removeChild(warn);
    }, 3000)
  }

  checkOnlineAvailabilty() {
    if (navigator.onLine) {
      this.setAlert("online");
    } else {
      this.setAlert("offline");
    }
  }

  //Alert Notifications
  showAlert(alertType, textContent) {

    this.clearAlert(alertType);

    const alert = document.createElement("div");
    alert.className = alertType;

    this.page.insertBefore(alert, this.body);

    // TimeOut to change the class of "alert" after 1 milliseconds, this will create an animation
    setTimeout(() => {
      alert.classList.toggle(alertType + "Shown");
      alert.textContent = textContent;
    }, 100);

    //Removes "alert" from DOM after 5.1s
    setTimeout(() => {
      setTimeout(() => {
        alert.classList.toggle(alertType);
      }, 100)
      this.page.removeChild(alert);
    }, 3100);
  }

  //Remove alertBox if any two prevent multiple instances
  clearAlert(alertType) {
    const alertBox = document.querySelector("." + alertType);
    if (alertBox) {
      alertBox.remove();
    }
  }

  getTime(date) {
    // Date taken as argument
    let firstDay = new Date(date);

    // Current Date
    let today = new Date();

    //Time Unit
    let unit = ""

    //Finding difference between dates
    let lastUpdated = today.getTime() - firstDay.getTime();

    // Converting date into days
    lastUpdated = lastUpdated / (1000 * 3600 * 24);




    if (lastUpdated > 365) {

      lastUpdated = Number.parseInt(lastUpdated / 365);


      if (lastUpdated > 1) {
        unit = "years";
      } else {
        unit = "year";
      }
    } 
    else if (lastUpdated > 30 && lastUpdated < 365 && lastUpdated >= 1) {

        lastUpdated = parseInt(lastUpdated / 30);

        if (lastUpdated === 1) {
          unit = "month";
        } else {
          unit = "months";
        }

    } 
    else if (lastUpdated === 1 ) {
        unit = "day";
    } 
    else if(lastUpdated < 1){
      lastUpdated = lastUpdated * 24;
      
      unit = "hours";
      console.log(`LAST UPDATED: ${lastUpdated}`);
    }
    else {
        unit = "days";
      }
  

    return `${Number.parseInt(lastUpdated)}  ${unit}  ago`;
  }

  splitDecimal(decimal){

    decimal = decimal.toString();

    let splittedDecimal = decimal.split(".");

    return splittedDecimal;

  }


  replaceNavBar() {
    const navBarContainer = document.querySelector(".navBar_container");
    const navBar = document.querySelector(".navBar_links");
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.className = "harmBurgerMenuCheckbox";


    const hamBurgerMenu = document.createElement("div");
    hamBurgerMenu.className = "harmBurgerMenu";

    if (navBarContainer.querySelector(".navBar_links") !== null) {

      navBarContainer.replaceChild(hamBurgerMenu, navBar);
      navBarContainer.appendChild(checkBox);
    }

  }

  replaceNavBarInverse(){
    const navBarContainer = document.querySelector(".navBar_container");
    const navBar = document.createElement("div");
     navBar.innerHTML = 
     ` <a href="" class="navBar_link theme--text">Home</a>
     <a href="#" class="navBar_link theme--text">Options</a>
     <a href="" class="navBar_link theme--text">Docs</a>
     `;

     navBar.className = "navBar_links";


    const hamBurgerMenu = document.querySelector(".harmBurgerMenu");
    const checkBox = document.querySelector(".harmBurgerMenuCheckbox");

    if (navBarContainer.querySelector(".harmBurgerMenu") !== null) {


      navBarContainer.replaceChild(navBar,hamBurgerMenu);
      navBarContainer.removeChild(checkBox);

    }
    
  }
  
  addNavBox_links(){
    
    const searchBox = this.body.querySelector(".searchBox");

    const navBoxLinks = document.createElement("div");
    navBoxLinks.className = "navbox_links";


    navBoxLinks.innerHTML =
    `<a href="">Home</a>
     <a href="">Options</a>
     <a href="">Docs</a>
    `;

    if(this.body.querySelector(".navbox_links") ===null){
      this.body.insertBefore(navBoxLinks,searchBox);
    }

    else if(this.body.querySelector(".navbox_links") !==null){

    const addedNBL = this.body.querySelector(".navbox_links");

     this.body.removeChild(addedNBL);
    }
  }



}