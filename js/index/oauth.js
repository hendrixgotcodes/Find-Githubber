class oauth{
    constructor(){
        this.id = "393cfdf097c82fb37835";
        this.secret = "b4f3f3ac6da3fd1134dfe9db32b6c9af4fa53a59";
    }

    async getUser(userName){
        let profileResponse =  await fetch(`https://api.github.com/users/${userName}?client_id=${this.id}&client_secrets=${this.secret}`);

        const profile = await profileResponse.json();

        return profile;
    }
}