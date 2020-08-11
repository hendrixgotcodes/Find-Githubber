class oauth{
    constructor(){
        this.id = "393cfdf097c82fb37835";
        this.secret = "b4f3f3ac6da3fd1134dfe9db32b6c9af4fa53a59";
        this.repos_per_page = 10;
        this.sort_repos_by = "created: asc";
    }

    async getUser(userName){
        let profileResponse =  await fetch(`https://api.github.com/users/${userName}?client_id=${this.id}&client_secret=${this.secret}`);

        let repoResponse =  await fetch(`https://api.github.com/users/${userName}/repos?per_page=${this.repos_per_page}&sort=${this.sort_repos_by}&client_id=${this.id}&client_secret=${this.secret}`);

        let repos =  await repoResponse.json();

        const profile = await profileResponse.json();

        return {profile, repos};
    }
}