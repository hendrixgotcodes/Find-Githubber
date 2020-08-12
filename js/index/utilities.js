class UTILL{
    constructor(){
        this.go_toTop = document.querySelector(".go-toTop");
        this.toolTip = document.createElement("div");
        this.toolTip.className = "toolTip";
    }

    /****************"go_toTop UTILL METHODS"**************/
    showGoToTop(){
        window.addEventListener("scroll",()=>{

            if(window.pageYOffset > 580){
                this.go_toTop.classList.add("go-toTop---visible");
            }
            else{
                this.go_toTop.classList.remove("go-toTop---visible");
            }
        
        });
    }

    //scolls page up
    scrollUp(){
        this.go_toTop.addEventListener("click",(e)=>{
            window.scrollTo(
                {
                    top: document.getElementById("top").offsetTop,
                    left: document.getElementById("top").offsetLeft,
                    behavior: "smooth"
                }
            )
        });
    }


    /********************TOOL TIP ********************************/
    appendToolTip(offsetLeft,offsetTop,textContent){
        
        this.toolTip.offsetLeft = offsetLeft;
        this.toolTip.offsetTop = offsetTop;
        this.toolTip.textContent = textContent;
        document.body.appendChild(this.toolTip);
    }
    removeToolTip(){
        if(document.body.querySelector(".toolTip") !== null){
            this.toolTip.remove();
        }
    }



}