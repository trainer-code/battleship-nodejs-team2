import { Battleship }  from "../battleship";
import { Position } from "../GameController/position";
import { Letters } from "../GameController/letters";

describe('parsePositionTests', function() {
  test('should return a valid position for valid input', function() {
    var expected = new Position(Letters.B, 3);
    var actual = Battleship.ParsePosition("B3");
    expect(actual).toEqual(expected);
  });
});