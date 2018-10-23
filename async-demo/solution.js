async function notifiyCustomer(){
    const user = await getCustomer(1);
    console.log("customer",user)
    if(user.isGold){
        const movies = await getTopMovies();
        console.log("top movies",movies)
        await sendEmail(user.email,movies);
        console.log('Email Sent...')
    }

}

notifiyCustomer();

function getCustomer(id) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ 
              id: id, 
              name: 'Mosh Hamedani', 
              isGold: true, 
              email: 'email' 
            });
          }, 4000);  
    })
  }
  
  function getTopMovies() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(['movie1', 'movie2']);
          }, 4000);
      })
  
  }
  
  function sendEmail(email, movies) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
          }, 4000);
      })
  }