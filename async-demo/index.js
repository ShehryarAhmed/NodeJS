function getUser(id){
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            console.log('Reading a User From a Database...')
            resolve({ id: id, gitHubUsername: 'Ali' } )
        },2000)
    })
}

function getRepositories(username) {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling GitHub API...');
            resolve(['repo1', 'repo2', 'repo3']);
          }, 2000);
    })
}
  
  function getCommits(repo) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling GitHub API...');
            resolve(repo);
          }, 2000);
      })

  }

getUser(1)
    .then( user => getRepositories(user.gitHubUsername))
    .then( repos => getCommits(repos[0]))
    .then(commits => console.log("commits",commits))