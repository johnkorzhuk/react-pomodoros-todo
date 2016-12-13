export const humanizeFromMS = (ms) => {
  let seconds = ms / 1000;
  const hours = parseInt(seconds / 3600, 10);

  seconds %= 3600;
  const minutes = parseInt(seconds / 60, 10);

  seconds %= 60;

  return {
    hh: hours,
    mm: minutes,
    ss: seconds,
  }
};

export const deHumanizeToMS = (hms) => {
  return parseInt(hms.hh * 3600000 + hms.mm * 60000 + hms.ss * 1000, 10);
};

// todo: pad hh:mm:ss
// const pad = (numberString) => {
//   return numberString.length < 2
//     ? `0${numberString}`
//     : numberString;
// };