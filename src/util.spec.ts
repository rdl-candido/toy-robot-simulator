import { CommandType, Direction } from "./types";
import { Util } from "./util";

describe("Util", () => {
  describe("parseCommand", () => {
    it("should parse MOVE", () => {
      expect(Util.parseCommand("MOVE")).toEqual({
        command: CommandType.Move,
      });
    });
    it("should parse LEFT", () => {
      expect(Util.parseCommand("LEFT")).toEqual({
        command: CommandType.Left,
      });
    });
    it("should parse RIGHT", () => {
      expect(Util.parseCommand("RIGHT")).toEqual({
        command: CommandType.Right,
      });
    });
    it("should parse REPORT", () => {
      expect(Util.parseCommand("REPORT")).toEqual({
        command: CommandType.Report,
      });
    });
    it("should parse Place 0,1,NORTH", () => {
      expect(Util.parseCommand("Place 0,1,NORTH")).toEqual({
        command: CommandType.Place,
        position: {
          x: 0,
          y: 1,
        },
        direction: Direction.North,
      });
    });
    it("should parse Place 10,5,East", () => {
      expect(Util.parseCommand("Place 10,5,East")).toEqual({
        command: CommandType.Place,
        position: {
          x: 10,
          y: 5,
        },
        direction: Direction.East,
      });
    });
    it("should parse Place 3,1,South", () => {
      expect(Util.parseCommand("Place 3,1,South")).toEqual({
        command: CommandType.Place,
        position: {
          x: 3,
          y: 1,
        },
        direction: Direction.South,
      });
    });
    it("should parse Place 6,2,West", () => {
      expect(Util.parseCommand("Place 6,2,West")).toEqual({
        command: CommandType.Place,
        position: {
          x: 6,
          y: 2,
        },
        direction: Direction.West,
      });
    });
    it("should throw an error Place 6 2 West", () => {
      expect(() => {
        Util.parseCommand("Place 6 2 West");
      }).toThrow(`Invalid place command`);
    });
  });
});
