import { Direction } from "./types";
import { Robot } from "./robot";

describe("Toy Robot Simulator", () => {
  describe("Robot", () => {
    let myRobot: Robot;

    beforeEach(() => {
      myRobot = new Robot();
    });

    it(`should execute "Place 2,2,North"`, () => {
      myRobot.runCmd("Place 2,2,North");
      expect(myRobot.getDirection).toBe(Direction.North);
      expect(myRobot.getPosition).toEqual({ x: 2, y: 2 });
    });

    it(`shouldn't execute "Place 6,6,North" because it's out of limits`, () => {
      expect(myRobot.runCmd("Place 10,20,North")).toBeFalsy();
    });

    it(`shouldn't run any command before the first "place" command`, () => {
      expect(myRobot.runCmd("Left")).toBeFalsy();
      expect(myRobot.runCmd("Right")).toBeFalsy();
      expect(myRobot.runCmd("Move")).toBeFalsy();
      expect(myRobot.runCmd("Report")).toBeFalsy();
    });

    it(`should execute one place after the other`, () => {
      myRobot.runCmd("Place 1,1,East");
      expect(myRobot.getDirection).toBe(Direction.East);
      expect(myRobot.getPosition).toEqual({ x: 1, y: 1 });

      myRobot.runCmd("Place 2,1,South");
      expect(myRobot.getDirection).toBe(Direction.South);
      expect(myRobot.getPosition).toEqual({ x: 2, y: 1 });
    });

    it(`should move towards North when there is space`, () => {
      myRobot.runCmd("Place 0,0,North");
      myRobot.runCmd("Move");
      expect(myRobot.getDirection).toBe(Direction.North);
      expect(myRobot.getPosition).toEqual({ x: 0, y: 1 });
    });
    it(`shouldn't move towards North when there is no space`, () => {
      myRobot.runCmd("Place 0,5,North");
      myRobot.runCmd("Move");
      expect(myRobot.getDirection).toBe(Direction.North);
      expect(myRobot.getPosition).toEqual({ x: 0, y: 5 });
    });

    it(`should move towards East when there is space`, () => {
      myRobot.runCmd("Place 0,0,East");
      myRobot.runCmd("Move");
      expect(myRobot.getDirection).toBe(Direction.East);
      expect(myRobot.getPosition).toEqual({ x: 1, y: 0 });
    });
    it(`shouldn't move towards East when there is no space`, () => {
      myRobot.runCmd("Place 5,0,East");
      myRobot.runCmd("Move");
      expect(myRobot.getDirection).toBe(Direction.East);
      expect(myRobot.getPosition).toEqual({ x: 5, y: 0 });
    });

    it(`should move towards South when there is space`, () => {
      myRobot.runCmd("Place 0,5,South");
      myRobot.runCmd("Move");
      expect(myRobot.getDirection).toBe(Direction.South);
      expect(myRobot.getPosition).toEqual({ x: 0, y: 4 });
    });
    it(`shouldn't move towards South when there is no space`, () => {
      myRobot.runCmd("Place 0,0,South");
      myRobot.runCmd("Move");
      expect(myRobot.getDirection).toBe(Direction.South);
      expect(myRobot.getPosition).toEqual({ x: 0, y: 0 });
    });

    it(`should move towards West when there is space`, () => {
      myRobot.runCmd("Place 5,0,West");
      myRobot.runCmd("Move");
      expect(myRobot.getDirection).toBe(Direction.West);
      expect(myRobot.getPosition).toEqual({ x: 4, y: 0 });
    });
    it(`shouldn't move towards West when there is no space`, () => {
      myRobot.runCmd("Place 0,0,West");
      myRobot.runCmd("Move");
      expect(myRobot.getDirection).toBe(Direction.West);
      expect(myRobot.getPosition).toEqual({ x: 0, y: 0 });
    });

    it(`should console.log location and direction`, () => {
      const consoleLogSpy = jest.spyOn(console, "log");

      myRobot.runCmd("Place 1,2,West");
      myRobot.runCmd("Report");

      expect(consoleLogSpy).toHaveBeenCalledWith("1,2,WEST");
    });

    it(`should face East when turn Right from North`, () => {
      myRobot.runCmd("Place 0,0,North");
      myRobot.runCmd("Right");
      expect(myRobot.getPosition).toEqual({ x: 0, y: 0 });
      expect(myRobot.getDirection).toBe(Direction.East);
    });
    it(`should face South when turn Right from East`, () => {
      myRobot.runCmd("Place 0,0,East");
      myRobot.runCmd("Right");
      expect(myRobot.getPosition).toEqual({ x: 0, y: 0 });
      expect(myRobot.getDirection).toBe(Direction.South);
    });
    it(`should face West when turn Right from South`, () => {
      myRobot.runCmd("Place 0,0,South");
      myRobot.runCmd("Right");
      expect(myRobot.getPosition).toEqual({ x: 0, y: 0 });
      expect(myRobot.getDirection).toBe(Direction.West);
    });
    it(`should face North when turn Right from West`, () => {
      myRobot.runCmd("Place 0,0,West");
      myRobot.runCmd("Right");
      expect(myRobot.getPosition).toEqual({ x: 0, y: 0 });
      expect(myRobot.getDirection).toBe(Direction.North);
    });

    it(`should face West when turn Left from North`, () => {
      myRobot.runCmd("Place 0,0,North");
      myRobot.runCmd("Left");
      expect(myRobot.getPosition).toEqual({ x: 0, y: 0 });
      expect(myRobot.getDirection).toBe(Direction.West);
    });
    it(`should face South when turn Left from West`, () => {
      myRobot.runCmd("Place 0,0,West");
      myRobot.runCmd("Left");
      expect(myRobot.getPosition).toEqual({ x: 0, y: 0 });
      expect(myRobot.getDirection).toBe(Direction.South);
    });
    it(`should face East when turn Left from South`, () => {
      myRobot.runCmd("Place 0,0,South");
      myRobot.runCmd("Left");
      expect(myRobot.getPosition).toEqual({ x: 0, y: 0 });
      expect(myRobot.getDirection).toBe(Direction.East);
    });
    it(`should face North when turn Left from East`, () => {
      myRobot.runCmd("Place 0,0,East");
      myRobot.runCmd("Left");
      expect(myRobot.getPosition).toEqual({ x: 0, y: 0 });
      expect(myRobot.getDirection).toBe(Direction.North);
    });
  });
});
