import { Position } from "../GameController/position";
import { Letters } from "../GameController/letters";
import { GameController }  from "../GameController/gameController";
import { Ship }  from "../GameController/ship";

describe('isShipValidTests', function () {

  it('should return true if the ship is valid', function () {
    var testship = new Ship("Battleship", 3);
    testship.addPosition(new Position(Letters.A, 1));
    testship.addPosition(new Position(Letters.A, 2));
    testship.addPosition(new Position(Letters.A, 3));

    var actual = GameController.isShipValid(testship);
    expect(actual).toBe(true);
  });

  it('should return false if the ship is invalid', function () {
    var testship = new Ship("Battleship", 3);

    var actual = GameController.isShipValid(testship);
    expect(actual).toBe(false);
  });
});