import { observable, action } from "mobx";

type GridList = Array<Array<boolean>>;
export class Game {
  @observable public gridSize: number;
  @observable public gridList: GridList;

  private randomBoolean = (): boolean => {
    return Math.random() >= 0.5;
  };

  private initialGridList = (): GridList => {
    let list: GridList = [];
    for (let i = 0; i < this.gridSize; i++) {
      list.push([]);
      for (let j = 0; j < this.gridSize; j++) {
        list[i].push(this.randomBoolean());
      }
    }
    return list;
  };

  @action.bound changeSize(size: number): void {
    this.gridSize = size;
    this.gridList = this.initialGridList();
  }

  @action.bound refresh(): void {
    this.gridList = this.initialGridList();
  }

  @action.bound tick(): void {
    const newGridList: GridList = JSON.parse(JSON.stringify(this.gridList));

    for (let i = 0; i < this.gridSize; i++) {
      for (let j = 0; j < this.gridSize; j++) {
        const countAlive = (): number => {
          let count: number = 0;
          if (i !== 0) {
            count += +this.gridList[i - 1][j];
            if (j !== 0) {
              count += +this.gridList[i - 1][j - 1];
            }
            if (j !== this.gridSize - 1) {
              count += +this.gridList[i - 1][j + 1];
            }
          }
          if (i !== this.gridSize - 1) {
            count += +this.gridList[i + 1][j];
            if (j !== 0) {
              count += +this.gridList[i + 1][j - 1];
            }
            if (j !== this.gridSize - 1) {
              count += +this.gridList[i + 1][j + 1];
            }
          }
          if (j !== 0) {
            count += +this.gridList[i][j - 1];
          }
          if (j !== this.gridSize - 1) {
            count += +this.gridList[i][j + 1];
          }
          return count;
        };

        const countAliveValue = countAlive();
        if (newGridList[i][j]) {
          if (countAliveValue < 2) {
            newGridList[i][j] = false;
          } else if (countAliveValue > 3) {
            newGridList[i][j] = false;
          }
        } else {
          if (countAliveValue === 3) {
            newGridList[i][j] = true;
          }
        }
      }
    }

    this.gridList = newGridList;
  }

  constructor(gridSize: number = 50) {
    this.gridSize = gridSize;
    this.gridList = this.initialGridList();
  }
}

export default new Game();
