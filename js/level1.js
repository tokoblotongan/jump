const level1 = {

    worldWidth: 5000,

    platforms:[

        // START - Rumah Bimbim
        {x:0,y:350,w:1000,h:400},

        // Selokan 1
        // Buku tulis sebagai pijakan
        {x:1080,y:300,w:120,h:50},

        // Jalan menuju gang
        {x:1300,y:350,w:900,h:400},

        // Selokan 2 (lebih sulit)

        // Buku
        {x:2280,y:300,w:120,h:50},

        // Penggaris
        {x:2500,y:250,w:180,h:30},

        // Kotak pensil
        {x:2750,y:280,w:120,h:50},

        // Area jemuran
        {x:3000,y:350,w:900,h:400},

        // Selokan 3 (terpanjang)

        // Buku
        {x:3980,y:300,w:120,h:50},

        // Penggaris
        {x:4200,y:240,w:180,h:30},

        // Buku
        {x:4470,y:280,w:120,h:50},

        // Area sekolah
        {x:4700,y:350,w:1200,h:400}
    ],

    enemies:[

        // Ular pertama
        {x:1600,y:290},

        // Ular kedua
        {x:3300,y:290},

        // Ular ketiga
        {x:5000,y:290}
    ],

    items:[

        // Buku tulis
        {type:"notebook",x:300,y:280},

        // Susu
        {type:"milk",x:1850,y:280},

        // Penggaris
        {type:"ruler",x:3400,y:280},

        // Pensil
        {type:"pencil",x:5200,y:280}
    ],

    checkpoint:{
        x:3900
    },

    boss:{
        x:5500,
        hp:10
    }
};
