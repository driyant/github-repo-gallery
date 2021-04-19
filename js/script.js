// Target div.overview
const divOverview = document.querySelector(".overview");
// Target ul.repo-list
const ulRepoList = document.querySelector(".repo-list");
// Global var, add github username
const username = 'driyant';

// Fetch API JSON Data
const apiData = async() => {
    const url = `https://api.github.com/users/${username}`;
    const res = await fetch(url);
    const dataInfo = await res.json();
    //console.log(data);
    // Call display functiion
    fetchData(dataInfo);
}

// Call function API
apiData();

const fetchData = (dataInfo) => {
    const divUserInfo = document.createElement("div");
    divUserInfo.classList.add("user-info");
    divUserInfo.innerHTML = 
        `<figure>
            <img alt="user avatar" src=${dataInfo.avatar_url} />
        </figure>
        <div>
            <p><strong>Name :</strong> ${dataInfo.name}</p>
            <p><strong>Bio :</strong> ${dataInfo.bio}</p>
            <p><strong>Location :</strong> ${dataInfo.location}</p>
            <p><strong>Number of public repos :</strong> ${dataInfo.public_repos}</p>
        </div>`
    divOverview.appendChild(divUserInfo);
}

const fetchRepoList = async() => {
    const url = `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`;
    const res = await fetch(url);
    const dataRepo = await res.json();\
    // Call display function
    displayRepo(dataRepo);
}

fetchRepoList();

// Display Info
const displayRepo = (dataRepo) => {
    for(const repoItem of dataRepo) {
        //console.log(repoItem);
        const el = document.createElement("li");
        el.classList.add("repos");
        el.innerHTML = `<h3>${repoItem.name}</h3>`;
        ulRepoList.appendChild(el);
    }
}