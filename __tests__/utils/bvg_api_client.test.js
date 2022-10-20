import {
  BASE_URL,
  getStations,
  getStationDepartures,
} from "../../utils/bvg_api_client";

global.fetch = jest.fn();

beforeEach(() => {
  fetch.mockClear();
});

describe("#getStations", () => {
  test("fetches stations", (done) => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{ name: "name", id: 123 }]),
      })
    );

    getStations("ber", (messages) => {
      expect(messages(["initial"])).toEqual(["initial", "name id: 123"]);
      done();
    });

    expect(fetch).toHaveBeenCalledWith(
      `${BASE_URL}/locations?query=ber&fuzzy=true&results=10&stops=true&addresses=false&poi=false&linesOfStops=false&language=en`
    );
  });

  test("handles errors", (done) => {
    fetch.mockImplementationOnce(() => Promise.resolve({ ok: false }));

    getStations("ber", (messages) => {
      expect(messages(["initial"])).toEqual([
        "initial",
        "Something went wrong try again later",
      ]);
      done();
    });
  });
});

describe("#getStationDepartures", () => {
  test("fetches departures", (done) => {
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

    getStationDepartures("123", (messages) => {
      expect(messages(["initial"])).toEqual([
        "initial",
        "stop name: Train - S25 departures at 10/20/2022, 3:15:00 PM",
      ]);
      done();
    });

    expect(fetch).toHaveBeenCalledWith(
      `${BASE_URL}/stops/123/departures?results=2&linesOfStops=false&remarks=false&language=en`
    );
  });

  test("handles errors", (done) => {
    fetch.mockImplementationOnce(() => Promise.resolve({ ok: false }));

    getStations("ber", (messages) => {
      expect(messages(["initial"])).toEqual([
        "initial",
        "Something went wrong try again later",
      ]);
      done();
    });
  });
});
