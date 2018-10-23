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
            console.log('Calling GitHub API...',username);
            // resolve(['repo1', 'repo2', 'repo3']);
            reject(new Error("Error on repos"))
          }, 2000);
    })
}
  
  function getCommits(repo) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling GitHub API...',repo);
            resolve(repo);
          }, 2000);
      })

  }

  //promised-based approach'
  
    //  getUser(1)
    // .then( user => getRepositories(user.gitHubUsername))
    // .then( repos => getCommits(repos[2]))
    // .then(commits => console.log("commits",commits))
    // .catch(err => console.log('Error',err.message))


    //Asyn and await
    console.log("Before")

    async function displayCommits(){
        try{
            const user = await getUser(1);
            const repos =  await getRepositories(user.gitHubUsername);
            const commits = await getCommits(repos[0])
            console.log(commits)
        }catch(err){
            console.log("Error",err.message)
        }
       
    }

    displayCommits();
    console.log("After")


