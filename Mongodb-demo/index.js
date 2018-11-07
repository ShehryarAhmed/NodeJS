const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Bismillah')
    .then(() => { console.log('Connected to MongoDB...')})
    .catch(err => console.error('Cloud not Connected to MongoDB...',err))

const courseSchema = new mongoose.Schema({
    // name: String ,
    name: {
        type: String,
        required:true,
        minlength:5,
        maxlength:255,
        // match:/pattren/
    },    
    category:{
        type: String, 
        required: true,
        enum: ['web','mobile','network']
    },
    author: String,
    tags: [ String ],
    date: {type: Date, default: Date.now},
    isPublished: Boolean,
    // price: Number
    price: {type: Number,
            required: function(){ return this.isPublished;}}
})    

const Course = mongoose.model('Course',courseSchema);


async function createCourses(){

    const course = new Course({
        name:'Math Courses',
        category:'web',
        author:'Taha Ahmed',
        tags: ['node1', 'backend2','node3', 'backend4'] ,
        isPublished:false,
        // price:1200
    });
    try{
        const isValid = await course.validate();
        if(isValid){
            console.log('result')
        }else{
            console.log('else')
        }
        const result = await course.save();
        // console.log(result,'result')
    }catch(ex){
        console.log(ex.message,'message');
    }
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

    const pageNumber = 2;
    const pageSize = 1;

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
    // find({author: /^SHEHRYAR/i})
    
    
        // find({author: /^ahmed/i})
        // .and([{author:"shehryarAhmed"}, {isPublished: false}])
        // .limit(10)
        // .sort({name:1})
        // .select({name:1});
        find()
        .skip((pageNumber -1)*pageSize)
        .limit(pageSize)
        
    console.log(course)
}

createCourses();
// getCourses();