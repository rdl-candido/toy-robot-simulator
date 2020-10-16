import { Board } from "./board";
import { Util } from "./util";
import {
  Command,
  Direction,
  CommandType,
  isPlaceCommandDetails,
  Turn,
} from "./types";

export class Robot {
  private commands: Command[] = [];
  public direction = Direction.North;
  public position = { x: 0, y: 0 };

  constructor(public board = new Board(5, 5)) {}

  private canExecuteCmd(cmd: Command): boolean {
    if (this.commands.length === 0 && cmd.command !== CommandType.Place) {
      return false;
    }
    if (isPlaceCommandDetails(cmd)) {
      if (cmd.position.x > this.board.x) return false;
      if (cmd.position.y > this.board.y) return false;
    }
    if (cmd.command === CommandType.Move) {
      if (
        this.direction === Direction.North &&
        this.position.y + 1 > this.board.y
      )
        return false;
      if (
        this.direction === Direction.East &&
        this.position.x + 1 > this.board.x
      )
        return false;
      if (this.direction === Direction.South && this.position.y - 1 < 0)
        return false;
      if (this.direction === Direction.West && this.position.x - 1 < 0)
        return false;
    }
    return true;
  }

  private executeCmd(cmd: Command): void {
    this.commands.push(cmd);

    if (isPlaceCommandDetails(cmd)) {
      this.direction = cmd.direction;
      this.position = cmd.position;
    }
    if (cmd.command === CommandType.Left) {
      this.turn(Turn.Left);
      return;
    }
    if (cmd.command === CommandType.Right) {
      this.turn(Turn.Right);
      return;
    }
    if (cmd.command === CommandType.Move) {
      switch (this.direction) {
        case Direction.North:
          this.position.y++;
          return;
        case Direction.East:
          this.position.x++;
          return;
        case Direction.South:
          this.position.y--;
          return;
        case Direction.West:
          this.position.x--;
          return;
      }
    }

    if (cmd.command === CommandType.Report) {
      // eslint-disable-next-line no-console
      console.log(
        `${this.position.x},${this.position.y},${this.direction.toUpperCase()}`
      );
    }
  }

  public runCmd(cmd: string): boolean {
    const _cmd = Util.parseCommand(cmd);
    if (!this.canExecuteCmd(_cmd)) {
      return false;
    }
    this.executeCmd(_cmd);
    return true;
  }

  private turn(direction: Turn): void {
    const rightTurnPositions = [
      Direction.North,
      Direction.East,
      Direction.South,
      Direction.West,
      Direction.North,
    ];
    const leftTurnPositions = [
      Direction.North,
      Direction.West,
      Direction.South,
      Direction.East,
      Direction.North,
    ];
    if (direction === Turn.Right) {
      const currentPositionIndex = rightTurnPositions.indexOf(this.direction);
      this.direction = rightTurnPositions[currentPositionIndex + 1];
    } else {
      const currentPositionIndex = leftTurnPositions.indexOf(this.direction);
      this.direction = leftTurnPositions[currentPositionIndex + 1];
    }
  }
}
