const db = require('../config/connection');
const { Profile, Product , Category } = require('../models');
const profileSeeds = require('./profileSeeds.json');

db.once('open', async () => {
  try {
    await Category.deleteMany({});
    const categories = await Category.insertMany([
    { name: 'Food' },
    { name: 'Household Supplies' },
    { name: 'Electronics' },
    { name: 'Books' },
    { name: 'Toys' }
    ]);
  
    console.log('categories- seeded');
  
    await Product.deleteMany();
  
    const products = await Product.insertMany([
      {
        name: 'Cookies',
        price: 2.99,
        description:
          'Delicious tin of cookies.',
        image: 'cookie-tin.jpg',
        quantity: 500,
        category: categories[0]._id,
        
      },
     
      {
        name: 'Handmade Soap',
        category: categories[1]._id,
        description:
          'Handmade Soap-Handmade Soap',
           image: 'soap.jpg',
        price: 3.99,
        quantity: 50
      },
     
      {
        name: 'Camera',
        category: categories[2]._id,
        description:
          'evice for recording an image of an object on a light-sensitive surface',
        image: 'camera.jpg',
        price: 399.99,
        quantity: 30
      },
    
      {
        name: 'Tales at Bedtime',
        category: categories[3]._id,
        description:
          'bedtime story book',
           image: 'bedtime-book.jpg',
        price: 9.99,
        quantity: 100
      },
     
    ]);
  
    console.log('products- seeded');
    await Profile.deleteMany({});

    await Profile.create({
      firstName: 'Radhika',
      lastName: 'test',
      email: 'Radhika.test@testmail.com',
      password: 'password12345',
      orders: [
        {
          products: [products[0]._id, products[0]._id, products[1]._id]
        }
      ]
    });
  
    await Profile.create({
      firstName: 'Shop',
      lastName: 'Cyber',
      email: 'shop.cyber@testmail.com',
      password: 'password12345'
    });
  
    console.log('users seeded');

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
