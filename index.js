const express = require('express');
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");

require('dotenv').config();

const {
  SENTRY_DSN
} = require('./config');

const app = express();

Sentry.init({
  dsn: SENTRY_DSN,

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());

app.get('/', (req, res) => {
  res.end('Hello world!');
});

app.get('/check-error', (req, res) => {
  throw new Error('Test express problem');
});

app.use(Sentry.Handlers.errorHandler());

app.listen(3000);
