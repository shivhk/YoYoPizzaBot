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
    console.log("menuItems");
    res.send({ success: true, menuItems });
};