const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => { console.log('Connected to MongoDB...')})
    .catch(err => console.error('Cloud not Connected to MongoDB...',err))

const courseSchema = new mongoose.Schema({
        name: String,
        author: String,
        tags: [ String ],
        date: {type: Date, default: Date.now},
        isPublished: Boolean,
        price: Number
    })    
const Course = mongoose.model('Course',courseSchema);
    
async function getCourses(){

    return await Course
    // .find({isPublished:true, tags: {$in: ['backend','frontend']} })
    .find({isPublished:true})
    .or([
        {price:{$gte:15}},
        {name: /.*by.*/i}
        ])
    
    .sort({ price: -1})
    .select({name : 1, author : 1, price : 1})
    // console.log(course)    
    
}      

async function run(){
    const courses = await getCourses();
    console.log(courses)
}




//Query First
async function updateCourses(dd){
    const course = await Course.findById(dd)
    console.log(course,"gfsg")
    if(!course) return;

    course.isPublished = true;
    course.author = 'Another Author';

    // both are identical way to update data
    // course.set({
    //     isPublished: true,
    //     author:'Another Author'
    // })

    return await course.save();
    // console.log(result)
 }

 async function runUpdate(id){
    const update = await updateCourses(id);
    console.log(update)
}
runUpdate('5a68ff090c553064a218a547');
// run();