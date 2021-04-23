var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var database;

//create feed and lastFed variable here
var feed;
var lastFed;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {

  database=firebase.database();
  console.log(database)
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  

  addFood=createButton("Add Food");
  
  addFood.mousePressed(addFoods);

  //create feed the dog button here
  feedTheDog=createButton("Feed the Dog")
  
  feedTheDog.mousePressed(feedDog)
}

function draw() {
  background(46,139,87);
  foodObj.display();

  addFood.position(800,95);
  feedTheDog.position(800,200)

  //write code to read fedtime value from the database 
  if(lastFed>=12){
    textSize(30)
    text("Last Feed : 12 PM",350,30)
  }else if(lastFed==0){
    text("Last Feed : 12 AM",350,30)
  }else{}
  textSize(25)
  fill("white")
  text("Last Feed : 12 AM ",300,30)

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  //write code here to update food stock and last fed time

 var food_stock_val = foodObj.getFoodStock();
 if(food_stock_val <=0){
   foodObj.updateFoodStock(food_stock_val *0);
 }else{
   foodObj.updateFoodStock(food_stock_val -1)
 }
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })

  
}
