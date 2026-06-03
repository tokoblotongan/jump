const level1 = {

    worldWidth: 5000,

    platforms:[

        // Rumah
        {x:0,y:350,w:1000,h:400},

        // Batu pijakan selokan
        {x:1080,y:300,w:120,h:50},

        // Gang warga
        {x:1300,y:350,w:900,h:400},

        // Batu pijakan kedua
        {x:2280,y:280,w:120,h:70},

        // Area jemuran
        {x:2500,y:350,w:900,h:400},

        // Area pos ronda
        {x:3800,y:350,w:1200,h:400}
    ],

    enemies:[
        {x:1600,y:290},
        {x:2800,y:290},
        {x:4100,y:290}
    ],

    items:[
        {type:"notebook",x:300,y:280},
        {type:"milk",x:2600,y:280},
        {type:"ruler",x:3900,y:280}
    ],

    checkpoint:{
        x:3600
    },

    boss:{
        x:4500,
        hp:10
    }
};
