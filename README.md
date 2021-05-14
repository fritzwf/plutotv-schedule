# plutotv-schedule

## An API to extract Pluto.tv show schedule data.

### I need this API because I am creating a TV Tracker web app that will display a hybrid schedule/imdb/news kind of information.  I am starting with Pluto.tv since I watch it, and it seems to be on the cutting edge of the future of "television/streaming."

### The TV Tracker will display a TV schedule in a table, showing the normal times, date, etc for the show/movie.  If you click on the row, it will expand and show the actors in the tv-show/movie, pulled from imdb.com, and then also news for the actors pulled from newsapi.org, and possibly also from wikipedia.

### This app will eliminate the need to go to multiple websites to get interesting information about the actors and/or the TV show/movie.

## https://tv.feuersoft.com

# Installation

`npm i plutotv-schedule --save`

# Usage

```
import { plutotv-schedule } from 'plutotv-schedule';

getPlutoChannelData().then((res) => {
    if (res && res.length) {
      console.log('Pluto channel data: ' + JSON.stringify(res, null, 2));
    }
}).catch(err => console.log(err));
```

### You can also request data in hours from the current times. 12 hours is the max.

```
getPlutoChannelData(3).then((res) => {
    if (res && res.length) {
      console.log('Pluto channel data: ' + JSON.stringify(res, null, 2));
    }
}).catch(err => console.log(err));
```


