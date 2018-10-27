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
        name:'Node.js Courses',
        author:'shehryarAhmed',
        tags: ['node', 'backend'] ,
        isPublished:true
    });
    const result = await course.save();
    console.log(result)

}


async function getCourses(){
    const course = await Course.
    find({author:"shehryarAhmed", isPublished: true})
        .limit(10)
        .sort({name:1})
        .select({name:1});
    console.log(course)
}

// createCourses();
getCourses();