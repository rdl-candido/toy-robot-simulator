import { Direction, Command, CommandType } from "./types";

export class Util {
  static getPosition(position: string): Direction {
    switch (position.toLowerCase()) {
      case "north":
        return Direction.North;
      case "east":
        return Direction.East;
      case "south":
        return Direction.South;
      case "west":
        return Direction.West;
      default:
        throw new Error(`Invalid position`);
    }
  }

  static parseCommand(cmd: string): Command {
    const _cmd = cmd.toLowerCase().replace(/\s/gi, "");
    if (_cmd === "left") {
      return { command: CommandType.Left };
    }
    if (_cmd === "right") {
      return { command: CommandType.Right };
    }
    if (_cmd === "move") {
      return { command: CommandType.Move };
    }
    if (_cmd === "report") {
      return { command: CommandType.Report };
    }
    if (_cmd.startsWith("place")) {
      const pattern = /(place)(\d+),(\d+),(north|east|south|west)/gm;
      if (!pattern.test(_cmd)) {
        throw new Error(`Invalid place command`);
      }
      const [x, y, position] = _cmd.substr(5).split(",");
      return {
        command: CommandType.Place,
        position: {
          x: parseInt(x),
          y: parseInt(y),
        },
        direction: Util.getPosition(position),
      };
    }
    throw new Error(`Invalid command`);
  }
}
