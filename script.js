class User {
  constructor(data) {
    this.repos = data.public_repos;
    this.gists = data.public_gists;
    this.following = data.following;
    this.followers = data.followers;
    this.company = data.company;
    this.blog = data.blog;
    this.location = data.location;
    this.userSince = data.created_at.slice(0, 10);
    this.imgSrc = data.avatar_url;
  }
}

async function logJSONData(name) {
  const responce = await fetch('https://api.github.com/users/' + name);
  const jsonData = await responce.json();
  if (responce.ok === true) {
    saveData(jsonData);
  } else {
    showError();
  }
}

function saveData(jsonData) {
  const user = new User(jsonData);
  showData(user);
}

function showData(data) {
  document.getElementById(
    'userBox'
  ).innerHTML = `<div class='left-section'><img src="${data.imgSrc}" class='user-img' /></div>
    <div class='right-section'>
      <div class='user-numbers'>
        <div>Public Repos: ${data.repos}</div>
        <div>Public Gists: ${data.gists}</div>
        <div>Followers: ${data.followers}</div>
        <div>Following: ${data.following}</div>
      </div>
      <div class='user-info-container'>
        <div class='user-info'>Company: ${data.company}</div>
        <div class='user-info'>Website/Blog: ${data.blog}</div>
        <div class='user-info'>Location: ${data.location}</div>
        <div class='user-info'>Member Since: ${data.userSince}</div>
      </div>
    </div>
    `;
}

function showError() {
  document.getElementById('userBox').innerHTML = `<div class='error'>
    <div class='error-head'>Error!!</div>
    <div class='error-msg'>Inactive User or UserName not found</div>
  </div>`;
}
// 버튼 눌렀을 때
const searchButton = document.getElementById('searchBtn');
searchButton.addEventListener('click', (event) => {
  event.preventDefault();

  let username = document.getElementById('userName').value;
  let originalName = username.split(' ').join('');
  logJSONData(originalName);
  // fetch('https://api.github.com/users/' + originalName)
  // .then((result) => result.json())
  // .then((data) => {
  //   console.log(data);

  //   document.getElementById(
  //     'userBox'
  //   ).innerHTML = `<div class='left-section'><img src="${data.avatar_url}" class='user-img' /></div>
  //   <div class='right-section'>
  //     <div class='user-numbers'>
  //       <div>Public Repos: ${data.public_repos}</div>
  //       <div>Public Gists: ${data.public_gists}</div>
  //       <div>Followers: ${data.followers}</div>
  //       <div>Following: ${data.following}</div>
  //     </div>
  //     <div class='user-info-container'>
  //       <div class='user-info'>Company: ${data.company}</div>
  //       <div class='user-info'>Website/Blog: ${data.blog}</div>
  //       <div class='user-info'>Location: ${data.location}</div>
  //       <div class='user-info'>Member Since: ${data.created_at}</div>
  //     </div>
  //   </div>
  //   `;
  // });
});
