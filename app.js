const express = require('express');
// var bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const userRouter = require('./routes/userRoutes');
const viewRouter = require('./routes/viewRoutes');
const weddingRouter = require('./routes/weddingRoutes');
const bridesmaidRouter = require('./routes/bridesmaidsRoutes');
const eventRouter = require('./routes/eventRoutes');
const storyRouter = require('./routes/storyRoutes');
const contactRouter = require('./routes/contactRoutes');
const templatesRouter = require('./routes/templatesRoutes');

const app = express();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(methodOverride('_method'));
// 1) GLOBAL MIDDLEWARES
// Set security HTTP headers
//  sever static files
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", 'https:', 'http:', 'data:', 'ws:'],
      baseUri: ["'self'"],
      fontSrc: ["'self'", 'https:', 'http:', 'data:'],
      scriptSrc: [
        "'self'",
        'https:',
        'http:',
        'blob:',
        'https://js.stripe.com'
      ],
      styleSrc: ["'self'", "'unsafe-inline'", 'https:', 'http:']
    }
  })
);

app.use(
  cors({
    origin: ['https://wedding-production-09d7.up.railway.app'],
    credentials: true
  })
);

app.use(function(req, res, next) {
  res.header(
    'Access-Control-Allow-Origin',
    'https://wedding-production-09d7.up.railway.app'
  );
  res.header('Access-Control-Allow-Headers', true);
  res.header('Access-Control-Allow-Credentials', true);
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  next();
});

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());
// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price'
    ]
  })
);
// Serving static files
app.use(express.static(`${__dirname}/public`));
// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  // console.log(req.cookies);
  next();
});
// 3) ROUTES
//  create routes for main pages
app.use('/', viewRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/weddings', weddingRouter);
app.use('/api/v1/bridesmaids', bridesmaidRouter);
app.use('/api/v1/events', eventRouter);
app.use('/api/v1/storyloves', storyRouter);
app.use('/api/v1/contact', contactRouter);
app.use('/api/v1/templates', templatesRouter);
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
