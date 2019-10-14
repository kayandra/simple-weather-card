var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use("/", function(req, res, next) {
  res.render("index", {
    title: "Weather app",
    weather: {
      request: {
        type: "City",
        query: "New York, United States of America",
        language: "en",
        unit: "m"
      },
      location: {
        name: "New York",
        country: "United States of America",
        region: "New York",
        lat: "40.714",
        lon: "-74.006",
        timezone_id: "America/New_York",
        localtime: "2019-09-07 08:14",
        localtime_epoch: 1567844040,
        utc_offset: "-4.0"
      },
      current: {
        observation_time: "12:14 PM",
        temperature: 13,
        weather_code: 113,
        weather_icons: [
          "https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png"
        ],
        weather_descriptions: ["Sunny"],
        wind_speed: 0,
        wind_degree: 349,
        wind_dir: "N",
        pressure: 1010,
        precip: 0,
        humidity: 90,
        cloudcover: 0,
        feelslike: 13,
        uv_index: 4,
        visibility: 16
      }
    }
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
