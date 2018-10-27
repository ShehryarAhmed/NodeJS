const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Bismillah')
    .then(() => { console.log('Connected to MongoDB...')})
    .catch(err => console.error('Cloud not Connected to MongoDB...',err))

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: {type: Date, default: Date.now},
    isPublished: Boolean
})    

const Course = mongoose.model('Course',courseSchema);


async function createCourses(){

    const course = new Course({
        name:'Math Courses',
        author:'Taha Ahmed',
        tags: ['node', 'backend'] ,
        isPublished:false
    });
    const result = await course.save();
    console.log(result)

}

//Equal opreater
//eq = (equal)
//ne = (not equal)
//gt = (greater than)
//gte = (greater than or equal to)
//lt = (less than)
//lte = (less than or equal to)
//in
//nin = not in


//logical Query
// or
// and

async function getCourses(){
    const course = await Course.
    // find({author:"shehryarAhmed", isPublished: true})
    // find({price: 10})
    //get more than 10 or equal to 10 
    //$ dollar sign Represent opreator
    //get courses 10 to 20 b/w
        // find({price:{$gte:10,lte:20}})
    //get courses only 10, 15 and 20 dollar price
    // find({price : {$in:[10,15,20]}})


    // find({author:"shehryarAhmed", isPublished: true})
    // find({author: /.*SHEHRYAR.*/i})
    // find({author: /SHEHRYAR&/i})
    find({author: /^SHEHRYAR/i})
    
    
        // find({author: /^ahmed/i})
        // .and([{author:"shehryarAhmed"}, {isPublished: false}])
        // .limit(10)
        // .sort({name:1})
        // .select({name:1});
        .count()
    console.log(course)
}

// createCourses();
getCourses();