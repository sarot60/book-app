// init data for book app


// database users
db = db.getSiblingDB('users');

db.createCollection('users');

const adminBA_id = new ObjectId('63629b4166c960b11f462cb1'); // 1 // password = 1r@435C8!ncV
const peter99cza_id = new ObjectId('637732dba312379d440b361f'); // 2 // password = ABC123def
const aron1920_id = new ObjectId('637a5b098649d8c3eba3b094'); // 3 // password = fI94D767
const magnet1213_id = new ObjectId('637a5b098649d8c3eba3b095'); // 4 // password = uD51S1Va
const blakerGf_id = new ObjectId('637a5b098649d8c3eba3b096'); // 5 // password = Je24FJ6Y
const daniel00_id = new ObjectId('637a5b098649d8c3eba3b097'); // 6 // password = aD869Ejq
const nardis1990_id = new ObjectId('637a5b098649d8c3eba3b098'); // 7 // password = Mp21V3RY
const philip333_id = new ObjectId('637a5b098649d8c3eba3b099'); // 8 // password = Qs846WQ1
const john_john_id = new ObjectId('637a5b098649d8c3eba3b09a'); // 9 // password = M22x3SOT
const chrisSer_id = new ObjectId('637a5b098649d8c3eba3b09b'); // 10 // password = dF169aY5
db.getCollection('users').insertMany([
  {  // 1
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
  { // 2
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
  { // 3
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
  { // 4
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
  { // 5
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
  { // 6
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
  { // 7
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
  { // 8
    '_id': philip333_id,
    'username': 'philip333',
    'password': '$2b$10$KSAzcIj3NmHPC4Ae.MZFz.7PIB0RiFGf7Xav/kXZGDRbhKqySYl5G',
    'firstName': 'Philip',
    'lastName': 'White',
    'roles': ['user'],
    'banned': false,
    'createdAt': new Date('2022-11-18T00:00:00.000+00:00'),
    'updatedAt': new Date('2022-11-18T00:00:00.000+00:00'),
  },
  { // 9
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
  { // 10
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
]);

db.createCollection('registered_logs');
db.createCollection('logedin_logs');

// database books
db = db.getSiblingDB('books');
db.createCollection('books');
db.createCollection('purchase_orders');