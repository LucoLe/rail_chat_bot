export const BASE_URL = "https://v5.bvg.transport.rest";

const logError = (callback) =>
  callback((messages) =>
    messages.concat("Something went wrong try again later")
  );

export const getStationDepartures = (stationID, setState) => {
  fetch(
    `${BASE_URL}/stops/${stationID}/departures?results=2&linesOfStops=false&remarks=false&language=en`
  ).then((response) => {
    if (response.ok) {
      response
        .json()
        .then((data) =>
          data.map(
            ({
              stop: { name: stopName },
              when,
              line: { name: lineName, productName },
            }) =>
              `${stopName}: ${productName} - ${lineName} departures at ${new Date(
                when
              ).toLocaleString()}`
          )
        )
        .then((newMessages) =>
          setState((messages) => messages.concat(newMessages))
        );
    } else {
      logError(setState);
    }
  });
};

export const getStations = (station, setState) => {
  fetch(
    `${BASE_URL}/locations?query=${station}&fuzzy=true&results=10&stops=true&addresses=false&poi=false&linesOfStops=false&language=en`
  ).then((response) => {
    if (response.ok) {
      response
        .json()
        .then((data) => data.map(({ name, id }) => `${name} id: ${id}`))
        .then((newMessages) =>
          setState((messages) => messages.concat(newMessages))
        );
    } else {
      logError(setState);
    }
  });
};
