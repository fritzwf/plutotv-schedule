const http = require('http')

const PLUTO_URL = 'cdn-api.prod.pluto.tv';
const PATH = '/v2/channels.json';
const DEFAULT_HOURS_SPAN = 2;

function getTwoDigitDateFormat(monthOrDate) {
  return (monthOrDate < 10) ? '0' + monthOrDate : monthOrDate;
}

function addHours(date, plusHours) {
  const addHoursDate = new Date();
  addHoursDate.setTime(date.getTime() + (plusHours * 60 * 60 * 1000));
  return addHoursDate;
};

function getPlutoChannelData(plusHours) {

  return new Promise((resolve) => {

    const startDate = new Date();
    const utcOffset = startDate.getTimezoneOffset() / 60;

    const startInterval = 'start=' +
                   startDate.getFullYear() + '-' +
                   getTwoDigitDateFormat((startDate.getMonth() + 1)) + '-' +
                   getTwoDigitDateFormat(startDate.getDate()) + '+' +
                   getTwoDigitDateFormat(startDate.getHours()) + ':00:00.000-0' + utcOffset + '00';

    // The number of schedule hours to return, max is 12.
    const hours = plusHours || DEFAULT_HOURS_SPAN;
    const endDate = addHours(startDate, hours);

    const stopInterval = 'stop=' +
                    endDate.getFullYear() + '-' +
                    getTwoDigitDateFormat((endDate.getMonth() + 1)) + '-' +
                    getTwoDigitDateFormat(endDate.getDate()) + '+' +
                    getTwoDigitDateFormat(endDate.getHours()) + ':00:00.000-0' + utcOffset + '00';
    http
      .request(
        {
          hostname: PLUTO_URL,
          path: PATH + '?' + startInterval + '&' + stopInterval
        },
        res => {
          let data = '';
          res.on('data', d => {
            data += d;
          })
          res.on('end', () => {
            resolve(JSON.parse(data));
          })
          res.on('error', () => {
            resolve(null);
          })
        })
      .end();
  });
}

module.exports.getPlutoChannelData = getPlutoChannelData;
  
  