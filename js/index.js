const form = document.getElementById('github-form');
const searchInput = document.getElementById('search');
const userList = document.getElementById('user-list');
const reposList = document.getElementById('repos-list');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchValue = searchInput.value;
  searchUsers(searchValue);
});

async function searchUsers(searchValue) {
  const url = `https://api.github.com/search/users?q=${searchValue}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayUsers(data.items);
  } catch (err) {
    console.log(err);
  }
}

function displayUsers(users) {
  userList.innerHTML = '';
  users.forEach((user) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <img src='${user.avatar_url}' alt='${user.login}' />
      <h4>${user.login}</h4>
      <button class='repos-btn' data-repos_url='${user.repos_url}'>Show Repos</button>
    `;
    userList.appendChild(li);
  });

  const reposBtns = document.querySelectorAll('.repos-btn');
  reposBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const reposUrl = btn.getAttribute('data-repos_url');
      displayRepos(reposUrl);
    });
  });
}

async function displayRepos(reposUrl) {
  try {
    const res = await fetch(reposUrl);
    const repos = await res.json();
    displayRepoList(repos);
  } catch (err) {
    console.log(err);
  }
}

function displayRepoList(repos) {
  reposList.innerHTML = '';
  repos.forEach((repo) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <a href='${repo.html_url}' target='_blank'>${repo.name}</a>
    `;
    reposList.appendChild(li);
  });
}