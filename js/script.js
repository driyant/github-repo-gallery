// Target div.overview
const divOverview = document.querySelector(".overview");
// Target ul.repo-list
const ulRepoList = document.querySelector(".repo-list");
// Target sec.repos
const secRepoList = document.querySelector(".repos");
// Target section.repo-data
const secRepoData = document.querySelector(".repo-data");
// Target button back to repo
const btnBackToRepo = document.querySelector(".view-repos");
// Target input 'search by name'
const filterInput = document.querySelector(".filter-repos");
// Global var, add github username
const username = 'driyant';

// Fetch API JSON Data
const apiData = async () => {
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

const fetchRepoList = async () => {
    const url = `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`;
    const res = await fetch(url);
    const dataRepo = await res.json();
    // Call display function
    displayRepo(dataRepo);
    // Show searchbox 
    filterInput.classList.remove("hide");
}

fetchRepoList();

// Display Info
const displayRepo = (dataRepo) => {
    for (const repoItem of dataRepo) {
        //console.log(repoItem);
        const el = document.createElement("li");
        el.classList.add("repo");
        el.innerHTML = `<h3>${repoItem.name}</h3>`;
        ulRepoList.appendChild(el);
    }
}

// Add event listener for ul click
ulRepoList.addEventListener("click", (event) => {
    // Check if it matches with h3
    if (event.target.matches("h3")) {
        // console.log("Match!");
        const repoName = event.target.innerText;
        // console.log(repoName);
        certainRepo(repoName);
    }
});


// Create function to spesific repo
const certainRepo = async (repoName) => {
    const url = `https://api.github.com/repos/${username}/${repoName}`;
    const repoInfo = await fetch(url);
    const repoCurrentData = await repoInfo.json();
    //console.log(repoCurrentData);
    const fetchLanguageUrl = repoCurrentData.languages_url;
    // looping list the languages.url
    // fetch lang data
    const fetchLanguage = await fetch(fetchLanguageUrl);
    const languageData = await fetchLanguage.json();
    // create an empty array
    const arrLanguages = [];
    for (const languagesItem in languageData) {
        arrLanguages.push(languagesItem);
    }
    certainInfo(repoCurrentData, arrLanguages);
}

// Create an array of languages
const certainInfo = (repoCurrentData, arrLanguages) => {
    secRepoData.innerHTML = "";
    secRepoData.classList.remove("hide");
    secRepoList.classList.add("hide");
    // Create div
    const div = document.createElement("div");
    div.innerHTML =
    `<h3>Name: ${repoCurrentData.name}</h3>
    <p>Description: ${repoCurrentData.description}</p>
    <p>Default Branch: ${repoCurrentData.default_branch}</p>
    <p>Languages: ${arrLanguages.join(", ")}</p>
    <a class="visit" href="${repoCurrentData.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    secRepoData.appendChild(div);
    btnBackToRepo.classList.remove("hide");
}

// Add click event to the back button
btnBackToRepo.addEventListener("click", () => {
    secRepoList.classList.remove("hide");
    secRepoData.classList.add("hide");
    btnBackToRepo.classList.add("hide");
});

// Add input event for dynamic search
filterInput.addEventListener("input", (event) => {
    // Get value
    let getValue = event.target.value;
    // select all elements .repo
    const repos = document.querySelectorAll(".repo");
    // console.log(repos);
    // make it lowercase
    getValue = getValue.toLowerCase();
    console.log(getValue);
    for (const element of repos) {
        // make list item innertext into lowercase
        const liLowerCase = element.innerText.toLowerCase();
        if (liLowerCase.includes(getValue)) {
            element.classList.remove("hide");
        } else {
            element.classList.add("hide");
        }
    }
});