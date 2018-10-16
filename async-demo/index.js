console.log('Before');

getUser(1, (user) =>{
    getRepositories(user.gitHubUsername, (repo) => {
        console.log('repos',repo)
        getCommets(repo,(commits) =>{
            console.log("comments")
        });
    });
}); 

console.log('After');

//three pattrens for deal Asynchoruns Code call backs
// callbacks
// promises
// Async/await


function getUser(id, callback){
    
    setTimeout(() => {
        console.log("Reading a user from a Database...")
        callback({id: id, gitHubUsername : 'ali'}); 
        

    },2000);

}


function getRepositories(username,callback){
    setTimeout(()=> {
        console.log("Calling Github API...");
        callback(['repo1', 'repo2','repo3']);
    }, 2000)
 
}