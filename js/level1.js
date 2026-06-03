const level1 = {

    worldWidth: 5000,

    platforms:[
        {x:0,y:350,w:900,h:400},
        {x:1100,y:350,w:700,h:400},
        {x:2100,y:350,w:900,h:400},
        {x:3400,y:350,w:1200,h:400}
    ],

    enemies:[
        {x:1200,y:290},
        {x:1600,y:290},
        {x:2300,y:290}
    ],

    items:[
        {type:"notebook",x:300,y:280},
        {type:"milk",x:2500,y:280},
        {type:"ruler",x:3500,y:180}
    ],

    checkpoint:{
        x:3800
    },

    boss:{
        x:4500,
        hp:10
    }
};
