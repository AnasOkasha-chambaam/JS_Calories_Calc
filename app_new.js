function App(){
let foods;
let currentItem = null;


class Food {
  constructor(id, name, cal){
    this.id = id;
    this.name = name;
    this.cal = cal;
  }
}

const ele = (function (){class Elem {
  constructor(){
    this.nI = 'item-name',
    this.cI = 'item-calories',
    this.addBtn = 'add-btn',
    this.updateBtn = 'update',
    this.dltBtn = 'dlt',
    this.backBtn = 'back',
    this.ul = 'item-list',
    this.form = 'form',
    this.ttlClOtpt = 'total-calories',
    this.clrBtn = 'clear-all'
  }
  
}
const ele = new Elem;
return ele
})()

class x {
  static checkInptsN(name){
    let mustHaveLetter = /[A-Za-z]/i;
    if(mustHaveLetter.test(name.value)){
      return true
    } else {
      return false
    }
  }
  static checkInptsC(cal){
    let mustBeNum = /^([0-9]{1,})$/i;
    if(mustBeNum.test(cal.value)){
      return true
    } else {
      return false
    }
  }
  static generateId(array){
    let ID;
    if(array.length > 0){
      ID = (array[array.length -1].id + 1)
    } else {
      ID = 0
    }
    return ID;
  }
  static getTrgtId(trgt){
    const spltId = JSON.parse(trgt.parentElement.parentElement.id.split('-')[1]);
    return spltId
  }
}

class Doc {
  static calll(elementId){
    const called = document.getElementById(elementId);
    return called
  }
}

class UI {
  static showErr(inpt){
    inpt.classList.add('alertEr')
    inpt.nextElementSibling.classList.add('alertEr')
    setTimeout(() => {
      inpt.classList.remove('alertEr')
      inpt.nextElementSibling.classList.remove('alertEr')
    }, 550)
  }
  static showLSFoods(array){
    let otpt = '';
    array.forEach((item) => {
      otpt += `
      <li class="collection-item" id="item-${item.id}">
        <strong>${item.name}: </strong> <em>${item.cal} Calories</em>
        <a href="#" class="secondary-content">
          <i class="fa fa-pencil"></i>
        </a>
      </li>
      `
    })
    Doc.calll(ele.ul).innerHTML = otpt;
  }
  static clrInpts(){
    Doc.calll(ele.nI).value = ''
    Doc.calll(ele.cI).value = ''
  }
  static calcCal(array){
    let totalCal = 0;
    array.forEach((item) =>{
      totalCal += parseInt(item.cal);
    })
    Doc.calll(ele.ttlClOtpt).innerHTML = totalCal
    // console.log(totalCal)
  }
  static showEdtBtns(){
    Doc.calll(ele.addBtn).style.display = 'none'
    Doc.calll(ele.updateBtn).style.display = 'inline-block'
    Doc.calll(ele.dltBtn).style.display = 'inline-block'
    Doc.calll(ele.backBtn).style.display = 'inline-block'
  }
  static hideEdtBtns(){
    Doc.calll(ele.addBtn).style.display = 'inline-block'
    Doc.calll(ele.updateBtn).style.display = 'none'
    Doc.calll(ele.dltBtn).style.display = 'none'
    Doc.calll(ele.backBtn).style.display = 'none'
  }
  static getCurrentElement(array, crrntId){
    // let currentItem = null;
    array.forEach((item) => {
      if(item.id === crrntId){
        currentItem = item
      }
    })
    // console.log(currentItem)
    return currentItem
  }
  static editItem(crrnt){
    Doc.calll(ele.nI).value = crrnt.name
    Doc.calll(ele.cI).value = crrnt.cal
  }
  /*
  static clearAll(){
    while(Doc.calll(ele.ul).firstChild){
      Doc.calll(ele.ul).firstChild.remove
    }
  }
  */
}

class LS {
  static getFoods(){
    if(localStorage.getItem('foods') === null){
      // console.log('hey')
      foods = []
    } else {
      // console.log('hi')
      foods = JSON.parse(localStorage.getItem('foods'))
    }
    return foods;
  }
  static addToLS(array){
    localStorage.setItem('foods', JSON.stringify(array))
  }
  static updateCurrentItem(){
    currentItem.name = Doc.calll(ele.nI).value
    currentItem.cal = JSON.parse(Doc.calll(ele.cI).value)
    // console.log(foods)
    LS.addToLS(foods)
    UI.showLSFoods(JSON.parse(localStorage.getItem('foods')))
  }
  static removeFromLS(){
    foods.forEach((item, index) => {
      if(item.id === currentItem.id){
        foods.splice(index, 1)
      }
    })
    // console.log(foods)
  }
}
LS.getFoods()
// document.querySelector('ele.nI').classList.re
// console.log(ele.addBtn);
document.addEventListener('DOMContentLoaded', () => {
  const foods = LS.getFoods();
  UI.calcCal(foods)
  UI.showLSFoods(foods)
  // console.log(foods)
})
Doc.calll(ele.form).addEventListener('keypress',(n) => {
  if(n.keyCode === 13 || n.which ===13){
  if(Doc.calll(ele.addBtn).style.display === 'none'){
      return false
    }
  }
})
Doc.calll(ele.addBtn).addEventListener('click', (e) => {
  e.preventDefault();
  if(e.keyCode === 13 || e.which ===13){
    if(Doc.calll(ele.addBtn).style.display === 'none'){
        return false
      }
    } else if (Doc.calll(ele.addBtn).style.display === 'inline-block'){
    
    if(x.checkInptsN(Doc.calll(ele.nI)) && x.checkInptsC(Doc.calll(ele.cI))){
    const foods = LS.getFoods();
    // console.log(foods)
    const id = x.generateId(foods),
          name = Doc.calll(ele.nI).value,
          cal = Doc.calll(ele.cI).value;
    // console.log(id)
    // console.log(name)
    // console.log(cal)
    const food = new Food(id, name, cal);
    // console.log(food)
    foods.push(food)
    LS.addToLS(foods)
    UI.calcCal(foods)
    // localStorage.setItem('foods', JSON.stringify(foods))
    UI.showLSFoods(foods)
    UI.clrInpts()
  } else if(!x.checkInptsN(Doc.calll(ele.nI)) && !x.checkInptsC(Doc.calll(ele.cI))){
    UI.showErr(Doc.calll(ele.nI))
    UI.showErr(Doc.calll(ele.cI))
    // Doc.calll(ele.nI).classList.add('alertEr')
  } else if (!x.checkInptsN(Doc.calll(ele.nI))){
    UI.showErr(Doc.calll(ele.nI))
  } else if (!x.checkInptsC(Doc.calll(ele.cI))){
    UI.showErr(Doc.calll(ele.cI))
  }
  }
  // console.log(Doc.calll(ele.nI).value)
})
Doc.calll(ele.ul).addEventListener('click', (e) => {
  e.preventDefault()
  if(e.target.classList.contains('fa-pencil')){
    UI.showEdtBtns()
    const foods = LS.getFoods();
    let crrntId = x.getTrgtId(e.target);
    let crrnt = UI.getCurrentElement(foods, crrntId);
    UI.editItem(crrnt)
    // console.log(crrnt)
    
  } //  else {
  //   console.log(false)
  // }
})
Doc.calll(ele.backBtn).addEventListener('click', (e) => {
  e.preventDefault()
  UI.clrInpts()
  UI.hideEdtBtns()
  currentItem = null
  // document.getElementById('item-list').scrollIntoView({block: "nearest", behavior: "smooth"})
  window.scrollTo({top: 327, behavior: "smooth"})

  // console.log(currentItem)
})
Doc.calll(ele.updateBtn).addEventListener('click', (e) => {
  e.preventDefault()
  LS.updateCurrentItem()
  UI.clrInpts()
  UI.hideEdtBtns()
  UI.calcCal(foods)
  // console.log(currentItem)
})
Doc.calll(ele.dltBtn).addEventListener('click', (e) => {
  e.preventDefault()
  // console.log(foods)
  LS.removeFromLS()
  currentItem = null
  UI.clrInpts()
  LS.addToLS(foods)
  UI.showLSFoods(foods)
  UI.hideEdtBtns()
  UI.calcCal(foods)
  /*
  foods.splice(currentItem.id, 1)
  // console.log(foods)
  LS.addToLS(foods)
  UI.showLSFoods(foods)
  // console.log(currentItem)
  currentItem = null
  // console.log(currentItem)
  UI.clrInpts()
  UI.hideEdtBtns()
  */
})
Doc.calll(ele.clrBtn).addEventListener('click', (e) => {
  e.preventDefault()
  // UI.clearAll()
  foods = []
  LS.addToLS(foods)
  UI.showLSFoods(foods)
  UI.clrInpts()
  UI.hideEdtBtns()
  UI.calcCal(foods)
  
})
// console.log(foods)

/*
const ar = [{id: 1}, {id: 2},'a']

console.log(ar.indexOf({id: 2}))
*/
}
App()
let cmnt ={
/*
window.addEventListener('scroll', (e) => {
  // document.getElementById('item-list').scrollIntoView()
  console.log(e)
})

// window.scroll()
*/}