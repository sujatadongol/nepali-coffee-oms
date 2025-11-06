import espresso from './assets/espresso.jpg'
import espressoMachiato from './assets/espressoMacchiato.jpg'
import americano from './assets/americano.jpeg'
import flovouredAmericano from './assets/flovouredAmericano.jpeg'
import cafelatte from './assets/cafelatte.jpg'
import masalalattee from './assets/masalalattee.png'
import caramelLatte from './assets/caramelLatte.jpg'
import honeylatte from './assets/honeylatte.jpeg'
import capuccino from './assets/capuccino.jpeg'
import hotchocolate from './assets/hotchocolate.jpg'
import hotlemon from './assets/hotLemon.jpeg'
import HoneyHotLemon from './assets/honehotlemon.jpeg'
import gingerhotlemon from './assets/gingerhoneyhotlemon.jpeg'
import steamemilk from './assets/steamedMilk.jpeg'
import greentea from './assets/greentea.jpeg'
import blacktea from './assets/blacktea.png'
import milktea from './assets/milktea.jpeg'
import flavouredcappucino from './assets/flavoredCappuccino.jpeg'
import cafemocha from './assets/cafemocha.jpeg'
import caramelmachhiato from './assets/caramelMacchiato.jpg'
import mochamadness from './assets/blendedValinaMocha.png'
import frenchlatte from './assets/frenchLatte.jpg'
import icedamericano from './assets/IcedAmericano.jpg'
import icedFlavouredamericano from './assets/IcedAmericano.jpeg'
import icedlatte from './assets/icedLatte.jpg'
import iceFlavouredlatte from './assets/icedLatte.jpg'
import iceFlavouredmachhiato from './assets/icedFlavoredMacchiato.jpeg'
import blendedMocha from './assets/blendedmocha.jpeg'
import blendedVanillaMocha from './assets/blendedValinaMocha.png'
import flavouredBlendedMoha from './assets/blendedFlavouredMocha.jpeg'
import cookies from './assets/cookies.jpeg'
import choDanish from './assets/chodanish.jpeg'
import chocoBun from './assets/chcobun.jpeg'
import coconutBun from './assets/coconutbun.jpeg'
import cinamonDonut from './assets/cinamondonut.jpeg'
import miniLava from './assets/minilava.jpeg'
import brownie from './assets/brownie.jpeg'
import chicPattie from './assets/chickenpatties.jpeg'
import paneerPattie from './assets/paneerpatties.jpeg'
import brownyCake from './assets/brownieCake.jpg'
import mixedFruitCake from './assets/fruitCake.jpeg'
import chocoChipsCake from './assets/chocoChip.jpeg'
import butterScotchCake from './assets/butterScotch.jpeg'
import redVelvetCake from './assets/redVelvet.jpeg'
import mudMuffin from './assets/mudMuffin.jpeg'
import creambellIceCream from './assets/scoop.jpg'
import bubbleTea from './assets/bubbleTea.jpg'
import noData from './assets/noData.png'

const coffeeCategories = [
  {
    key: 'Black Coffee',
    label: 'Black Coffee',
    items: [
      { id: 'c1', name: 'Single Shot Espresso', price: 110, imgSrc: espresso },
      { id: 'c2', name: 'Double Shot Espresso', price: 140, imgSrc: espresso },
      { id: 'c3', name: 'Espresso Macchiato', price: 140, imgSrc: espressoMachiato },
      { id: 'c4', name: 'Single Shot Americano', price: 120, imgSrc: americano },
      { id: 'c5', name: 'Double Shot Americano', price: 140, imgSrc: americano },
      { id: 'c6', name: 'Flavored Americano', price: 180, imgSrc: flovouredAmericano }
    ]
  },
  {
    key: 'Milk Coffee',
    label: 'Milk Coffee',
    items: [
      { id: 'c7', name: 'Cafe Latte', price: 165, imgSrc: cafelatte },
      { id: 'c8', name: 'Masala Latte', price: 190, imgSrc: masalalattee },
      { id: 'c9', name: 'Caramel Latte', price: 225, imgSrc: caramelLatte },
      { id: 'c10', name: 'Honey Latte', price: 225, imgSrc: honeylatte },
      { id: 'c11', name: 'Cappuccino', price: 155, imgSrc: capuccino },
      { id: 'c12', name: 'Flavored Cappuccino', price: 195, imgSrc: flavouredcappucino },
      { id: 'c13', name: 'Cafe Mocha', price: 210, imgSrc: cafemocha },
      { id: 'c14', name: 'Caramel Macchiato', price: 190, imgSrc: caramelmachhiato },
      { id: 'c15', name: 'Mocha Madness', price: 265, imgSrc: mochamadness },
      { id: 'c16', name: 'French Latte', price: 265, imgSrc: frenchlatte }
    ]
  },
  {
    key: 'Cold Coffee',
    label: 'Cold Coffee',
    items: [
      { id: 'c26', name: 'Iced Expresso(Small)', price: 70, imgSrc: noData },
  { id: 'c27', name: 'Iced Expresso(Large)', price: 75, imgSrc: noData },
  { id: 'c28', name: 'Iced Americano(Small)', price: 80, imgSrc: noData },
  { id: 'c29', name: 'Iced Americano(Large)', price: 85, imgSrc: noData },
  { id: 'c30', name: 'Iced Mocha(Small)', price: 80, imgSrc: noData },
  { id: 'c31', name: 'Iced Mocha(Large)', price: 85, imgSrc: noData },
  { id: 'c32', name: 'Iced Cappuccino Frappe', price: 95, imgSrc: noData },
  { id: 'c33', name: 'Latte Frappe', price: 95, imgSrc: noData },
  { id: 'c34', name: 'Iced Latte(Small)', price: 85, imgSrc: noData },
  { id: 'c35', name: 'Iced Latte(Large)', price: 90, imgSrc: noData },
  { id: 'c36', name: 'Iced Matcha(Small)', price: 100, imgSrc: noData },
  { id: 'c37', name: 'Iced Matcha(Large)', price: 110, imgSrc: noData },
  { id: 'c38', name: 'Matcha Frappe', price: 115, imgSrc: noData },
  { id: 'c39', name: 'Iced Caramel Macchiato', price: 110, imgSrc: noData }
    ]
  },
  {
    key: 'Coffee Alternatives',
    label: 'Alternatives',
    items: [
      { id: 'c40', name: 'Orange Juice', price: 45, imgSrc: noData },
      { id: 'c41', name: 'Watermelon Juice', price: 45, imgSrc: noData },
      { id: 'c42', name: 'Pineapple Juice', price: 45, imgSrc: noData },
      { id: 'c43', name: 'Coke / Sprite / Fanta', price: 35, imgSrc: noData },
      { id: 'c44', name: 'Red Bull (Local)', price: 25, imgSrc: noData },
      { id: 'c45', name: 'Red Bull (Blue)', price: 100, imgSrc: noData }
    ]
  },
  {
    key: 'Bakery',
    label: 'Bakery',
    items: [
      { id: 'c17', name: 'Cookies', price: 150, imgSrc: cookies },
      { id: 'c18', name: 'Nuts over Brownie', price: 110, imgSrc: brownie },
      { id: 'c19', name: 'Browny Cake', price: 160, imgSrc: brownyCake },
      { id: 'c20', name: 'Creambell Ice Cream (per scoop)', price: 80, imgSrc: creambellIceCream },
      { id: 'c21', name: 'Mixed Fruit Cake', price: 160, imgSrc: mixedFruitCake },
      { id: 'c22', name: 'Choco Chips Cake', price: 160, imgSrc: chocoChipsCake },
      { id: 'c23', name: 'Butter Scotch Cake', price: 160, imgSrc: butterScotchCake },
      { id: 'c24', name: 'Red Velvet Cake', price: 150, imgSrc: redVelvetCake },
      { id: 'c25', name: 'Mud Muffin', price: 110, imgSrc: mudMuffin },
  
    ]    
  }
];


export default coffeeCategories;

