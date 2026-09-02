//*------MongoDB Practical Demonstration-------*//

// 1. Database & Collection Setup.
//=================================

test> use studentDB
switched to db studentDB
studentDB> db.createCollection("students")
{ ok: 1 }
studentDB> show collections
students
studentDB>

// 2. Insert Operations.
//=======================

// 2a. Inserting one document — insertOne()
//===========================================

studentDB> db.students.insertOne({
     name: "Jack",
     age: 22,
     course: "MERN Stack",
     status: "enrolled"
 })
{
  acknowledged: true,
  insertedId: ObjectId('6a95a3bae46d4efc19f94c3c')
}
studentDB>

// 2b. Inserting multiple documents — insertMany()
//=================================================

studentDB>db.students.insertMany([
    {
        name: "John",
        age: 21,
        course: "MERN Stack",
        status: "enrolled"
    },
    {
        name: "Joshua",
        age: 23,
        course: "Python",
        status: "completed"
    },
    {
        name: " Kristen",
        age: 20,
        course: "Java",
        status: "enrolled"
    },
    {
        name: " Daniel",
        age: 24,
        course: "MERN Stack",
        status: "completed"
    },
    {
        name: "Sam",
        age: 19,
        course: "Python",
        status: "enrolled"
    }
])
{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId('6a95a4c0e46d4efc19f94c3d'),
    '1': ObjectId('6a95a4c0e46d4efc19f94c3e'),
    '2': ObjectId('6a95a4c0e46d4efc19f94c3f'),
    '3': ObjectId('6a95a4c0e46d4efc19f94c40'),
    '4': ObjectId('6a95a4c0e46d4efc19f94c41')
  }
}
studentDB>

// 3. Read Operations.
//====================

// 3a. Fetch All Documents— find()
//=================================

studentDB> db.students.find()
[
  {
    _id: ObjectId('6a95a3bae46d4efc19f94c3c'),
    name: 'Jack',
    age: 22,
    course: 'MERN Stack',
    status: 'enrolled'
  },
  {
    _id: ObjectId('6a95a4c0e46d4efc19f94c3d'),
    name: 'John',
    age: 21,
    course: 'MERN Stack',
    status: 'enrolled'
  },
  {
    _id: ObjectId('6a95a4c0e46d4efc19f94c3e'),
    name: 'Joshua',
    age: 23,
    course: 'Python',
    status: 'completed'
  },
  {
    _id: ObjectId('6a95a4c0e46d4efc19f94c3f'),
    name: 'Kristen',
    age: 20,
    course: 'Java',
    status: 'enrolled'
  },
  {
    _id: ObjectId('6a95a4c0e46d4efc19f94c40'),
    name: 'Daniel',
    age: 24,
    course: 'MERN Stack',
    status: 'completed'
  },
  {
    _id: ObjectId('6a95a4c0e46d4efc19f94c41'),
    name: 'Sam',
    age: 19,
    course: 'Python',
    status: 'enrolled'
  }
]
studentDB>

// 3b. Fetch One Document— findOne ()
//=================================

studentDB> db.students.findOne({name: "Jack"})
{
  _id: ObjectId('6a95a3bae46d4efc19f94c3c'),
  name: 'Jack',
  age: 22,
  course: 'MERN Stack',
  status: 'enrolled'
}
studentDB>

// 4. Update Operations.
//=======================

// 4a. Update One Document— updateOne ()
//======================================

studentDB>db.students.updateOne(
    {
        name: "Jack"
    },
    {
        $set: {
            status: "completed"
        }
    }
)
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
studentDB>

// 4b. Update Multiple Document— updateMany ()
//=============================================

studentDB>db.students.updateMany(
    {
        course: "MERN Stack",
        status: "enrolled"
    },
    {
        $set: {
            status: "in-progress"
        }
    }
)
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
studentDB>

// 5. Delete Operations.
//======================

// 5a. Delete One Document— deleteOne()
//======================================

studentDB> db.students.deleteOne({name: "Sam"})
{ acknowledged: true, deletedCount: 1 }
studentDB>

// 5b. Delete Multiple Document— deleteMany()
//=================================================

studentDB> db.students.deleteMany({status:"completed"})
{ acknowledged: true, deletedCount: 3 }
studentDB>

// 5c. Delete All Document— deleteMany({})
//=================================================

studentDB> db.students.deleteMany({})
{ acknowledged: true, deletedCount: 2 }
studentDB>

// 6. Query Operators.
//=====================

// 6a. $gt — Fetch the document greater than 21.
//===============================================

Query:
db.students.find({
    age: {
        $gt: 21
    }
})
Output:
[
  {
    _id: ObjectId('6a96dea8e46d4efc19f94c42'),
    name: 'Jack',
    age: 22,
    course: 'MERN Stack',
    status: 'enrolled'
  },
  {
    _id: ObjectId('6a96debce46d4efc19f94c44'),
    name: 'Joshua',
    age: 23,
    course: 'Python',
    status: 'completed'
  },
  {
    _id: ObjectId('6a96debce46d4efc19f94c46'),
    name: ' Daniel',
    age: 24,
    course: 'MERN Stack',
    status: 'completed'
  }
]

// 6b. $lt — Fetch the document less than 22.
//===========================================

Query:
db.students.find({
    age: {
        $lt: 22
    }
})
Output: 
[
  {
    _id: ObjectId('6a96debce46d4efc19f94c43'),
    name: 'John',
    age: 21,
    course: 'MERN Stack',
    status: 'enrolled'
  },
  {
    _id: ObjectId('6a96debce46d4efc19f94c45'),
    name: ' Kristen',
    age: 20,
    course: 'Java',
    status: 'enrolled'
  },
  {
    _id: ObjectId('6a96debce46d4efc19f94c47'),
    name: 'Sam',
    age: 19,
    course: 'Python',
    status: 'enrolled'
  }
]

// 6c. $in — Fetch the document have "MERN Stack" and "Python" in the list.
//=========================================================================

Query:
db.students.find({
    course: {
        $in: [
            "MERN Stack",
            "Python"
        ]
    }
})
Output:
 [
  {
    _id: ObjectId('6a96dea8e46d4efc19f94c42'),
    name: 'Jack',
    age: 22,
    course: 'MERN Stack',
    status: 'enrolled'
  },
  {
    _id: ObjectId('6a96debce46d4efc19f94c43'),
    name: 'John',
    age: 21,
    course: 'MERN Stack',
    status: 'enrolled'
  },
  {
    _id: ObjectId('6a96debce46d4efc19f94c44'),
    name: 'Joshua',
    age: 23,
    course: 'Python',
    status: 'completed'
  },
  {
    _id: ObjectId('6a96debce46d4efc19f94c46'),
    name: ' Daniel',
    age: 24,
    course: 'MERN Stack',
    status: 'completed'
  },
  {
    _id: ObjectId('6a96debce46d4efc19f94c47'),
    name: 'Sam',
    age: 19,
    course: 'Python',
    status: 'enrolled'
  }
]

// 6d. $and — Fetch the document that every condition must be true.
//==================================================================

Query:
db.students.find({
    $and: [
        {
            age: {
                $gt: 20
            }
        },
        {
            status: "enrolled"
        }
    ]
})
Output:
[
  {
    _id: ObjectId('6a96dea8e46d4efc19f94c42'),
    name: 'Jack',
    age: 22,
    course: 'MERN Stack',
    status: 'enrolled'
  },
  {
    _id: ObjectId('6a96debce46d4efc19f94c43'),
    name: 'John',
    age: 21,
    course: 'MERN Stack',
    status: 'enrolled'
  }
]

// 6e. $or — Fetch the document, at least one condition has to be true.
//======================================================================

Query:
db.students.find({
    $or: [
        {
            course: "MERN Stack"
        },
        {
            course: "Python"
        }
    ]
})
Output:
[
  {
    _id: ObjectId('6a96dea8e46d4efc19f94c42'),
    name: 'Jack',
    age: 22,
    course: 'MERN Stack',
    status: 'enrolled'
  },
  {
    _id: ObjectId('6a96debce46d4efc19f94c43'),
    name: 'John',
    age: 21,
    course: 'MERN Stack',
    status: 'enrolled'
  },
  {
    _id: ObjectId('6a96debce46d4efc19f94c44'),
    name: 'Joshua',
    age: 23,
    course: 'Python',
    status: 'completed'
  },
  {
    _id: ObjectId('6a96debce46d4efc19f94c46'),
    name: ' Daniel',
    age: 24,
    course: 'MERN Stack',
    status: 'completed'
  },
  {
    _id: ObjectId('6a96debce46d4efc19f94c47'),
    name: 'Sam',
    age: 19,
    course: 'Python',
    status: 'enrolled'
  }
]

// 6f. $exists — Check and fetch whether an "email" field is present.
//====================================================================

Query:
db.students.find({
    email: {
        $exists: true
    }
})
Output:
[
  {
    _id: ObjectId('6a96e427e46d4efc19f94c48'),
    name: 'Jane',
    age: 22,
    course: 'Java',
    status: 'enrolled',
    email: 'Jane@hotmail.com'
  }
]

// 7. Real-World Use Case — Library Management System.
//=====================================================

// Step 1— Create “libraryDB” Database.
//===================================

test> use libraryDB
switched to db libraryDB
libraryDB> db //(Check Current Database)
libraryDB
libraryDB>

// Step 2 — Create “book” Collection.
//====================================

libraryDB> db.createCollection("book")
{ ok: 1 }
libraryDB> show collections //(Check Collection list)
book
libraryDB>

//===================================================
{
Add documents:
libraryDB> db.book.insertMany([
    {
        title: "The Stolen Queen",
        author: "Fiona Davis",
        category: "Fiction",
        available: true,
        quantity: 3
    },
    {
        title: "Head First JavaScript ",
        author: "Eric Freeman",
        category: "Programming",
        available: false,
        quantity: 0
    },
    {
        title: "Something About September",
        author: "Julia McKay",
        category: "Fiction",
        available: true,
        quantity: 4
    },
    {
        title: "Our Perfect Storm",
        author: "Carley Fortune",
        category: "Romance",
        available: true,
        quantity: 2
    },
{
        title: "Python Crash Course",
        author: "Eric Matthes",
        category: "Programming",
        available: true,
        quantity: 2
    },
{
        title: "First and Forever",
        author: "Lynn Painter",
        category: "Romance",
        available: true,
        quantity: 2
    }
])
}
//===================================================

// Step 3 — View all books— find().pretty().
//===========================================

libraryDB> db.book.find().pretty()
[
  {
    _id: ObjectId('6a97120ce46d4efc19f94c49'),
    title: 'The Stolen Queen',
    author: 'Fiona Davis',
    category: 'Fiction',
    available: true,
    quantity: 3
  },
  {
    _id: ObjectId('6a97120ce46d4efc19f94c4a'),
    title: 'Head First JavaScript ',
    author: 'Eric Freeman',
    category: 'Programming',
    available: false,
    quantity: 0
  },
  {
    _id: ObjectId('6a97120ce46d4efc19f94c4b'),
    title: 'Something About September',
    author: 'Julia McKay',
    category: 'Fiction',
    available: true,
    quantity: 4
  },
  {
    _id: ObjectId('6a97120ce46d4efc19f94c4c'),
    title: 'Our Perfect Storm',
    author: 'Carley Fortune',
    category: 'Romance',
    available: true,
    quantity: 2
  },
  {
    _id: ObjectId('6a97120ce46d4efc19f94c4d'),
    title: 'Python Crash Course',
    author: 'Eric Matthes',
    category: 'Programming',
    available: true,
    quantity: 2
  },
  {
    _id: ObjectId('6a97120ce46d4efc19f94c4e'),
    title: 'First and Forever',
    author: 'Lynn Painter',
    category: 'Romance',
    available: true,
    quantity: 2
  }
]

// Step 4 —Search by “category” field.
//=====================================

libraryDB> db.book.find({
    category: "Programming"
})
[
  {
    _id: ObjectId('6a97120ce46d4efc19f94c4a'),
    title: 'Head First JavaScript ',
    author: 'Eric Freeman',
    category: 'Programming',
    available: false,
    quantity: 0
  },
  {
    _id: ObjectId('6a97120ce46d4efc19f94c4d'),
    title: 'Python Crash Course',
    author: 'Eric Matthes',
    category: 'Programming',
    available: true,
    quantity: 2
  }
]

//------------------------------------------------

libraryDB> db.book.find({
    category: "Fiction"
})
[
  {
    _id: ObjectId('6a97120ce46d4efc19f94c49'),
    title: 'The Stolen Queen',
    author: 'Fiona Davis',
    category: 'Fiction',
    available: true,
    quantity: 3
  },
  {
    _id: ObjectId('6a97120ce46d4efc19f94c4b'),
    title: 'Something About September',
    author: 'Julia McKay',
    category: 'Fiction',
    available: true,
    quantity: 4
  }
]

//---------------------------------------------------

libraryDB> db.book.find({
    category: "Romance"
})
[
  {
    _id: ObjectId('6a97120ce46d4efc19f94c4c'),
    title: 'Our Perfect Storm',
    author: 'Carley Fortune',
    category: 'Romance',
    available: true,
    quantity: 2
  },
  {
    _id: ObjectId('6a97120ce46d4efc19f94c4e'),
    title: 'First and Forever',
    author: 'Lynn Painter',
    category: 'Romance',
    available: true,
    quantity: 2
  }
]

// Step 5 — Marking a book as borrowed— Update the “available” field.
//===================================================================

libraryDB> db.book.updateOne(
    {
        title: " Python Crash Course "
    },
    {
        $set: {
            available: false,
            quantity: 0
        }
    }
)
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}

//----------------------------------------------------------

libraryDB> db.book.findOne({title: "Python Crash Course"})
{
  _id: ObjectId('6a97120ce46d4efc19f94c4d'),
  title: 'Python Crash Course',
  author: 'Eric Matthes',
  category: 'Programming',
  available: false,
  quantity: 0
}

// Step 6 —Show available books.
//===============================

libraryDB> db.book.find({available:true})

[
  {
    _id: ObjectId('6a97120ce46d4efc19f94c49'),
    title: 'The Stolen Queen',
    author: 'Fiona Davis',
    category: 'Fiction',
    available: true,
    quantity: 3
  },
  {
    _id: ObjectId('6a97120ce46d4efc19f94c4b'),
    title: 'Something About September',
    author: 'Julia McKay',
    category: 'Fiction',
    available: true,
    quantity: 4
  },
  {
    _id: ObjectId('6a97120ce46d4efc19f94c4c'),
    title: 'Our Perfect Storm',
    author: 'Carley Fortune',
    category: 'Romance',
    available: true,
    quantity: 2
  },
  {
    _id: ObjectId('6a97120ce46d4efc19f94c4e'),
    title: 'First and Forever',
    author: 'Lynn Painter',
    category: 'Romance',
    available: true,
    quantity: 2
  }
]


