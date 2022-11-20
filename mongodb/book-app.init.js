// init data for book app


// database users ==========================================================================
db = db.getSiblingDB('users');

db.createCollection('users');

const adminBA_id = new ObjectId('63629b4166c960b11f462cb1'); // 1 // password = 1r@435C8!ncV
const peter99cza_id = new ObjectId('637732dba312379d440b361f'); // 2 // password = ABC123def
const aron1920_id = new ObjectId('637a5b098649d8c3eba3b094'); // 3 // password = fI94D767
const magnet1213_id = new ObjectId('637a5b098649d8c3eba3b095'); // 4 // password = uD51S1Va
const blakerGf_id = new ObjectId('637a5b098649d8c3eba3b096'); // 5 // password = Je24FJ6Y
const daniel00_id = new ObjectId('637a5b098649d8c3eba3b097'); // 6 // password = aD869Ejq
const nardis1990_id = new ObjectId('637a5b098649d8c3eba3b098'); // 7 // password = Mp21V3RY
const philips333_id = new ObjectId('637a5b098649d8c3eba3b099'); // 8 // password = Qs846WQ1
const john_john_id = new ObjectId('637a5b098649d8c3eba3b09a'); // 9 // password = M22x3SOT
const chrisSer_id = new ObjectId('637a5b098649d8c3eba3b09b'); // 10 // password = dF169aY5

const users = [
  {  // user 1
    '_id': adminBA_id,
    'username': 'adminBA',
    'password': '$2b$10$J0SFwzHrjCKT6dpOLRM7muIH7VjMGZe6yLwfh9g/vXDpMVXf5yslm',
    'firstName': 'Hero',
    'lastName': 'i am hero',
    'roles': ['admin', 'user'],
    'banned': false,
    'createdAt': new Date('2022-11-02T16:30:57.592+00:00'),
    'updatedAt': new Date('2022-11-02T16:30:57.592+00:00'),
  },
  { // user 2
    '_id': peter99cza_id,
    'username': 'peter99cza',
    'password': '$2b$10$3zCu.FcLgLaiQldvrRgh8e4FUZsQ4.BPE23d7Y3IalrwvcwxpR5wa',
    'firstName': 'Perter',
    'lastName': 'Hall',
    'roles': ['user'],
    'banned': false,
    'createdAt': new Date('2022-11-18T07:23:07.644+00:00'),
    'updatedAt': new Date('2022-11-18T07:23:07.644+00:00'),
  },
  { // user 3
    '_id': aron1920_id,
    'username': 'aron1920',
    'password': '$2b$10$DAobp9qoLR9oeIh.7zYijuNPogEd9Trfqjfj3JRIeLr2qTIpgO2Ga',
    'firstName': 'Aron',
    'lastName': 'Allen',
    'roles': ['user'],
    'banned': false,
    'createdAt': new Date('2022-11-18T00:00:00.000+00:00'),
    'updatedAt': new Date('2022-11-18T00:00:00.000+00:00'),
  },
  { // user 4
    '_id': magnet1213_id,
    'username': 'magnet1213',
    'password': '$2b$10$EOwKvmcx8tFM.FJAk24oTunENZhREilmpaup1IJLeNSV/TlBVwe2W',
    'firstName': 'Magnet',
    'lastName': 'Martinez',
    'roles': ['user'],
    'banned': false,
    'createdAt': new Date('2022-11-18T00:00:00.000+00:00'),
    'updatedAt': new Date('2022-11-18T00:00:00.000+00:00'),
  },
  { // user 5
    '_id': blakerGf_id,
    'username': 'blakerGf',
    'password': '$2b$10$BApALB5c2p3AwUIgEopCNeovvdFlGUDgr8wh/xyAKsy2QUxXWRa6q',
    'firstName': 'Blaker',
    'lastName': 'Jones',
    'roles': ['user'],
    'banned': false,
    'createdAt': new Date('2022-11-18T00:00:00.000+00:00'),
    'updatedAt': new Date('2022-11-18T00:00:00.000+00:00'),
  },
  { // user 6
    '_id': daniel00_id,
    'username': 'daniel00',
    'password': '$2b$10$Xk21VSMOpi4AbYJ2u4tfDuqKXFExK59hFrN6Bl8H0f1gn5u9RfhPu',
    'firstName': 'Daniel',
    'lastName': 'Harris',
    'roles': ['user'],
    'banned': false,
    'createdAt': new Date('2022-11-18T00:00:00.000+00:00'),
    'updatedAt': new Date('2022-11-18T00:00:00.000+00:00'),
  },
  { // user 7
    '_id': nardis1990_id,
    'username': 'nardis1990',
    'password': '$2b$10$dLNuU91B/Iw5I1qLH0.8QenfcLb034m/Kfnoer.jWjiQR/Q1yxPBO',
    'firstName': 'Nardis',
    'lastName': 'Lewis',
    'roles': ['user'],
    'banned': false,
    'createdAt': new Date('2022-11-18T00:00:00.000+00:00'),
    'updatedAt': new Date('2022-11-18T00:00:00.000+00:00'),
  },
  { // user 8
    '_id': philips333_id,
    'username': 'philips333',
    'password': '$2b$10$KSAzcIj3NmHPC4Ae.MZFz.7PIB0RiFGf7Xav/kXZGDRbhKqySYl5G',
    'firstName': 'Philips',
    'lastName': 'White',
    'roles': ['user'],
    'banned': false,
    'createdAt': new Date('2022-11-18T00:00:00.000+00:00'),
    'updatedAt': new Date('2022-11-18T00:00:00.000+00:00'),
  },
  { // user 9
    '_id': john_john_id,
    'username': 'john_john',
    'password': '$2b$10$iegTleH796sn.NKQfO3YrOGPHZOT6wvKhbwVZzb7RNXKF4MOtlxBy',
    'firstName': 'John',
    'lastName': 'Nelson',
    'roles': ['user'],
    'banned': false,
    'createdAt': new Date('2022-11-18T00:00:00.000+00:00'),
    'updatedAt': new Date('2022-11-18T00:00:00.000+00:00'),
  },
  { // user 10
    '_id': chrisSer_id,
    'username': 'chrisSer',
    'password': '$2b$10$yprnfX/N3Wsdm/ckgENmx.WZC7eIWGEjH4xsHsj9Vs2cirg9jZek2',
    'firstName': 'Chris',
    'lastName': 'Carter',
    'roles': ['user'],
    'banned': false,
    'createdAt': new Date('2022-11-18T00:00:00.000+00:00'),
    'updatedAt': new Date('2022-11-18T00:00:00.000+00:00'),
  },
];

db.getCollection('users').insertMany(users);

db.createCollection('registered_logs');
db.createCollection('logedin_logs');

// database books ==========================================================================
db = db.getSiblingDB('books');

db.createCollection('books');

const dracula_id = new ObjectId('637a88a9f15b44263668b923'); // book 1
const eragon_id = new ObjectId('637a88a9f15b44263668b924'); // book 2
const the_adventures_of_tom_sawyer_id = new ObjectId('637a88a9f15b44263668b925'); // book 3
const peter_pan_id = new ObjectId('637a88a9f15b44263668b926'); // book 4
const fallen_id = new ObjectId('637a88a9f15b44263668b927'); // book 5
const interview_with_the_vampire_id = new ObjectId('637a88a9f15b44263668b928'); // book 6
const legend_id = new ObjectId('637a88a9f15b44263668b929'); // book 7
const dragonfly_in_amber_id = new ObjectId('637a88a9f15b44263668b92a'); // book 8
const flowers_in_the_attic_id = new ObjectId('637a88a9f15b44263668b92b'); // book 9
const the_ruins_of_gorlan_id = new ObjectId('637a88a9f15b44263668b92c'); // book 10

const books = [
  { // book 1
    '_id': dracula_id,
    'name': 'Dracula',
    'categories': [
      'Classics',
      'Fiction',
      'Horror',
      'Fantasy',
      'Vampires'
    ],
    'stock': 988,
    'price': 400.55,
    'sold': 0,
    'imageFileName': null,
  },
  { // book 2
    '_id': eragon_id,
    'name': 'Eragon',
    'categories': [
      'Fantasy',
      'Young Adult',
      'Magic',
      'Adventure',
      'Fiction',
      'Dragons'
    ],
    'stock': 1656,
    'price': 220.86,
    'sold': 0,
    'imageFileName': null,
  },
  { // book 3
    '_id': the_adventures_of_tom_sawyer_id,
    'name': 'The Adventures of Tom Sawyer',
    'categories': [
      'Classics',
      'Fiction',
      'Adventure',
      'School',
      'Novels',
      'Childrens'
    ],
    'stock': 1806,
    'price': 300.36,
    'sold': 0,
    'imageFileName': null,
  },
  { // book 4
    '_id': peter_pan_id,
    'name': 'Peter Pan',
    'categories': [
      'Classics',
      'Fantasy',
      'Fiction',
      'Childrens',
      'Fairy Tales',

    ],
    'stock': 1410,
    'price': 500.26,
    'sold': 0,
    'imageFileName': null,
  },
  { // book 5
    '_id': fallen_id,
    'name': 'Fallen',
    'categories': [
      'Young Adult',
      'Fantasy',
      'Romance',
      'Fiction'
    ],
    'stock': 785,
    'price': 420.64,
    'sold': 0,
    'imageFileName': null,
  },
  { // book 6
    '_id': interview_with_the_vampire_id,
    'name': 'Interview with the Vampire',
    'categories': [
      'Horror',
      'Fantasy',
      'Fiction',
      'Vampires',
      'Paranormal'
    ],
    'stock': 2388,
    'price': 207.66,
    'sold': 0,
    'imageFileName': null,
  },
  { // book 7
    '_id': legend_id,
    'name': 'Legend',
    'categories': [
      'Young Adult',
      'Teen',
      'Action',
      'Romance'
    ],
    'stock': 3930,
    'price': 540.42,
    'sold': 0,
    'imageFileName': null,
  },
  { // book 8
    '_id': dragonfly_in_amber_id,
    'name': 'Dragonfly in Amber',
    'categories': [
      'Time Travel',
      'Romance',
      'Fiction',
      'Historical Fiction',
      'Adult'
    ],
    'stock': 2402,
    'price': 427.8,
    'sold': 0,
    'imageFileName': null,
  },
  { // book 9
    '_id': flowers_in_the_attic_id,
    'name': 'Flowers in the Attic',
    'categories': [
      'Fiction',
      'Horror',
      'Mystery',
      'Classics',
      'Drama',
      'Romance'
    ],
    'stock': 3250,
    'price': 800.77,
    'sold': 0,
    'imageFileName': null,
  },
  { // book 10
    '_id': the_ruins_of_gorlan_id,
    'name': 'The Ruins of Gorlan',
    'categories': [
      'Action',
      'Fantasy',
      'Teen',
      'Fiction',
      'Childrens'
    ],
    'stock': 900,
    'price': 300.04,
    'sold': 0,
    'imageFileName': null,
  }
];

db.getCollection('books').insertMany(books);

db.createCollection('purchase_books');

const orders = [];

for (let i = 0; i < 100; i++) {
  const randomUser = Math.floor(Math.random() * 10);
  const randomBook = Math.floor(Math.random() * 10);
  const randomQuantity = Math.floor(Math.random() * 50) + 1;

  const book = books[randomBook];
  const user = users[randomUser];

  const price = book.price * randomQuantity;

  orders.push({
    'userId': user._id,
    'userUsername': user.username,
    'userFirstName': user.firstName,
    'userLastName': user.lastName,
    'bookId': book._id,
    'bookName': book.name,
    'categories': book.categories,
    'quantity': randomQuantity,
    'price': price,
    'bookPrice': book.price,
  });

}

db.getCollection('purchase_books').insertMany(orders);