const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");
const axios = require("axios");
const User = require("../../models/User.js");

// * Je charge le modèle des enchères
const Auction = require("../../models/Auctions");

/**
 * *Je récupère le token de l'api wow dans la bdd (qui est refresh toutes les 6h) oui
 */
let token = "";
User.find({ _id: "5d3c1c0b5270e926c0546526" })
  .then(response => {
    token = response[0].token;
  })
  .catch(error => {
    console.log(error);
  });

/**
 * *LISTE DES ROYAUMES A SCANNER
 */
let realm = [
  { realm: "archimonde", zone: "fr" },
  { realm: "arathi", zone: "fr" },
  { realm: "Arak-arahm", zone: "fr" },
  { realm: "Chants éternels", zone: "fr" },
  { realm: "Cho'gall", zone: "fr" },
  { realm: "Confrérie du Thorium", zone: "fr" },
  { realm: "Culte de la Rive noire", zone: "fr" },
  { realm: "Dalaran", zone: "fr" },
  { realm: "Drek'Thar", zone: "fr" },
  { realm: "Eitrigg", zone: "fr" },
  { realm: "Eldre'Thalas", zone: "fr" },
  { realm: "Elune", zone: "fr" },
  { realm: "Garona", zone: "fr" },
  { realm: "Hyjal", zone: "fr" },
  { realm: "Illidan", zone: "fr" },
  { realm: "Kael'thas", zone: "fr" },
  { realm: "Khaz Modan", zone: "fr" },
  { realm: "Kirin Tor", zone: "fr" },
  { realm: "Krasus", zone: "fr" },
  { realm: "La Croisade écarlate", zone: "fr" },
  { realm: "Les Clairvoyants", zone: "fr" },
  { realm: "Les Sentinelles", zone: "fr" },
  { realm: "Marécage de Zangar", zone: "fr" },
  { realm: "Medivh", zone: "fr" },
  { realm: "Naxxramas", zone: "fr" },
  { realm: "Ner'zhul", zone: "fr" },
  { realm: "Rashgarroth", zone: "fr" },
  { realm: "Sargeras", zone: "fr" },
  { realm: "Sinstralis", zone: "fr" },
  { realm: "Suramar", zone: "fr" },
  { realm: "Temple noir", zone: "fr" },
  { realm: "Throk'Feroth", zone: "fr" },
  { realm: "Uldaman", zone: "fr" },
  { realm: "Varimathras", zone: "fr" },
  { realm: "Vol'jin", zone: "fr" },
  { realm: "Ysondre", zone: "fr" },
  { realm: "Aegwynn", zone: "ge" },
  { realm: "Alexstrasza", zone: "ge" },
  { realm: "Alleria", zone: "ge" },
  { realm: "Aman'Thul", zone: "ge" },
  { realm: "Ambossar", zone: "ge" },
  { realm: "Anetheron", zone: "ge" },
  { realm: "Antonidas", zone: "ge" },
  { realm: "Anub'arak", zone: "ge" },
  { realm: "Area 52", zone: "ge" },
  { realm: "Arthas", zone: "ge" },
  { realm: "Arygos", zone: "ge" },
  { realm: "Azshara", zone: "ge" },
  { realm: "Baelgun", zone: "ge" },
  { realm: "Blackhand", zone: "ge" },
  { realm: "Blackmoore", zone: "ge" },
  { realm: "Blackrock", zone: "ge" },
  { realm: "Blutkessel", zone: "ge" },
  { realm: "Dalvengyr", zone: "ge" },
  { realm: "Das Konsortium", zone: "ge" },
  { realm: "Das Syndikat", zone: "ge" },
  { realm: "Der Mithrilorden", zone: "ge" },
  { realm: "Der Rat von Dalaran", zone: "ge" },
  { realm: "Der abyssische Rat", zone: "ge" },
  { realm: "Destromath", zone: "ge" },
  { realm: "Dethecus", zone: "ge" },
  { realm: "Die Aldor", zone: "ge" },
  { realm: "Die Nachtwache", zone: "ge" },
  { realm: "Die Silberne Hand", zone: "ge" },
  { realm: "Die Todeskrallen", zone: "ge" },
  { realm: "Dun Morogh", zone: "ge" },
  { realm: "Durotan", zone: "ge" },
  { realm: "Echsenkessel", zone: "ge" },
  { realm: "Eredar", zone: "ge" },
  { realm: "Festung der Stürme", zone: "ge" },
  { realm: "Forscherliga", zone: "ge" },
  { realm: "Frostmourne", zone: "ge" },
  { realm: "Frostwolf", zone: "ge" },
  { realm: "Garrosh", zone: "ge" },
  { realm: "Gilneas", zone: "ge" },
  { realm: "Gorgonnash", zone: "ge" },
  { realm: "Gul'dan", zone: "ge" },
  { realm: "Kargath", zone: "ge" },
  { realm: "Kel'Thuzad", zone: "ge" },
  { realm: "Khaz'goroth", zone: "ge" },
  { realm: "Kil'jaeden", zone: "ge" },
  { realm: "Krag'jin", zone: "ge" },
  { realm: "Kult der Verdammten", zone: "ge" },
  { realm: "Lordaeron", zone: "ge" },
  { realm: "Lothar", zone: "ge" },
  { realm: "Madmortem", zone: "ge" },
  { realm: "Mal'Ganis", zone: "ge" },
  { realm: "Malfurion", zone: "ge" },
  { realm: "Malorne", zone: "ge" },
  { realm: "Malygos", zone: "ge" },
  { realm: "Mannoroth", zone: "ge" },
  { realm: "Mug'thol", zone: "ge" },
  { realm: "Nathrezim", zone: "ge" },
  { realm: "Nazjatar", zone: "ge" },
  { realm: "Nefarian", zone: "ge" },
  { realm: "Nera'thor", zone: "ge" },
  { realm: "Nethersturm", zone: "ge" },
  { realm: "Norgannon", zone: "ge" },
  { realm: "Nozdormu", zone: "ge" },
  { realm: "Onyxia", zone: "ge" },
  { realm: "Perenolde", zone: "ge" },
  { realm: "Proudmoore", zone: "ge" },
  { realm: "Rajaxx", zone: "ge" },
  { realm: "Rexxar", zone: "ge" },
  { realm: "Shattrath", zone: "ge" },
  { realm: "Taerar", zone: "ge" },
  { realm: "Teldrassil", zone: "ge" },
  { realm: "Terrordar", zone: "ge" },
  { realm: "Theradras", zone: "ge" },
  { realm: "Thrall", zone: "ge" },
  { realm: "Tichondrius", zone: "ge" },
  { realm: "Tirion", zone: "ge" },
  { realm: "Todeswache", zone: "ge" },
  { realm: "Ulduar", zone: "ge" },
  { realm: "Un'Goro", zone: "ge" },
  { realm: "Vek'lor", zone: "ge" },
  { realm: "Wrathbringer", zone: "ge" },
  { realm: "Ysera", zone: "ge" },
  { realm: "Zirkel des Cenarius", zone: "ge" },
  { realm: "Zuluhed", zone: "ge" },
  { realm: "Nemesis", zone: "it" },
  { realm: "Pozzo dell'Eternità", zone: "it" },
  { realm: "Aggra", zone: "po" },
  { realm: "Ashenvale", zone: "ru" },
  { realm: "Azuregos", zone: "ru" },
  { realm: "Blackscar", zone: "ru" },
  { realm: "Booty Bay", zone: "ru" },
  { realm: "Borean Tundra", zone: "ru" },
  { realm: "Deathguard", zone: "ru" },
  { realm: "Deathweaver", zone: "ru" },
  { realm: "Deepholm", zone: "ru" },
  { realm: "Eversong", zone: "ru" },
  { realm: "Fordragon", zone: "ru" },
  { realm: "Galakrond", zone: "ru" },
  { realm: "Goldrinn", zone: "ru" },
  { realm: "Gordunni", zone: "ru" },
  { realm: "Greymane", zone: "ru" },
  { realm: "Grom", zone: "ru" },
  { realm: "Howling Fjord", zone: "ru" },
  { realm: "Lich King", zone: "ru" },
  { realm: "Razuvious", zone: "ru" },
  { realm: "Soulflayer", zone: "ru" },
  { realm: "Thermaplugg", zone: "ru" },
  { realm: "C'Thun", zone: "es" },
  { realm: "Colinas Pardas", zone: "es" },
  { realm: "Dun Modr", zone: "es" },
  { realm: "Exodar", zone: "es" },
  { realm: "Los Errantes", zone: "es" },
  { realm: "Minahonda", zone: "es" },
  { realm: "Sanguino", zone: "es" },
  { realm: "Shen'dralar", zone: "es" },
  { realm: "Tyrande", zone: "es" },
  { realm: "Uldum", zone: "es" },
  { realm: "Zul'jin", zone: "es" },
  { realm: "Tyrande", zone: "es" },
  { realm: "Aerie Peak", zone: "uk" },
  { realm: "Agamaggan", zone: "uk" },
  { realm: "Aggramar", zone: "uk" },
  { realm: "Ahn'Qiraj", zone: "uk" },
  { realm: "Al'Akir", zone: "uk" },
  { realm: "Alonsus", zone: "uk" },
  { realm: "Anachronos", zone: "uk" },
  { realm: "Arathor", zone: "uk" },
  { realm: "Argent Dawn", zone: "uk" },
  { realm: "Aszune", zone: "uk" },
  { realm: "Auchindoun", zone: "uk" },
  { realm: "Azjol-Nerub", zone: "uk" },
  { realm: "Azuremyst", zone: "uk" },
  { realm: "Balnazzar", zone: "uk" },
  { realm: "Blade's Edge", zone: "uk" },
  { realm: "Bladefist", zone: "uk" },
  { realm: "Bloodfeather", zone: "uk" },
  { realm: "Bloodhoof", zone: "uk" },
  { realm: "Bloodscalp", zone: "uk" },
  { realm: "Boulderfist", zone: "uk" },
  { realm: "Bronze Dragonflight", zone: "uk" },
  { realm: "Bronzebeard", zone: "uk" },
  { realm: "Burning Blade", zone: "uk" },
  { realm: "Burning Legion", zone: "uk" },
  { realm: "Burning Steppes", zone: "uk" },
  { realm: "Chamber of Aspects", zone: "uk" },
  { realm: "Chromaggus", zone: "uk" },
  { realm: "Crushridge", zone: "uk" },
  { realm: "Daggerspine", zone: "uk" },
  { realm: "Darkmoon Faire", zone: "uk" },
  { realm: "Darksorrow", zone: "uk" },
  { realm: "Darkspear", zone: "uk" },
  { realm: "Deathwing", zone: "uk" },
  { realm: "Defias Brotherhood", zone: "uk" },
  { realm: "Dentarg", zone: "uk" },
  { realm: "Doomhammer", zone: "uk" },
  { realm: "Draenor", zone: "uk" },
  { realm: "Dragonblight", zone: "uk" },
  { realm: "Dragonmaw", zone: "uk" },
  { realm: "Drak'thul", zone: "uk" },
  { realm: "Dunemaul", zone: "uk" },
  { realm: "Earthen Ring", zone: "uk" },
  { realm: "Emerald Dream", zone: "uk" },
  { realm: "Emeriss", zone: "uk" },
  { realm: "Eonar", zone: "uk" },
  { realm: "Executus", zone: "uk" },
  { realm: "Frostmane", zone: "uk" },
  { realm: "Frostwhisper", zone: "uk" },
  { realm: "Genjuros", zone: "uk" },
  { realm: "Ghostlands", zone: "uk" },
  { realm: "Grim Batol", zone: "uk" },
  { realm: "Hakkar", zone: "uk" },
  { realm: "Haomarush", zone: "uk" },
  { realm: "Hellfire", zone: "uk" },
  { realm: "Hellscream", zone: "uk" },
  { realm: "Jaedenar", zone: "uk" },
  { realm: "Karazhan", zone: "uk" },
  { realm: "Kazzak", zone: "uk" },
  { realm: "Khadgar", zone: "uk" },
  { realm: "Kilrogg", zone: "uk" },
  { realm: "Kor'gall", zone: "uk" },
  { realm: "Kul Tiras", zone: "uk" },
  { realm: "Laughing Skull", zone: "uk" },
  { realm: "Lightbringer", zone: "uk" },
  { realm: "Lightning's Blade", zone: "uk" },
  { realm: "Magtheridon", zone: "uk" },
  { realm: "Mazrigos", zone: "uk" },
  { realm: "Moonglade", zone: "uk" },
  { realm: "Nagrand", zone: "uk" },
  { realm: "Neptulon", zone: "uk" },
  { realm: "Tyrande", zone: "uk" },
  { realm: "Nordrassil", zone: "uk" },
  { realm: "Outland", zone: "uk" },
  { realm: "Quel'Thalas	", zone: "uk" },
  { realm: "Ragnaros", zone: "uk" },
  { realm: "Ravencrest", zone: "uk" },
  { realm: "Ravenholdt", zone: "uk" },
  { realm: "Runetotem", zone: "uk" },
  { realm: "Saurfang", zone: "uk" },
  { realm: "Scarshield Legion", zone: "uk" },
  { realm: "Shadowsong", zone: "uk" },
  { realm: "Shattered Halls", zone: "uk" },
  { realm: "Shattered Hand", zone: "uk" },
  { realm: "Silvermoon", zone: "uk" },
  { realm: "Skullcrusher", zone: "uk" },
  { realm: "Spinebreaker", zone: "uk" },
  { realm: "Sporeggar", zone: "uk" },
  { realm: "Steamwheedle Cartel", zone: "uk" },
  { realm: "Stormrage", zone: "uk" },
  { realm: "Stormreaver", zone: "uk" },
  { realm: "Stormscale", zone: "uk" },
  { realm: "Sunstrider", zone: "uk" },
  { realm: "Sylvanas", zone: "uk" },
  { realm: "Talnivarr", zone: "uk" },
  { realm: "Tarren Mill", zone: "uk" },
  { realm: "Terenas", zone: "uk" },
  { realm: "Terokkar", zone: "uk" },
  { realm: "The Maelstrom", zone: "uk" },
  { realm: "The Sha'tar", zone: "uk" },
  { realm: "The Venture Co", zone: "uk" },
  { realm: "Thunderhorn", zone: "uk" },
  { realm: "Trollbane", zone: "uk" },
  { realm: "Turalyon", zone: "uk" },
  { realm: "Twilight's Hammer", zone: "uk" },
  { realm: "Twisting Nether", zone: "uk" },
  { realm: "Vashj", zone: "uk" },
  { realm: "Vek'nilash", zone: "uk" },
  { realm: "Wildhammer", zone: "uk" },
  { realm: "Xavius", zone: "uk" },
  { realm: "Zenedar", zone: "uk" }
];

// *tableau qui va contenir toutes les urls avec les data en json
let urls = [];
// *Tableau qui va contenir toutes les enchères en cours
let auctions = [];

const getUrls = async () => {
  /**
   * * Get urls est une fonction asynchrone qui boucle autour du tableau des serveurs Wow, et qui va taper dans l'API pour récuperer
   * * l'url qui contient le flux JSON de l'hotel des ventes *
   * ! Certains serveurs plante, l'exception est normalement gérée et le script continu
   * @param ne prend aucun paramètre
   */

  // *Je réinitialise le tableau
  auctions = [];

  let ArrayUrls = realm.map(async scan => {
    await axios
      .get(
        `https://eu.api.blizzard.com/wow/auction/data/${
          scan.realm
        }?locale=fr_FR&access_token=${token}`
      )
      .then(auctionsUrl => {
        /**
         * *Push toutes les urls dans le tableau urls, pour être résolue plus tard
         */
        urls.push(auctionsUrl.data.files[0].url);
      })
      .catch(error => {
        console.log(error);
      });
  });

  /**
   * *Attends que toutes les urls soient piush dans le tableau avant de résoudre,
   * *afin d'éviter que axios ne plante (trop de requête en même temps)
   */
  await Promise.all(ArrayUrls);

  /**
   * *Une fois toutes les urls obtenues et stockés dans le tableau urls, on lance la fonction fetchUrls
   */
  //fetchUrls();
  fetchUrls(urls);
  console.log(urls);
};

/**
 * @param Array arr : liste d'urls
 * *Fonction récursive, qui va effectuer un appel asynchrone sur chaque url du tableau "arr",
 * *Une fois que les données ont étés traités, la fonction s'appelle elle même jusqu'à ce que
 * *toutes les urls soivent traitées
 */
const fetchUrls = arr => {
  let index = 0;
  // * Fonction qui va être appellée de manière récursive
  const request = () => {
    return axios
      .get(arr[index])
      .then(res => {
        index++;
        res.data.auctions.map(item => {
          // * Liste des objets à rechercher (va être dynamique)
          if (
            item.item === 1121 ||
            item.item === 12994 ||
            item.item === 2911 ||
            item.item === 12987 ||
            item.item === 12977
          ) {
            if (item.bonusLists !== undefined) {
              if (item.bonusLists[0].bonusListId === 3901) {
                auctions.push(item);
                console.log(
                  "************************* ITEM 28 ILVL FOUND***************************"
                );
                console.log(item);
                console.log(
                  "******************************************************************"
                );
              }
            }
            console.log("wrong ilevel..");
          }
        });
        if (index >= arr.length) {
          // * toutes les urls on étés fetch
          console.log("done");
          console.log(auctions);
          const newAuction = new Auction({
            auctions: auctions
          });
          newAuction
            .save()
            .then(response => {
              console.log(response);
            })
            .catch(error => {
              console.log(error);
            });

          // !Appel récursif
          return "done";
        }
        // !Appel récursif
        return request();
      })
      .catch(error => {
        console.log(error);
        // !Appel récursif
        return request();
      });
  };

  return request();
};

setTimeout(() => {
  getUrls();
}, 10000);

setInterval(() => {
  getUrls();
}, 3600000);

// @route GET api/scanner/scann
// @desc Register user
// @access Public
router.get("/get/all", (req, res) => {
  Auction.find({})
    .then(response => {
      res.send(200).json(reponse.data);
    })
    .catch(error => {
      console.log(error);
    })
    .sort({ _id: 1 })
    .limit(1);
});

module.exports = router;
