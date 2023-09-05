import { Octokit } from 'https://esm.sh/octokit';
import { config } from './config.js';

const PERSONAL_ACCESS_TOKEN = config.PERSONAL_ACCESS_TOKEN;

// 버튼 눌렀을 때
const searchButton = document.getElementById('searchBtn');
searchButton.addEventListener('click', (event) => {
  event.preventDefault();

  let username = document.getElementById('userName').value;
  let originalName = username.split(' ').join('');
  fetch('https://api.github.com/users/' + originalName)
    .then((result) => result.json())
    .then((data) => {
      console.log(data);

      document.getElementById(
        'userBox'
      ).innerHTML = `<div class='left-section'><img src="${data.avatar_url}" class='user-img' /></div>
      <div class='right-section'>
        <div class='user-numbers'>
          <div>Public Repos: ${data.public_repos}</div>
          <div>Public Gists: ${data.public_gists}</div>
          <div>Followers: ${data.followers}</div>
          <div>Following: ${data.following}</div>
        </div>
        <div class='user-info-container'>
          <div class='user-info'>Company: ${data.company}</div>
          <div class='user-info'>Website/Blog: ${data.blog}</div>
          <div class='user-info'>Location: ${data.location}</div>
          <div class='user-info'>Member Since: ${data.created_at}</div>
        </div>
      </div>
      `;
    });
});
