import { Position } from "../GameController/position";
import { Letters, GetLetterFromValue } from "../GameController/letters";
import { GameController } from "../GameController/gameController";

describe("checkIsHitTests", function () {
  test("should return true if there is a ship at the shooting Position", function () {
    var ships = GameController.InitializeShips();
    let counter = 1;
    ships.forEach((ship) => {
      for (var i = 1; i <= ship.size; i++) {
        ship.addPosition(new Position(counter, i));
      }
      counter++;
    });
    var actual = GameController.CheckIsHit(ships, new Position(Letters.B, 3));
    expect(actual).toBe(true);
  });

  it("should return false if there is no ship at the shooting Position", function () {
    var ships = GameController.InitializeShips();
    let counter = 1;
    ships.forEach((ship) => {
      for (var i = 1; i <= ship.size; i++) {
        ship.addPosition(new Position(counter, i));
      }
      counter++;
    });
    var actual = GameController.CheckIsHit(ships, new Position(Letters.G, 1));
    expect(actual).toBe(false);
  });

  it("should throw an exception if positstion is undefined", function () {
    var ships = GameController.InitializeShips();

    expect(() => {
      var actual = GameController.CheckIsHit(ships, undefined);
    }).toThrow();
  });

  it("should throw an exception if ship is undefined", function () {
    expect(() => {
      var actual = GameController.CheckIsHit(
        undefined,
        new Position(Letters.G, 1)
      );
    }).toThrow();
  });
});
