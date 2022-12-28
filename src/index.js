const express = require('express');
const rateLimit = require('express-rate-limit');
const path = require('path');
const logger = require('morgan');
const mongoose = require('mongoose');

// const userMiddleware = require('./middleware/user');
const adminMiddleware = require('./middleware/admin');

const authLoginRouter = require('./routes/auth/login');
const authRegisterRouter = require('./routes/auth/register');

const adminStationRouter = require('./routes/admin/station');
const adminGenreRouter = require('./routes/admin/genre');
const adminCountryRouter = require('./routes/admin/country');
const adminLocationRouter = require('./routes/admin/location');

const stationRouter = require('./routes/station');
const genreRouter = require('./routes/genre');
const countryRouter = require('./routes/country');
const locationRouter = require('./routes/location');

const app = express();

app.use(logger(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve('./public')));

// if (process.env.NODE_ENV === 'development') {
app.use('/image', express.static(path.resolve('./storage/image')));
// }

app.set('trust proxy', true);

mongoose.connect(process.env.MONGODB_URL).then(() => {
  app.use(
    '/auth/login',
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 5,
      message: {
        error: { text: 'Too many failed login attempts, please try again later' },
      },
      standardHeaders: true,
      legacyHeaders: false,
      skipSuccessfulRequests: true,
    }),
    authLoginRouter
  );

  app.use(
    '/auth/register',
    rateLimit({
      windowMs: 60 * 60 * 1000,
      max: 5,
      message: { error: { text: 'Too many create account attempts, please try again later' } },
      standardHeaders: true,
      legacyHeaders: false,
    }),
    authRegisterRouter
  );

  app.use('/station', stationRouter);
  app.use('/genre', genreRouter);
  app.use('/country', countryRouter);
  app.use('/location', locationRouter);

  app.get('/tools/ip', adminMiddleware, (req, res) => res.send(req.ip));
  app.use('/admin/station', adminMiddleware, adminStationRouter);
  app.use('/admin/genre', adminMiddleware, adminGenreRouter);
  app.use('/admin/country', adminMiddleware, adminCountryRouter);
  app.use('/admin/location', adminMiddleware, adminLocationRouter);
});

module.exports = app;
