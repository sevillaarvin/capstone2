const bcrypt = require("bcryptjs")

let members = [
   {
      "email" : "admin@admin.com",
      "firstName" : "Admin",
      "lastName" : "Admin",
      "address" : "Admin street",
      "created_at" : "12/15/2018",
      "gender" : "m",
      "username" : "admin",
      "birthdate " : "1/1/2000",
      "password" : "admin",
   },
   {
      "email" : "user@user.com",
      "firstName" : "User",
      "lastName" : "User",
      "address" : "User street",
      "created_at" : "12/15/2018",
      "gender" : "m",
      "username" : "user",
      "birthdate " : "1/1/2000",
      "password" : "user",
   },
   {
      "email" : "rdyment0@geocities.jp",
      "firstName" : "Ricard",
      "address" : "435 Northridge Junction",
      "created_at" : "1/23/2016",
      "lastName" : "Dyment",
      "gender" : "f",
      "username" : "rdyment0",
      "birthdate " : "9/28/2003",
      "password" : "0f8a16a8053e4130748ac396a30bcb5f45426843ea8a86e4d62ebb5ad35d0491",
   },
   {
      "lastName" : "Foster",
      "created_at" : "1/10/2013",
      "firstName" : "Dalenna",
      "address" : "23707 Brown Court",
      "email" : "dfoster1@techcrunch.com",
      "password" : "63bd2bcfb4248ec56cbc3566ad9557d0800f93f0975a68810b73778355392d79",
      "birthdate " : null,
      "username" : "dfoster1",
      "gender" : "m"
   },
   {
      "email" : "hminget2@uiuc.edu",
      "firstName" : "Helli",
      "address" : "6774 Tomscot Place",
      "lastName" : "Minget",
      "created_at" : "9/30/2017",
      "gender" : "m",
      "username" : "hminget2",
      "password" : "464aba6720fd3b0b402c925689035038680acbfb3c8a26712232d0083a2fe6bc",
      "birthdate " : "2/18/2002"
   },
   {
      "username" : "mbambra3",
      "gender" : "m",
      "password" : "29170182411c1ca5858acc56482f95929b9f07607278d759594eda337b144a95",
      "birthdate " : "9/9/2003",
      "address" : "6213 2nd Court",
      "firstName" : "Magnum",
      "email" : "mbambra3@goodreads.com",
      "lastName" : "Bambra",
      "created_at" : "12/5/2017"
   },
   {
      "password" : "8af9d11428d6af8edaabbe443477a5b482f638afb5d85bbf122f6c2cda4fcebd",
      "birthdate " : "11/5/2007",
      "username" : "fmarkey4",
      "gender" : "f",
      "lastName" : "Markey",
      "created_at" : "12/13/2015",
      "address" : "5 Toban Pass",
      "firstName" : "Flemming",
      "email" : "fmarkey4@cam.ac.uk"
   },
   {
      "password" : "4f7c6c1a9a9ace272a8baae943685ea5baf207534acb4fcc12386cc31db6c490",
      "birthdate " : "4/16/2008",
      "gender" : "m",
      "username" : "pstearnes5",
      "lastName" : "Stearnes",
      "created_at" : "12/5/2012",
      "email" : "pstearnes5@stumbleupon.com",
      "address" : "93 Springview Park",
      "firstName" : "Philipa"
   },
   {
      "created_at" : "9/18/2012",
      "lastName" : "Callf",
      "email" : "acallf6@tuttocitta.it",
      "address" : "77079 Di Loreto Court",
      "firstName" : "Alexandrina",
      "birthdate " : "6/15/2001",
      "password" : "cadde44e1e23017691ec0e5c1bfb291919073741f69a0c4b96cf301015e6b4f7",
      "gender" : null,
      "username" : "acallf6"
   },
   {
      "gender" : "m",
      "username" : "jreck7",
      "birthdate " : "8/14/2004",
      "password" : "750eafb54b329ee03bc4b3aa73d07bd8a2d04d50850d1dc8fa06b54260b8d4d7",
      "email" : "jreck7@jimdo.com",
      "address" : "99 Fairfield Hill",
      "firstName" : "Jada",
      "created_at" : "11/10/2012",
      "lastName" : "Reck"
   },
   {
      "created_at" : "9/14/2012",
      "lastName" : "Wise",
      "email" : "mwise8@com.com",
      "address" : "3 Heath Hill",
      "firstName" : "Marika",
      "birthdate " : "9/6/2008",
      "password" : "8d2fd4d4d35add4ea5f4fd9b01eab06ce167f1cbe5d70c5ae858650a97757409",
      "gender" : "m",
      "username" : "mwise8"
   },
   {
      "created_at" : "12/17/2013",
      "lastName" : "Gisburne",
      "email" : "rgisburne9@sphinn.com",
      "firstName" : "Retha",
      "address" : "6171 Gina Park",
      "birthdate " : "12/13/2001",
      "password" : "f6959d1fdda5fe11592dbcb25be278eaacef53cfb2cb691f5982147225ac9a1e",
      "gender" : "m",
      "username" : "rgisburne9"
   },
   {
      "email" : "aervina@bluehost.com",
      "address" : null,
      "firstName" : "Alverta",
      "lastName" : "Ervin",
      "created_at" : "4/4/2011",
      "gender" : null,
      "username" : "aervina",
      "password" : "e7217294535dea6a992db0c380420e4f25cd792cb5fd8e81d44e0a655f1f6643",
      "birthdate " : "2/4/2005"
   },
   {
      "created_at" : "4/17/2017",
      "lastName" : "Westrip",
      "email" : "nwestripb@kickstarter.com",
      "address" : "2175 Susan Terrace",
      "firstName" : "Nicola",
      "birthdate " : "2/15/2002",
      "password" : "66a21933a86a3045bfd75ff94ce4f43378abd74e6c275e5776ed8377ea9203d8",
      "gender" : "f",
      "username" : "nwestripb"
   },
   {
      "created_at" : "8/1/2017",
      "lastName" : "Mongin",
      "email" : "gmonginc@vistaprint.com",
      "firstName" : "Glyn",
      "address" : "86635 Spaight Drive",
      "birthdate " : "12/9/2000",
      "password" : "9aafd29e13f51f61907a72dc3cfeb8961a7b039702a873088f34e27efd603760",
      "gender" : "f",
      "username" : "gmonginc"
   },
   {
      "birthdate " : "7/15/2006",
      "password" : "b322b907503dacc73f8ab7c90e149aec910d6b3d2a4cca10554bc43a628861f2",
      "username" : "sbeamsd",
      "gender" : "f",
      "created_at" : "10/19/2011",
      "lastName" : "Beams",
      "firstName" : "Sharleen",
      "address" : null,
      "email" : "sbeamsd@toplist.cz"
   },
   {
      "username" : "cunworthe",
      "gender" : "m",
      "birthdate " : "10/13/2004",
      "password" : "ce529130b873e3dad3c348d767ebcfbd77d81ed3b114451deae88992a0d53ccd",
      "address" : "5 Mendota Circle",
      "firstName" : "Cammy",
      "email" : "cunworthe@baidu.com",
      "created_at" : "3/5/2010",
      "lastName" : "Unworth"
   },
   {
      "firstName" : "Marysa",
      "address" : "194 Pierstorff Avenue",
      "email" : "mrileyf@redcross.org",
      "created_at" : "2/22/2016",
      "lastName" : "Riley",
      "username" : "mrileyf",
      "gender" : "f",
      "birthdate " : "12/21/2010",
      "password" : "381ed07681d357c7239ff6d44f11bf21309e18b78f34fc6b20db58dda42caf4a"
   },
   {
      "password" : "e9b45d457a786b55433d64ff8f3c39188839a2c5964fb33ca30aec92118ccac9",
      "birthdate " : "3/26/2001",
      "username" : "crylstoneg",
      "gender" : "f",
      "lastName" : "Rylstone",
      "created_at" : "12/25/2013",
      "address" : "632 Vahlen Court",
      "firstName" : "Carmela",
      "email" : "crylstoneg@deviantart.com"
   },
   {
      "lastName" : "Copas",
      "created_at" : "7/4/2013",
      "email" : "rcopash@baidu.com",
      "firstName" : "Ricky",
      "address" : "2 Del Sol Road",
      "password" : "8d11a223854a85f3dc4395848272787e6515d24d5ce16fc0dc0bcfa5a0bc0f16",
      "birthdate " : "4/19/2001",
      "gender" : "f",
      "username" : "rcopash"
   },
   {
      "birthdate " : "9/2/2006",
      "password" : "9cff36cd9b00d4a945168349ae7445c007ad17f4e07937dddb1c3cb8fabe2bf2",
      "gender" : null,
      "username" : "lcradducki",
      "created_at" : "9/3/2010",
      "lastName" : "Cradduck",
      "email" : "lcradducki@imageshack.us",
      "address" : "126 Westport Plaza",
      "firstName" : "Lorrayne"
   },
   {
      "address" : "710 Saint Paul Plaza",
      "firstName" : "Else",
      "email" : "elandj@miitbeian.gov.cn",
      "lastName" : "Land",
      "created_at" : "5/15/2013",
      "username" : "elandj",
      "gender" : "f",
      "password" : "6a2806e9a5a1331acb9f549d2ade806b34067f146aeac95a38fa473e2463aaff",
      "birthdate " : "2/24/2009"
   },
   {
      "created_at" : "3/14/2017",
      "lastName" : "Biggs",
      "email" : "cbiggsk@jigsy.com",
      "address" : "71 Debra Plaza",
      "firstName" : "Cecile",
      "birthdate " : "5/4/2006",
      "password" : "322aaee4025c449fda3229646c5a2a0e9494b1f984fec42e974411da11a6fde7",
      "gender" : "m",
      "username" : "cbiggsk"
   },
   {
      "created_at" : "12/18/2011",
      "lastName" : "Chidlow",
      "email" : "achidlowl@topsy.com",
      "address" : null,
      "firstName" : "Abigael",
      "birthdate " : "5/14/2009",
      "password" : "1bcc6609e274e8d4ec76eb424ab9fe1d70bf9bcc07cd640039f3f2e0337118ae",
      "gender" : "m",
      "username" : "achidlowl"
   },
   {
      "username" : "jantognettim",
      "gender" : null,
      "birthdate " : "5/15/2004",
      "password" : "0c7d62bb2b3a45ee890454eea7775c824232c6402220ebbccec875866ddfa151",
      "address" : "85 Dorton Drive",
      "firstName" : "Jolynn",
      "email" : "jantognettim@msu.edu",
      "created_at" : "8/31/2012",
      "lastName" : "Antognetti"
   },
   {
      "address" : "29715 1st Hill",
      "firstName" : "Danna",
      "email" : "dcosgriffn@cdbaby.com",
      "lastName" : "Cosgriff",
      "created_at" : "3/24/2015",
      "username" : "dcosgriffn",
      "gender" : "m",
      "password" : "aaba590eaf6354da94115dafdbe2b2a61f03331e0f78dba88b81b7b4b46ed6fa",
      "birthdate " : "9/7/2001"
   },
   {
      "username" : "lwellando",
      "gender" : "f",
      "password" : "537bade88345283e1cb794aa8230f377ff0a80e39cc3d1a06190cf8f6a49b8d7",
      "birthdate " : "10/6/2007",
      "address" : "839 Dorton Alley",
      "firstName" : "Lemmy",
      "email" : "lwellando@vk.com",
      "lastName" : "Welland",
      "created_at" : "4/24/2010"
   }
]


exports.seed = async function(knex, Promise) {
  try {
    members = members.map((member, i) => {
      member.password = bcrypt.hashSync(member.password, 10)
      if (!member.role_id) {
        if (i === 0) {
          member.role_id = 1
        } else {
            member.role_id = 2
        }
      }
      return member
    })
  } catch (e) {
    return Promise.reject(e)
  }
  // Deletes ALL existing entries
  return knex('member').del()
    .then(function () {
      // Inserts seed entries
      return knex('member').insert(members);
    });
};
