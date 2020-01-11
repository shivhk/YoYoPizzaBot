const { Menu } = include('database');

exports.getMenu = async (req, res) => {


    // const collection = client.db("pizzabot").collection("MenuItems");
    let menuItems = await Menu.find({});
    console.log(menuItems);
    res.send({ success: true, menuItems });
    await menuItems.for(item =>{
        {
            $('<div class="datarow"><div class="dataCheckBox"></div><li>'+item["name"]+'</li></div>').appendTo($('.mCSB_container')).addClass('new');
            // $('<div class="message new"><figure class="avatar"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80.jpg" /></figure>' + item["name"] + '</div>').appendTo($('.mCSB_container')).addClass('new');
        }
    })
};