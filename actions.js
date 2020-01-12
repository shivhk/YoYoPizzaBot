// var port = requirejs('index.js').port;

var $messages = $('.messages-content'),
    d, h, m,
    i = 0;


const addMessage = (message, type) => {
    $('.messages-content').append('<div>hello</div>')
}

$(window).load(function() {
    $messages.mCustomScrollbar();
    setTimeout(function() {
        console.log("window");
        firstMessage();
    }, 100);
});


function updateScrollbar() {
    $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
        scrollInertia: 10,
        timeout: 0
    });
}

function setDate(){
    d = new Date()
    if (m != d.getMinutes()) {
        m = d.getMinutes();
        $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
    }
}

function insertMessage() {
    msg = $('.message-input').val();
    if ($.trim(msg) == '') {
        return false;
    }
    $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
    setDate();
    $('.message-input').val(null);
    updateScrollbar();
    setTimeout(function() {
        console.log('INsert message')
        message(msg);
    }, 1000 + (Math.random() * 20) * 100);
}

$('.message-submit').click(function() {
    console.log("Dos");
    insertMessage();
});

$(window).on('keydown', function(e) {
    if (e.which == 13) {
        console.log("uno")
        insertMessage();
        return false;
    }
})

var Fake = [
    'Hi there! What can I help you with today?',
    'Enter 1 to place an order',
    'Enter 2 to get your order status'
]

function message(msg) {
    if ($('.message-input').val() != '') {
        return false;
    }
    console.log(msg)
    if(msg == '1'){
        console.log("One here");
        $('<div class="message loading new"><figure class="avatar"><img src="images/pija.png" /></figure><span></span></div>').appendTo($('.mCSB_container'));
        updateScrollbar();
        getMenu();
        setTimeout(function() {
            $('.message.loading').remove();
            $('<div class="message new"><figure class="avatar"><img src="images/pija.png" /></figure>' + "Please select from the menu and specify the quantity" + '</div>').appendTo($('.mCSB_container')).addClass('new');

            setDate();
            updateScrollbar();
            i++;
        }, 1000 + (Math.random() * 20) * 100);
        console.log("HERE")

        return '<div>hello</div>'
    }
    else if (msg=='2')
    {
        console.log("to track order");
        $('<div class="message new"><figure class="avatar"><img src="images/pija.png" /></figure>' + "Please enter the order Id" + '</div>').appendTo($('.mCSB_container')).addClass('new');

    }
    else if(msg!=='1' || msg!=='2')
    {
        fetch('/orderStatus/' + new URLSearchParams({
            id: msg,
        })).then((response) => response.json()).then(
            (data) =>{
                console.log(data);
            });
    }


}

function firstMessage() {
    if ($('.message-input').val() != '') {
        return false;
    }
    $('<div class="message loading new"><figure class="avatar"><img src="images/pija.png" /></figure><span></span></div>').appendTo($('.mCSB_container'));
    updateScrollbar();

    setTimeout(function() {
        $('.message.loading').remove();
        $('<div class="message new"><figure class="avatar"><img src="images/pija.png" /></figure>' + Fake[i] + '</div>').appendTo($('.mCSB_container')).addClass('new');
        $('<div class="message new"><figure class="avatar"><img src="images/pija.png" /></figure>' + Fake[i+1] + '</div>').appendTo($('.mCSB_container')).addClass('new');
        $('<div class="message new"><figure class="avatar"><img src="images/pija.png" /></figure>' + Fake[i+2] + '</div>').appendTo($('.mCSB_container')).addClass('new');
        setDate();
        updateScrollbar();
        i++;
    }, 1000 + (Math.random() * 20) * 100);

}

const menu = {};
let menuItems = [];

const onQuantityChange = (event) =>{
    console.log("quantity values : "+event.target.value);
    console.log("name : "+event.target.name);

    menuItems.find(menu => {
        if (menu._id===event.target.name)
        {
            menu.quantity = event.target.value;
        }
    });
    // item.quantity = event.target.
}

const onCheckBoxChange = (event) => {
    console.log("event : "+event.target.value);
    if(menu[event.target.value]) {
        menu[event.target.value] = {...menu[event.target.value], checked: event.target.checked};
    } else {
        menu[event.target.value] = { checked: event.target.checked };
    }
}

const saveOrder = () =>{

    console.log(menu);
    let finalOrder = menuItems.reduce((acc, item)=>{if (menu[item._id]){
        acc.push(item);
    }return acc;},[]);//defining an accumulator and setting its default value to an array

    const options = {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalOrder)
    };


    fetch('/createOrder',options).then(
        (response) => response.json()
    ).then((data)=>{
        console.log(data);
        $('<div class="message new"><figure class="avatar"><img src="images/pija.png" /></figure>' +data.message.toPay+" on receiving the order."+ '</div>').appendTo($('.mCSB_container')).addClass('new');
        $('<div class="message new"><figure class="avatar"><img src="images/pija.png" /></figure>' + "this is your orderID : "+data.message.orderId +". Use it to get the status of your order."+ '</div>').appendTo($('.mCSB_container')).addClass('new');
    });
}

function getMenu(){
     fetch('/menu')
         .then((response)=> response.json())
         .then(data=>
         {
             menuItems = data.menuItems;
             $('<div class="message new"><figure class="avatar"><img src="images/pija.png" /></figure>' + `<div class="menuList">${data.menuItems.reduce((acc, item) =>`${acc}
                <div class="menuItem">
                <input type="checkbox" value="${item._id}" name="${item.name}" onchange="onCheckBoxChange(event)"/>
                <label class="checkBoxLabel" for="${item.name}">${item.name}</label>
                <input type="number" name="${item._id}" defaultvalue="1" min ="0" class="quantityInput" onchange="onQuantityChange(event)"/>
                </div>`, '')}
                <button type="submit" class="menu-submit-button" onclick="saveOrder()">Send</button></div>` + '</div>').appendTo($('.mCSB_container')).addClass('new');
         });
}

