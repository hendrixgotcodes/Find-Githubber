class UTILL {
    constructor() {
        //Selecting go-toTop div element
        this.go_toTop = document.querySelector(".go-toTop");

        //Selecting darkmode-lightmode toggler checkbox
        this.navBarCheckBox = document.querySelector(".navBar_cB");
        this.toggler = document.querySelector(".navBar_toggler");
        this.light = document.querySelector(".material-icons");

        this.light2 = document.createElement("span");
        this.light2.className = "material-icons";
        this.light2.classList.add("new");
        this.light2.innerText = "flare";

        this.dark = document.createElement('i');
        // this.dark.classList.add("fas");
        this.dark.classList.add("fas", "fa-moon");

        // Selecting darkmode themes
        this.theme_text = document.querySelectorAll(".theme--text");
        this.theme_border = document.querySelectorAll(".theme--border");
        this.body = document.querySelector("body");


        //Creating tooltip div
        this.toolTip = document.createElement("div");
        this.toolTip.className = "toolTip";
    }

    /****************"go_toTop UTILL METHODS"**************/
    showGoToTop() {
        window.addEventListener("scroll", () => {

            if (window.pageYOffset > 580) {
                this.go_toTop.classList.add("go-toTop---visible");
            } else {
                this.go_toTop.classList.remove("go-toTop---visible");
            }

        });
    }

    //scolls page up
    // scrollUp() {
    //     window.addEventListener("click", (e) => {

           

    //     });

    // }


    /********************TOOL TIP ********************************/
    appendToolTip(offsetLeft, offsetTop, textContent) {

        this.toolTip.offsetLeft = offsetLeft;
        this.toolTip.offsetTop = offsetTop;
        this.toolTip.textContent = textContent;
        document.body.appendChild(this.toolTip);
    }
    removeToolTip() {
        if (document.body.querySelector(".toolTip") !== null) {
            this.toolTip.remove();
        }
    }



    /******************DarkMode Light Mode Toggler****************/
    toggleTheme() {

        this.navBarCheckBox.addEventListener("change", (e) => {

            // Switching between icons
            if (this.toggler.querySelector(".old")) {
                this.toggler.replaceChild(this.dark, this.light);
            } else if (this.toggler.querySelector(".new")) {
                this.toggler.replaceChild(this.dark, this.light2);
            } else {
                this.toggler.replaceChild(this.light2, this.dark);
            }

            this.body.classList.toggle("darkmode--background");
            this.theme_text.forEach((element) => {
                element.classList.toggle("darkmode--text");
            });


            this.theme_border.forEach((element) => {
                element.classList.toggle("darkmode--border");
            })
        });

    }




}