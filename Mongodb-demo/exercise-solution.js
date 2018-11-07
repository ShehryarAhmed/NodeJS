const mongoose = require('mongoose');

    mongoose.connect('mongodb://localhost/mongo-exercises')
        .then(() => { console.log('Connected to MongoDB...')})
        .catch(err => console.errord('Cloud not Connected to MongoDB...',err))

const courseSchema = new mongoose.Schema({
        _id : String,
        name: String,
        author: String,
        tags: [ String ],
        date: {type: Date, default: Date.now},
        isPublished: Boolean,
        price: Number,
        __v: Number
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

    course.isPublished = false;
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
async function getCoursesByID(){
    
    const course = await Course
    // .findById('5a68fdf95db93f6477053ddd')
    .find({ __v : 0})
    .count()
    console.log(course)

    
}
// runUpdate('5a68fdd7bee8ea64649c2777');
// run();
// getCoursesByID();






//update first
async function updateCoursesUpdateFirst(dd){
    
    const result = await Course.findByIdAndUpdate(dd,
        {$set: { author : 'Fakhir',  isPublished: false }},
        {new : 1}
    );

    // both are identical way to update data
    // course.set({
    //     isPublished: true,
    //     author:'Another Author'
    // })

    // return await course.save();
    console.log(result)
 }


//  updateCoursesUpdateFirst('5a68fdd7bee8ea64649c2777')

//remove document

async function removeDocument(id){
    // const result = await Course.deleteOne({ _id: id});
    const courses = await Course.findByIdAndRemove(id)
    console.log(courses)
}

removeDocument('5a68fdd7bee8ea64649c2777')