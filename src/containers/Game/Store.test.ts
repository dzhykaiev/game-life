import { Game } from "./Store";

describe("Game Store", () => {
  test("Initial/default grid size should be 50", () => {
    // arrange
    const sut = new Game();
    // assert
    expect(sut.gridSize).toEqual(50);
  });

  test("Initial/default grid size should be handled in constructor", () => {
    // arrange
    const sut = new Game(5);
    // assert
    expect(sut.gridSize).toEqual(5);
  });

  test("Grid size should be mutable", () => {
    // arrange
    const sut = new Game();
    // act
    sut.changeSize(5);
    // assert
    expect(sut.gridSize).toEqual(5);
  });

  test("Grid list should be array", () => {
    // arrange
    const sut = new Game(5);
    // assert
    expect(Array.isArray(sut.gridList)).toBeTruthy();
  });

  test("Grid list size should be equal grid size", () => {
    // arrange
    const sut = new Game(5);
    const gridSize = sut.gridSize;
    const gridListLength = sut.gridList.length;
    // assert
    expect(gridSize).toEqual(gridListLength);
  });

  test("Grid lists cell size should be equal grid size and grid list size", () => {
    // arrange
    const sut = new Game(5);
    const gridSize = sut.gridSize;
    const gridListLength = sut.gridList.length;
    const isEqualCellSize = sut.gridList.every(
      cell => cell.length === gridSize && cell.length === gridListLength
    );
    // assert
    expect(isEqualCellSize).toBeTruthy();
  });

  test("Refresh method should create random new Grid list", () => {
    // arrange
    const sut = new Game(5);
    const currGridList = JSON.parse(JSON.stringify(sut.gridList));
    // act
    sut.refresh();
    // assert
    const newGridList = JSON.parse(JSON.stringify(sut.gridList));
    expect(currGridList).not.toEqual(newGridList);
  });

  test("Tick method should mutated new Grid list", () => {
    // arrange
    const sut = new Game(5);
    const currGridList = JSON.parse(JSON.stringify(sut.gridList));
    // act
    sut.tick();
    // assert
    const newGridList = JSON.parse(JSON.stringify(sut.gridList));
    expect(currGridList).not.toEqual(newGridList);
  });
});
