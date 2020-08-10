class UI {
  constructor() {
    this.profile_container = document.querySelector('.profile_container');
    this.profile = document.createElement('div');
    this.profile.className = "profile";
  }

  setProfile(data) {

    console.log(data);

    let innerObject = "";


    innerObject =
      `
            <div class="profile_picture">
              <img src="${data.avatar_url}" alt="Profile picture" />
              <a href="${data.html_url}" target="_blank">${this.nullPasser(data.name)}</a>
            </div>
  
            <div class="profile_details">
              <div class="profile_stats">
                <div class="profile_stat">
                  <h4>${data.public_repos}</h4>
                  <h3>Public Repositories</h3>
                </div>
                <div class="profile_stat">
                  <h4>${data.public_gists}</h4>
                  <h3>Public Gists</h3>
                </div>
                <div class="profile_stat">
                  <h4>${data.followers}</h4>
                  <h3>Followers</h3>
                </div>
                <div class="profile_stat">
                  <h4>${data.following}</h4>
                  <h3>Following</h3>
                </div>
              </div>
  
              <div class="profile_descript">
                <div class="profile_descript_items"><span>Company: ${data.company}</span></div>
                <div class="profile_descript_items"><span>Website/Blog: ${data.blog}</span></div>
                <div class="profile_descript_items"><span>Location: ${data.location}</span></div>
                <div class="profile_descript_items"><span>Joined On: ${data.created_at}</span></div>
              </div>
            </div>
            `;

    this.profile.innerHTML = innerObject;

    // if (data.name === undefined || data === null) {

    //   if (this.profile_container.querySelector(".img") === null) {


    //     const img = document.createElement("img");
    //     img.src = "../img/undraw_the_search_s0xf.svg";
    //     img.className = "img";

    //     this.profile_container.appendChild(img);


    //   }
    //   return;

    // }

    if (this.profile_container.querySelector('.profile') === null) {
      this.profile_container.innerHTML = "";

      this.profile_container.appendChild(this.profile);

    } else if (this.profile_container.querySelector('.profile') !== null) {
      this.profile.innerHTML = innerObject;
      this.profile_container.replaceChild(this.profile, this.profile_container.querySelector('.profile'))

    }

  }

  clearProfile() {
    this.profile_container.innerHTML = `<img class="img" src="./img/error.png" alt="Sorry an error ocuured">`;
  }

  // Sets the background to an image
  setBG() {
    this.profile_container.innerHTML = `<img class="img" src="./img/search.png" alt="">`;
  }


  // Function which replaces null with visit profile
  nullPasser(nll) {
    if (nll === null) {
      return "Visit Profile";
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
    }, 5000)
  }

  checkOnlineAvailabilty() {
    if (navigator.onLine) {
      this.setAlert("online");
    } else {
      this.setAlert("offline");
    }
  }

}