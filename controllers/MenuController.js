const { Menu } = include('./Database');

/**
 * this method will make a get request to the MenuItems collection in the db
 * and returns all the documents.
 * @param req
 * @param res
 * @returns {Promise<void>} which is handled using async/await.
 */
exports.getMenu = async (req, res) => {
    let menuItems = await Menu.find({});
    res.send({ success: true, menuItems });

    //could do that here
    //if DB objects are found, return them
    //else, create new ones
    //execute a script probably
    //or do a Collection.insertMany
};