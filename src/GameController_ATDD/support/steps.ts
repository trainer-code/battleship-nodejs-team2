const { Given, When, Then, defineParameterType } = require("@cucumber/cucumber");

const assert = require('assert').strict;

import { Ship } from "../../GameController/ship";
import { Position } from "../../GameController/position";
import { Letters } from "../../GameController/letters";
import { GameController }  from "../../GameController/gameController";


var ship;
var actual;

defineParameterType({name: "bool", regexp: /"([^"]*)"/, transformer(text) {return text.toLowerCase()=="true"}});

Given("I have a {int} ship with {int} positions", function(size, positions){
  ship = new Ship('Ship name', 3);
  ship.size = size;
  for(var i = 1; i <= positions; i++) {
    ship.addPosition(new Position(Letters.A, i))
  }
});

When("I check if the ship is valid", function(){
  actual = GameController.isShipValid(ship);
});

Then("the result should be {bool}", function(expected){
  assert.strictEqual(actual, expected);
});


