//Getting searchbox
const searchbox = document.querySelector('.textBox');
const ui = new UI();

const profile_container = document.querySelector('.profile_container');


//Creating an instance of the oauth object
const getGithub = new oauth();

searchbox.addEventListener('keyup', (e) => {

    if (e.target.value !== "") {
        getGithub.getUser(e.target.value)
            .then((data) => {
                if (data.message === "Not Found" || data.name === undefined || data.name === null) {
                    ui.clearProfile();
                } else {
                    ui.setProfile(data)
                }
            });
    } else if (e.target.value === "") {
        ui.setBG();
    }



});


window.addEventListener("resize", (e)=>{
    console.log(window.innerWidth);
})

//Constantly checking for online avialability

// setInterval(() => {
//     if (navigator.onLine) {
//         ui.setWaring('online');
//         console.log("online")
//     }
// }, 5000);

window.addEventListener("online",()=>{
    ui.checkOnlineAvailabilty;
    console.log("onlime")
});
window.addEventListener("offline",()=>{
    ui.checkOnlineAvailabilty;
    console.log("offline");
})