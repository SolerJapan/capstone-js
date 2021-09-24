const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
/** Source code imports */
// Mongoose models
const UserItem = require('../../models/user-item');

const config = require('../../../config');


// create new express router
const router = express.Router();

/**
   * @api {get} v1/grocery-items List all grocery items 
   * @apiDescription Returns an array of all grocery items
   * @apiVersion 1.0.0
   * @apiName GetGroceryItems
   * @apiGroup GroceryItem
   * @apiPermission none
   *
   * @apiSuccess (200) {Object[]} groceryItems List of grocery itemsb
   * @apiSuccess (200) {String}   name       Name of grocery item 
   * @apiSuccess (200) {String}   email      Type of grocery item
   *
   * @apiError (Bad Request 400)   
   */
router.get('/', (req, res) => {
  UserItem
    // Calling .find() on a model w/out any arguments gets all documents for that collection : )
    .find()
    .then(allUserItems => {
      const formattedItems = allUserItems.map(user => ({ username: user.username, password: user.password }));
      res.send(formattedItems);
    })
    .catch(error => res.send(`Error on ${req.path} - ${error}`));
})


router.post('/auth/login', async (request, response) => {
  const body = request.body

  const user = await UserItem.findOne({ username: body.username })

  const passwordCorrect = user === null ? false
    : await bcrypt.compare(body.password, user.password)
  console.log(passwordCorrect)
  console.log(user)
  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'hello1'
    })
  }

  const userForToken = {
    id: user._id,
    username: user.username,
  }

  const token = jwt.sign(userForToken, config.JWT_SECRET)

  response
    .status(200)
    .send({ token, username: user.username, id: user._id })
})




/***
 * NOTE: If desired you could use async/await instead of promises, which would look like this:
 * See https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await
 * and https://blog.risingstack.com/mastering-async-await-in-nodejs/
  ```
      app.get('/grocery-items', async (req, res) => {
        const groceryItems = await GroceryItem.find();
        const formattedItems = groceryItems.map(item => ({ name: item.name, type: item.type }));
        res.send(formattedItems);
      })
  ```
 */

router.get('/:id', async (req, res, next) => {
  const id = req.params.id;

  try {

    const result = await UserItem.findById(id);
    //console.log(result);
    res.send(result)

  } catch (error) {
    console.log(error.message);
  }
})

router.get('/:username', async (req, res, next) => {
  const id = req.params.username;

  try {

    const result = await UserItem.findById(id);
    //console.log(result);
    res.send(result)

  } catch (error) {
    console.log(error.message);
  }
})


router.patch('/:id', async (req, res, next) => {

  try {


    const id = req.params.id;
    const updates = req.params;
    const options = { returnOriginal: false } //new: true
    //const result = await UserItem.findByIdAndUpdate(id, updates, options);
    const result = await UserItem.findOneAndUpdate(id, updates, options);
    //console.log(result);
    res.send(result)

  } catch (error) {
    console.log(error.message);
  }
})

router.put('/:id', async (req, res, next) => {

  try {
    const body = req.body;

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
    // Check if student exist or not
    let user = await UserItem.findById(req.params.id);
    console.log(passwordHash)
    const updatedUser = ({
      username: body.username,
      password: passwordHash
    });


    if (!user) {
      return res.json({
        success: false,
        message: "user ID doesn't exist"

      });
    } else {

      let updateUserItem = await UserItem.findByIdAndUpdate(user, updatedUser, {
        new: true,
        runVaidator: true
      });

      res.json({
        success: false,
        message: "User updated successfully.",
        user: updateUserItem
      });
    }
  } catch (error) {
    next(error);
  }
})


// TODO: Add apidoc documentation
router.post('/', async (req, res) => {
  const body = req.body;

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  // create mongoose GroceryItem model instance. we can then save this to mongodb as a document
  const newUser = new UserItem({
    username: body.username,
    password: passwordHash
  });


  // save to mongodb
  newUser
    .save()
    .then(() => res.send(`${JSON.stringify(req.body)} New user created!`))
    // Error handling
    .catch(error => res.send(`ERROR: Unable to create ${JSON.stringify(req.body)} User. Err is ${JSON.stringify(error)} or duplicate`));
})






router.delete('/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    const result = await UserItem.findByIdAndDelete(id)
    console.log(result);
    res.send(result)
  } catch (error) {
    console.log(error.message);
  }
})

/***
  // TODO: This is not working yet.
  app.delete('/grocery-items/:type/:name', async( req, res) => {
    const type = req.params.type;
    // helper function
  const formatItems = items => items.map(item => ({ name: item.name, type: item.type }));
    if(type && type === 'fruit' || type === 'vegetable') {
      const desiredItems = await GroceryItem.find({ type: type })
      res.send(formatItems(desiredItems));
    }
    res.send(`Invalid route - ${req.path}. Valid routes are 'fruit', 'vegetable'`)
    // TODO .find() is probably a promise, use .catch() to do err handling if we can't find the name
    const itemToDelete = await GroceryItem.find({name: req.params.name});
    itemToDelete
      .delete()
      .then(() => res.send(`${req.params.name} deleted`))
      .catch((err) => res.send(`Error - Unable to delete ${req.params.name}. ${err}`));
  });
**/

module.exports = router;