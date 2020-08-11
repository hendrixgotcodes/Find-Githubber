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
                if (data.profile.message === "Not Found" || data.name === null) {

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


window.addEventListener("resize", (e) => {
    console.log(window.innerWidth);
})

//Constantly checking for online avialability

// setInterval(() => {
//     if (navigator.onLine) {
//         ui.setWaring('online');
//         console.log("online")
//     }
// }, 5000);

window.addEventListener("online", () => {
    ui.checkOnlineAvailabilty;
    console.log("onlime")
});
window.addEventListener("offline", () => {
    ui.checkOnlineAvailabilty;
    console.log("offline");
})