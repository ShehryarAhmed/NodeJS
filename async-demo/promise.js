const p = new Promise((resolve, reject) =>{
    //kick off some async work
    //...
    setTimeout(()=>{
        resolve(0) // pending => resolved, fulfilled 
        reject(new Error('message')) // pending => rejected
    }, 2000)
})

p.then(result => console.log('Results',result))
.catch(err => console.log('Error',err));