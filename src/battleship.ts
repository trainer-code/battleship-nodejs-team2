import { Worker } from "worker_threads";
import readline from "readline-sync";
import { GameController } from "./GameController/gameController";
import cliColor  from "cli-color";
import beep from "beepbeep";
import { Position } from "./GameController/position";
import { Letters, GetLetterFromKey } from "./GameController/letters";

let telemetryWorker;

export class Battleship {
  private myFleet: any;
  private enemyFleet: any;
  start() {
    telemetryWorker = new Worker("./TelemetryClient/telemetryClient.js");

    console.log("Starting...");
    telemetryWorker.postMessage({
      eventName: "ApplicationStarted",
      properties: { Technology: "Node.js" },
    });

    console.log(cliColor.magenta("                                     |__"));
    console.log(cliColor.magenta("                                     |\\/"));
    console.log(cliColor.magenta("                                     ---"));
    console.log(cliColor.magenta("                                     / | ["));
    console.log(cliColor.magenta("                              !      | |||"));
    console.log(
      cliColor.magenta("                            _/|     _/|-++'")
    );
    console.log(
      cliColor.magenta("                        +  +--|    |--|--|_ |-")
    );
    console.log(
      cliColor.magenta("                     { /|__|  |/\\__|  |--- |||__/")
    );
    console.log(
      cliColor.magenta(
        "                    +---------------___[}-_===_.'____                 /\\"
      )
    );
    console.log(
      cliColor.magenta(
        "                ____`-' ||___-{]_| _[}-  |     |_[___\\==--            \\/   _"
      )
    );
    console.log(
      cliColor.magenta(
        " __..._____--==/___]_|__|_____________________________[___\\==--____,------' .7"
      )
    );
    console.log(
      cliColor.magenta(
        "|                        Welcome to Battleship                         BB-61/"
      )
    );
    console.log(
      cliColor.magenta(
        " \\_________________________________________________________________________|"
      )
    );
    console.log();

    this.InitializeGame();
    this.StartGame();
  }

  StartGame() {
    console.clear();
    console.log("                  __");
    console.log("                 /  \\");
    console.log("           .-.  |    |");
    console.log("   *    _.-'  \\  \\__/");
    console.log("    \\.-'       \\");
    console.log("   /          _/");
    console.log("  |      _  /");
    console.log("  |     /_\\'");
    console.log("   \\    \\_/");
    console.log('    """"');

    do {
      console.log();
      console.log("Player, it's your turn");
      console.log("Enter coordinates for your shot :");
      var position = Battleship.ParsePosition(readline.question());
      var isHit = GameController.CheckIsHit(this.enemyFleet, position);

      telemetryWorker.postMessage({
        eventName: "Player_ShootPosition",
        properties: { Position: position.toString(), IsHit: isHit },
      });

      if (isHit) {
        beep();

        console.log("                \\         .  ./");
        console.log('              \\      .:";\'.:.."   /');
        console.log("                  (M^^.^~~:.'\").");
        console.log("            -   (/  .    . . \\ \\)  -");
        console.log("               ((| :. ~ ^  :. .|))");
        console.log("            -   (\\- |  \\ /  |  /)  -");
        console.log("                 -\\  \\     /  /-");
        console.log("                   \\  \\   /  /");
      }

      console.log(isHit ? "Yeah ! Nice hit !" : "Miss");

      var computerPos = this.GetRandomPosition();
      var isHit = GameController.CheckIsHit(this.myFleet, computerPos);

      telemetryWorker.postMessage({
        eventName: "Computer_ShootPosition",
        properties: { Position: computerPos.toString(), IsHit: isHit },
      });

      console.log();
      console.log(
        `Computer shot in ${computerPos.column}${computerPos.row} and ` +
          (isHit ? `has hit your ship !` : `miss`)
      );
      if (isHit) {
        beep();

        console.log("                \\         .  ./");
        console.log('              \\      .:";\'.:.."   /');
        console.log("                  (M^^.^~~:.'\").");
        console.log("            -   (/  .    . . \\ \\)  -");
        console.log("               ((| :. ~ ^  :. .|))");
        console.log("            -   (\\- |  \\ /  |  /)  -");
        console.log("                 -\\  \\     /  /-");
        console.log("                   \\  \\   /  /");
      }
    } while (true);
  }

  static ParsePosition(input) {
    var letter = GetLetterFromKey(input.toUpperCase().substring(0, 1));
    var number = parseInt(input.substring(1, 2), 10);
    return new Position(letter, number);
  }

  GetRandomPosition() {
    var rows = 8;
    var lines = 8;
    var rndColumn = Math.floor(Math.random() * lines);
    var column = rndColumn + 1;
    var number = Math.floor(Math.random() * rows);
    var result = new Position(column, number);
    return result;
  }

  InitializeGame() {
    this.InitializeMyFleet();
    this.InitializeEnemyFleet();
  }

  InitializeMyFleet() {
    this.myFleet = GameController.InitializeShips();
    console.log('this.myFleet=', this.myFleet);

    console.log(
      "Please position your fleet (Game board size is from A to H and 1 to 8) :"
    );

    this.myFleet.forEach(function (ship) {
      console.log();
      console.log(
        `Please enter the positions for the ${ship.name} (size: ${ship.size})`
      );
      for (var i = 1; i < ship.size + 1; i++) {
        console.log(`Enter position ${i} of ${ship.size} (i.e A3):`);
        const position = readline.question();
        telemetryWorker.postMessage({
          eventName: "Player_PlaceShipPosition",
          properties: {
            Position: position,
            Ship: ship.name,
            PositionInShip: i,
          },
        });
        ship.addPosition(Battleship.ParsePosition(position));
      }
    });
  }

  InitializeEnemyFleet() {
    this.enemyFleet = GameController.InitializeShips();

    this.enemyFleet[0].addPosition(new Position(Letters.B, 4));
    this.enemyFleet[0].addPosition(new Position(Letters.B, 5));
    this.enemyFleet[0].addPosition(new Position(Letters.B, 6));
    this.enemyFleet[0].addPosition(new Position(Letters.B, 7));
    this.enemyFleet[0].addPosition(new Position(Letters.B, 8));

    this.enemyFleet[1].addPosition(new Position(Letters.E, 6));
    this.enemyFleet[1].addPosition(new Position(Letters.E, 7));
    this.enemyFleet[1].addPosition(new Position(Letters.E, 8));
    this.enemyFleet[1].addPosition(new Position(Letters.E, 9));

    this.enemyFleet[2].addPosition(new Position(Letters.A, 3));
    this.enemyFleet[2].addPosition(new Position(Letters.B, 3));
    this.enemyFleet[2].addPosition(new Position(Letters.C, 3));

    this.enemyFleet[3].addPosition(new Position(Letters.F, 8));
    this.enemyFleet[3].addPosition(new Position(Letters.G, 8));
    this.enemyFleet[3].addPosition(new Position(Letters.H, 8));

    this.enemyFleet[4].addPosition(new Position(Letters.C, 5));
    this.enemyFleet[4].addPosition(new Position(Letters.C, 6));
  }
}
