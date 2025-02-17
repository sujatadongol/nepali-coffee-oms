import espresso from './assets/espresso.jpg'
import espressoMachiato from './assets/espressoMacchiato.jpg'
import americano from './assets/americano.jpeg'
import flovouredAmericano from './assets/flovouredAmericano.jpeg'
import cafelatte from './assets/cafelatte.jpg'
import masalalattee from './assets/masalalattee.png'
import caramelLatte from './assets/caramelLatte.jpeg'
import honeylatte from './assets/honeylatte.jpeg'
import capuccino from './assets/capuccino.jpeg'
import hotchocolate from './assets/hotchocolate.jpg'
import hotlemon from './assets/hotLemon.jpeg'
import HoneyHotLemon from './assets/honehotlemon.jpeg'
import gingerhotlemon from './assets/gingerhoneyhotlemon.jpeg'
import steamemilk from './assets/steamedMilk.jpeg'
import greentea from './assets/greentea.jpg.webp'
import blacktea from './assets/blacktea.png'
import milktea from './assets/milktea.jpeg'
import flavouredcappucino from './assets/Flavored Cappuccino.jpeg'
import cafemocha from './assets/cafemocha.jpeg'
import caramelmachhiato from './assets/caramelMacchiato.jpg'
import mochamadness from './assets/blendedValinaMocha.png'
import frenchlatte from './assets/frenchLatte.jpg'
import icedamericano from './assets/icedAmericano.png'
import icedFlavouredamericano from './assets/IcedAmericano.jpg'
import icedlatte from './assets/iced-latte.jpg'
import iceFlavouredlatte from './assets/iced-latte.jpg'
import iceFlavouredmachhiato from './assets/Iced Flavored Macchiato.jpeg'
import blendedMocha from './assets/blendedmocha.jpeg'
import blendedVanillaMocha from './assets/blendedValinaMocha.png'
import flavouredBlendedMoha from './assets/floavredblendenMocha.jpeg'

const coffeeCategories = [
  {
    key: "Black Coffee",
    label: "Black Coffee",
    items: [
      { id: "c1", name: "Single Shot Espresso", price: 110, imgSrc: espresso },
      { id: "c2", name: "Double Shot Espresso", price: 140, imgSrc: espresso },
      { id: "c3", name: "Espresso Macchiato", price: 140, imgSrc: espressoMachiato },
      { id: "c4", name: "Single Shot Americano", price: 120, imgSrc: americano },
      { id: "c5", name: "Double Shot Americano", price: 140, imgSrc: americano },
      { id: "c6", name: "Flavored Americano", price: 180, imgSrc: flovouredAmericano }
    ]
  },
  {
    key: "Milk Coffee",
    label: "Milk Coffee",
    items: [
      { id: "c7", name: "Cafe Latte", price: 165, imgSrc: cafelatte },
      { id: "c8", name: "Masala Latte", price: 190, imgSrc: masalalattee },
      { id: "c9", name: "Caramel Latte", price: 225, imgSrc: caramelLatte },
      { id: "c10", name: "Honey Latte", price: 225, imgSrc: honeylatte },
      { id: "c11", name: "Cappuccino", price: 155, imgSrc: capuccino },
      { id: "c12", name: "Flavored Cappuccino", price: 195, imgSrc: flavouredcappucino },
      { id: "c13", name: "Cafe Mocha", price: 210, imgSrc: cafemocha },
      { id: "c14", name: "Caramel Macchiato", price: 190, imgSrc: caramelmachhiato },
      { id: "c15", name: "Mocha Madness", price: 265, imgSrc: mochamadness },
      { id: "c16", name: "French Latte", price: 265, imgSrc: frenchlatte }
    ]
  },
  {
    key: "Coffee Alternatives",
    label: "Alternatives",
    items: [
      { id: "c17", name: "Hot Chocolate", price: 195, imgSrc: hotchocolate },
      { id: "c18", name: "Hot Lemon", price: 60, imgSrc: hotlemon },
      { id: "c19", name: "Honey Hot Lemon", price: 160, imgSrc: HoneyHotLemon },
      { id: "c20", name: "Ginger Hot Lemon", price: 95, imgSrc: gingerhotlemon },
      { id: "c21", name: "Ginger Honey Hot Lemon", price: 170, imgSrc: gingerhotlemon },
      { id: "c22", name: "Steamed Milk", price: 105, imgSrc: steamemilk },
      { id: "c23", name: "Milk Tea", price: 80, imgSrc: milktea },
      { id: "c24", name: "Black Tea", price: 50, imgSrc: blacktea },
      { id: "c25", name: "Green Tea", price: 70, imgSrc: greentea }
    ]
  },
  {
    key: "Cold Coffee",
    label: "Cold Coffee",
    items: [
      { id: "c26", name: "Iced Americano", price: 190, imgSrc: icedamericano },
      { id: "c27", name: "Iced Flavored Americano", price: 205, imgSrc: icedFlavouredamericano },
      { id: "c28", name: "Iced Latte", price: 199, imgSrc: icedlatte },
      { id: "c29", name: "Iced Flavored Latte", price: 220, imgSrc: iceFlavouredlatte },
      { id: "c30", name: "Iced Flavored Macchiato", price: 220, imgSrc: iceFlavouredmachhiato },
      { id: "c31", name: "Blended Mocha", price: 285, imgSrc: blendedMocha },
      { id: "c32", name: "Blended Vanilla Mocha", price: 325, imgSrc: blendedVanillaMocha },
      { id: "c33", name: "Flavoured Blended Mocha", price: 325, imgSrc: flavouredBlendedMoha }
    ]
  }
];


export default coffeeCategories;

