export enum Direction {
  North = "North",
  South = "South",
  East = "East",
  West = "West",
}

export enum Turn {
  Left = "Left",
  Right = "Right",
}

export enum CommandType {
  Place = "Place",
  Move = "Move",
  Left = "Left",
  Right = "Right",
  Report = "Report",
}

interface Position {
  x: number;
  y: number;
}

interface CommandDetails {
  command: CommandType;
}

interface PlaceCommandDetails {
  command: CommandType;
  position: Position;
  direction: Direction;
}

export function isPlaceCommandDetails(
  value: Command
): value is PlaceCommandDetails {
  return (value as PlaceCommandDetails).direction !== undefined;
}

export type Command = CommandDetails | PlaceCommandDetails;
