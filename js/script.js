// Target div.overview
const divOverview = document.querySelector(".overview");
// Global var, add github username
const username = 'driyant';

// Fetch API JSON Data
const apiData = async() => {
    const url = `https://api.github.com/users/${username}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    // Call display functiion
    fetchData(data);
}

// Call function API
apiData();

const fetchData = (data) => {
    const divUserInfo = document.createElement("div");
    divUserInfo.classList.add("user-info");
    divUserInfo.innerHTML = 
        `<figure>
            <img alt="user avatar" src=${data.avatar_url} />
        </figure>
        <div>
            <p><strong>Name :</strong> ${data.name}</p>
            <p><strong>Bio :</strong> ${data.bio}</p>
            <p><strong>Location :</strong> ${data.location}</p>
            <p><strong>Number of public repos :</strong> ${data.public_repos}</p>
        </div>`
    divOverview.appendChild(divUserInfo);
}

