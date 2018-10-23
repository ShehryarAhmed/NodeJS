const p = Promise.resolve({id : 1});
// p.then(result => console.log(result))

// const p = Promise.reject(new Error('Reason For Rejection...'));
// p.catch(error => console.log(error))

const p1 = new Promise((resolve) => {
    setTimeout(() =>{
        console.log("Starting P1")
    },2000)
});

const p2 = new Promise((resolve) => {
    setTimeout(() =>{
        console.log("Starting P2")
    },2000)
});


Promise.race([p1,p2]).then(result => {console.log("result",result)})