const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground' )
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author: authorSchema
  })
);

async function createCourse(name, author) {
  const course = new Course({
    name, 
    author  
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId){

  // const course = await Course.update({_id: courseId}, {
  //   $set : {
  //     'author.name':'Abcd Author'
  //   }
  // });

  const course = await Course.findById(courseId);
  console.log('course',course)
  course.author.name = 'Mosh Hamedani';
  course.save();
}

createCourse('Node Course New', new Author({ name: 'Mosh' }));
// updateAuthor('5bee73af0553083118dc1d2d')