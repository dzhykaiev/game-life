import React from "react";
import {
  render,
  cleanup,
  RenderResult,
  fireEvent
} from "@testing-library/react";
import Game from "./index";

afterEach(cleanup);

describe("Game Component", () => {
  let gameComponent: RenderResult;
  beforeEach(() => {
    gameComponent = render(<Game />);
  });

  test("MeetingScreen should be rendered with start btn", async () => {
    // arrange
    const { getByTestId } = gameComponent;

    // assert
    expect(getByTestId("meeting-screen")).toBeTruthy();
  });

  test("Game shouldn't be rendered before pressed start btn", async () => {
    // arrange
    const { queryByTestId } = gameComponent;
    // assert
    expect(queryByTestId("game")).toEqual(null);
  });

  test("Game should be rendered after pressed start btn", async () => {
    // arrange
    const { getByTestId } = gameComponent;
    // act
    fireEvent.click(getByTestId("start-btn"));
    // assert
    expect(getByTestId("game")).toBeTruthy();
  });
});
