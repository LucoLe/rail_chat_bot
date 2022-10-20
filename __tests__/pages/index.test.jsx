import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

import Home from "../../pages/index";

global.fetch = jest.fn();
window.HTMLElement.prototype.scrollIntoView = jest.fn();

beforeEach(() => {
  fetch.mockClear();
  window.HTMLElement.prototype.scrollIntoView.mockClear();
});

describe("Home", () => {
  test("renders initial greeting", () => {
    render(<Home />);

    expect(
      screen.getByText("Welcome to Rail chat bot!", { selector: "p" })
    ).toBeInTheDocument();
    expect(
      screen.getByText('Type "/bvg" to list available options', {
        selector: "p",
      })
    ).toBeInTheDocument();
  });

  test("prints help", async () => {
    const user = userEvent.setup();

    render(<Home />);

    await user.type(screen.getByRole("textbox"), "/bvg");
    await user.click(screen.getByRole("button", { name: "Send" }));

    expect(screen.getByText("/bvg", { selector: "p" })).toBeInTheDocument();

    expect(
      screen.getByText(
        'Type "/bvg stations:station name" to get a list of stations that match your search term',
        {
          selector: "p",
        }
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        'Type "/bvg stationID:station id" to get the next two departures from this station',
        {
          selector: "p",
        }
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText('Type "/bvg" to print this message again', {
        selector: "p",
      })
    ).toBeInTheDocument();
  });

  test("prints station departures", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            {
              stop: { name: "stop name" },
              when: "2022-10-20:15:15:00",
              line: { name: "S25", productName: "Train" },
            },
          ]),
      })
    );

    const user = userEvent.setup();

    render(<Home />);

    await user.type(screen.getByRole("textbox"), "/bvg stationID:1");
    await user.click(screen.getByRole("button", { name: "Send" }));

    expect(
      screen.getByText("/bvg stationID:1", { selector: "p" })
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "stop name: Train - S25 departures at 10/20/2022, 3:15:00 PM",
        { selector: "p" }
      )
    ).toBeInTheDocument();
  });

  test("prints stations", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{ name: "name", id: 123 }]),
      })
    );

    const user = userEvent.setup();

    render(<Home />);

    await user.type(screen.getByRole("textbox"), "/bvg stations:a");
    await user.click(screen.getByRole("button", { name: "Send" }));

    expect(
      screen.getByText("/bvg stations:a", { selector: "p" })
    ).toBeInTheDocument();

    expect(
      screen.getByText("name id: 123", { selector: "p" })
    ).toBeInTheDocument();
  });

  test("handles unknow commands", async () => {
    const user = userEvent.setup();

    render(<Home />);

    await user.type(screen.getByRole("textbox"), "a");
    await user.click(screen.getByRole("button", { name: "Send" }));

    expect(
      screen.getByText("Sorry, I don't know how to answer that", {
        selector: "p",
      })
    ).toBeInTheDocument();
  });
});
