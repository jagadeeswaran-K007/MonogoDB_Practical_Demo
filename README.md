# 🍃 MongoDB CRUD Operations, Query Operators & Library System Case Study

A comprehensive, hands-on reference guide and practical tutorial for working with **MongoDB Shell (`mongosh`)**. This repository documents foundational NoSQL database concepts, CRUD operations, advanced query operators, and a real-world **Library Management System** case study.

---

## 📑 Table of Contents
- [Overview](#-overview)
- [Technologies Used](#-technologies-used)
- [Database Setup](#-database-setup)
- [CRUD Operations](#-crud-operations)
  - [1. Insert Operations](#1-insert-operations)
  - [2. Read Operations](#2-read-operations)
  - [3. Update Operations](#3-update-operations)
  - [4. Delete Operations](#4-delete-operations)
- [Query Operators](#-query-operators)
  - [Comparison Operators ($gt, $lt, $in)](#comparison-operators-gt-lt-in)
  - [Logical Operators ($and, $or)](#logical-operators-and-or)
  - [Element Operators ($exists)](#element-operators-exists)
- [Real-World Use Case: Library Management System](#-real-world-use-case-library-management-system)
- [Best Practices & Lessons Learned](#-best-practices--lessons-learned)
- [Getting Started](#-getting-started)

---

## 🔍 Overview
This repository serves as a practical cheatsheet and walkthrough covering:
* Core MongoDB CRUD mechanics (`studentDB`).
* Fine-grained filter execution using BSON query operators.
* Real-world document modeling and inventory toggle logic (`libraryDB`).

---

## 🛠️ Technologies Used
* **Database Engine**: MongoDB (v6.0+)
* **Database Shell**: MongoDB Shell (`mongosh`)
* **Data Format**: JSON / BSON

---

## 🚀 Database Setup

```javascript
// Switch database context
use studentDB

// Explicitly create students collection
db.createCollection("students")

// Verify collections
show collections
```

---

## 📝 CRUD Operations

### 1. Insert Operations

#### Insert One Document — `insertOne()`
```javascript
db.students.insertOne({
  name: "Jack",
  age: 22,
  course: "MERN Stack",
  status: "enrolled"
})
```

#### Insert Multiple Documents — `insertMany()`
```javascript
db.students.insertMany([
  { name: "John", age: 21, course: "MERN Stack", status: "enrolled" },
  { name: "Joshua", age: 23, course: "Python", status: "completed" },
  { name: "Kristen", age: 20, course: "Java", status: "enrolled" },
  { name: "Daniel", age: 24, course: "MERN Stack", status: "completed" },
  { name: "Sam", age: 19, course: "Python", status: "enrolled" }
])
```

---

### 2. Read Operations

#### Fetch All Documents — `find()`
```javascript
db.students.find()
```

#### Fetch Single Document — `findOne()`
```javascript
db.students.findOne({ name: "Jack" })
```

---

### 3. Update Operations

#### Update One Document — `updateOne()`
```javascript
db.students.updateOne(
  { name: "Jack" },
  { $set: { status: "completed" } }
)
```

#### Update Multiple Documents — `updateMany()`
```javascript
db.students.updateMany(
  { course: "MERN Stack", status: "enrolled" },
  { $set: { status: "in-progress" } }
)
```

---

### 4. Delete Operations

#### Delete One Document — `deleteOne()`
```javascript
db.students.deleteOne({ name: "Sam" })
```

#### Delete Matching Documents — `deleteMany()`
```javascript
db.students.deleteMany({ status: "completed" })
```

#### Clear Entire Collection — `deleteMany({})`
```javascript
db.students.deleteMany({})
```

---

## ⚡ Query Operators

### Comparison Operators (`$gt`, `$lt`, `$in`)

* **Greater Than (`$gt`)** — Find students older than 21:
  ```javascript
  db.students.find({ age: { $gt: 21 } })
  ```

* **Less Than (`$lt`)** — Find students younger than 22:
  ```javascript
  db.students.find({ age: { $lt: 22 } })
  ```

* **In Array (`$in`)** — Find students enrolled in "MERN Stack" or "Python":
  ```javascript
  db.students.find({ course: { $in: ["MERN Stack", "Python"] } })
  ```

### Logical Operators (`$and`, `$or`)

* **Logical AND (`$and`)** — Find students with age > 20 **AND** status "enrolled":
  ```javascript
  db.students.find({
    $and: [
      { age: { $gt: 20 } },
      { status: "enrolled" }
    ]
  })
  ```
  *(Note: Idiomatic MongoDB allows `db.students.find({ age: { $gt: 20 }, status: "enrolled" })`)*

* **Logical OR (`$or`)** — Find students taking "MERN Stack" **OR** "Python":
  ```javascript
  db.students.find({
    $or: [
      { course: "MERN Stack" },
      { course: "Python" }
    ]
  })
  ```

### Element Operators (`$exists`)

* **Field Existence (`$exists`)** — Find students with an `email` field present:
  ```javascript
  db.students.find({ email: { $exists: true } })
  ```

---

## 📚 Real-World Use Case: Library Management System

This scenario demonstrates document schema creation and state management for a book borrowing system.

### Step 1 & 2: Database & Collection Setup with Seed Data

```javascript
use libraryDB

db.createCollection("book")

db.book.insertMany([
  { title: "The Stolen Queen", author: "Fiona Davis", category: "Fiction", available: true, quantity: 3 },
  { title: "Head First JavaScript", author: "Eric Freeman", category: "Programming", available: false, quantity: 0 },
  { title: "Something About September", author: "Julia McKay", category: "Fiction", available: true, quantity: 4 },
  { title: "Our Perfect Storm", author: "Carley Fortune", category: "Romance", available: true, quantity: 2 },
  { title: "Python Crash Course", author: "Eric Matthes", category: "Programming", available: true, quantity: 2 },
  { title: "First and Forever", author: "Lynn Painter", category: "Romance", available: true, quantity: 2 }
])
```

### Step 3: View All Books

```javascript
db.book.find().pretty()
```

### Step 4: Search Books by Category

```javascript
// Find Programming Books
db.book.find({ category: "Programming" })

// Find Fiction Books
db.book.find({ category: "Fiction" })

// Find Romance Books
db.book.find({ category: "Romance" })
```

### Step 5: Mark Book as Borrowed

```javascript
db.book.updateOne(
  { title: "Python Crash Course" },
  { $set: { available: false, quantity: 0 } }
)
```

### Step 6: Filter Currently Available Books

```javascript
db.book.find({ available: true })
```

---

## 💡 Best Practices & Lessons Learned

1. **Handling Whitespace & Exact Strings**:
   - String queries in MongoDB are byte-exact. Leading/trailing spaces (e.g., `" Kristen"` vs `"Kristen"`) will fail standard equality matches. Use clean string formatting during ingestion or regex queries when searching.
2. **Atomic Inventory Control (`$inc`)**:
   - In production systems, decrement stock dynamically using `$inc` rather than hardcoding zero to avoid race conditions:
     ```javascript
     db.book.updateOne(
       { title: "Python Crash Course", quantity: { $gt: 0 } },
       { $inc: { quantity: -1 } }
     );
     ```
3. **Implicit vs. Explicit `$and`**:
   - Multiple conditions inside a single query document default to an implicit logical `AND`. Reserve `$and` for compound conditions on identical field paths.

---

## 💻 Getting Started

1. **Install MongoDB & Mongosh**: Follow the official [MongoDB Installation Guide](https://www.mongodb.com/docs/manual/installation/).
2. **Launch MongoDB Shell**:
   ```bash
   mongosh
   ```
3. **Execute Queries**: Copy and run commands directly into your shell to test and observe BSON document outputs.
