const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const mysql = require('mysql');

const pool = mysql.createPool({
  host: 'roadscross.cnky2exjg0bc.us-east-2.rds.amazonaws.com',
  user: 'crossroads',
  password: 'tamu431edu',
  port: '3306',
  connectionLimit: 15,
});

function isEmailValid (email) {
  return /\S+@\S+\.\S+/.test(email);
}

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(pino);

app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

//  Add job ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
app.get('/api/addJob', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'max-age=0, private, must-revalidate');
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (!isEmailValid(req.query.contact)) {
    res.send(JSON.stringify({ Insert: 'Failure', errorType: 'EmailInvalid' }));
    return;
  }

  if (
    req.query.name === undefined
    || req.query.description === undefined
    || req.query.skills === undefined
    || req.query.qualifications === undefined
    || req.query.extra === undefined
    || req.query.contact === undefined
  ) {
    res.send(JSON.stringify({ Insert: 'Failure', errorType: 'QueryParamMissing' }));
    return;
  }

  if (
    req.query.name === ''
    || req.query.description === ''
    || req.query.skills === ''
    || req.query.qualifications === ''
    || req.query.extra === ''
    || req.query.contact === ''
  ) {
    res.send(JSON.stringify({ Insert: 'Failure', errorType: 'QueryInputError' }));
    return;
  }

  const uniqueKey = crypto.randomBytes(10).toString('hex');

  const post = [
    req.query.name,
    req.query.description,
    req.query.skills,
    req.query.qualifications,
    req.query.extra,
    req.query.contact,
    uniqueKey,
  ];

  // eslint-disable-next-line no-unused-vars
  const query = pool.query(
    'INSERT INTO roadscross.PostedJobs (StartUp, Description, SkillsNeeded, Qualifications, Extra, Contact, UniqueKey) VALUES (?);',
    [post],
    (err1, result) => {
      if (err1) {
        // eslint-disable-next-line no-console
        console.log(err1);
        res.send(JSON.stringify({ Insert: 'Failure' }));
      } else {
        //  Send email with the delete and update key @todo @dev

        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'crossroads.emailer@gmail.com',
            pass: 'GigEm2019',
          },
          tls: {
            rejectUnauthorized: false,
          },
        });

        const mailOptions = {
          from: 'crossroads.emailer@gmail.com',
          to: req.query.contact,
          subject: 'Your update and delete key',
          text: `Thank you for posting a job on Crossroads here is your unique key used for deleting or updating you job post.\n Unique key: ${uniqueKey}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            res.send(JSON.stringify({ Send: 'Failure' }));
          } else {
            res.send(JSON.stringify({ Send: 'Success' }));
          }
        });

        //  @dev @todo maybe take out the return of uniqueKey
        res.send(JSON.stringify({ Insert: 'Success', UniqueKey: uniqueKey }));
      }
    },
  );
});

//  Show all jobs ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
app.get('/api/showAllJobs', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'max-age=0, private, must-revalidate');
  res.setHeader('Access-Control-Allow-Origin', '*');

  // eslint-disable-next-line no-unused-vars
  const query = pool.query('SELECT ID, StartUp, Description, SkillsNeeded, Qualifications, Extra, Contact FROM roadscross.PostedJobs;', (err1, result) => {
    if (err1) {
      // eslint-disable-next-line no-console
      console.log(err1);
    } else {
      res.send(JSON.stringify(result));
    }
  });
});

//  Delete Job ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
app.get('/api/deleteJob', (req, res) => {
  // Same as const id = req.query.id (ESlint prefers the way written...)
  const { id } = req.query;
  const { key } = req.query;

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'max-age=0, private, must-revalidate');
  res.setHeader('Access-Control-Allow-Origin', '*');

  const post = [
    id,
    key,
  ];

  pool.query(
    'DELETE FROM roadscross.PostedJobs WHERE ID = ? AND UniqueKey = ?;',
    post,
    (err1, result) => {
      if (result.affectedRows === 0) {
        res.send(JSON.stringify({ Delete: 'Failure' }));
      } else {
        res.send(JSON.stringify({ Delete: 'Success' }));
      }
    },
  );
});

//  Mentor Matching job ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
app.get('/api/addMatchMentor', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'max-age=0, private, must-revalidate');
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (
    req.query.answer1 === undefined
    || req.query.answer2 === undefined
    || req.query.answer3 === undefined
    || req.query.answer4 === undefined
    || req.query.answer5 === undefined
    || req.query.answer6 === undefined
    || req.query.answer7 === undefined
    || req.query.answer8 === undefined
    || req.query.answer9 === undefined
    || req.query.answer10 === undefined
    || req.query.answer11 === undefined
  ) {
    res.send(JSON.stringify({ Send: 'Failure', errorType: 'QueryParamMissing' }));
    return;
  }

  if (
    req.query.answer1 === ''
    || req.query.answer2 === ''
    || req.query.answer3 === ''
    || req.query.answer4 === ''
    || req.query.answer5 === ''
    || req.query.answer6 === ''
    || req.query.answer7 === ''
    || req.query.answer8 === ''
    || req.query.answer9 === ''
    || req.query.answer10 === ''
    || req.query.answer11 === ''
  ) {
    res.send(JSON.stringify({ Send: 'Failure', errorType: 'QueryInputError' }));
    return;
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'crossroads.emailer@gmail.com',
      pass: 'GigEm2019',
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: 'crossroads.emailer@gmail.com',
    to: 'karllawson16@gmail.com',           //  @dev @todo change to rodney's email
    subject: 'Sending Email using Node.js',
    text: `${req.query.answer1}\n${req.query.answer2}\n${req.query.answer3}\n${
      req.query.answer4
    }\n${req.query.answer5}\n${req.query.answer6}\n${req.query.answer7}\n${req.query.answer8}\n${
      req.query.answer9
    }\n${req.query.answer10}\n${req.query.answer11}\n`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.send(JSON.stringify({ Send: 'Failure' }));
    } else {
      res.send(JSON.stringify({ Send: 'Success' }));
    }
  });
});


//  Show info for specific job ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//  @dev @todo write TDD tests
app.get('/api/jobInfo', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'max-age=0, private, must-revalidate');
  res.setHeader('Access-Control-Allow-Origin', '*');

  const { id } = req.query;

  // eslint-disable-next-line no-unused-vars
  const query = pool.query('SELECT ID, StartUp, Description, SkillsNeeded, Qualifications, Extra, Contact FROM roadscross.PostedJobs WHERE ID = ?;', id, (err1, result) => {
    if (err1) {
      // eslint-disable-next-line no-console
      console.log(err1);
    } else {
      res.send(JSON.stringify(result));
    }
  });
});

//  Edit job info ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//  @dev @todo write TDD tests
app.get('/api/editJobPost', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'max-age=0, private, must-revalidate');
  res.setHeader('Access-Control-Allow-Origin', '*');


  if (!isEmailValid(req.query.contact)) {
    res.send(JSON.stringify({ Update: 'Failure', errorType: 'EmailInvalid' }));
    return;
  }

  if (
    req.query.id === undefined
    || req.query.name === undefined
    || req.query.description === undefined
    || req.query.skills === undefined
    || req.query.qualifications === undefined
    || req.query.extra === undefined
    || req.query.contact === undefined
    || req.query.key === undefined
  ) {
    res.send(JSON.stringify({ Update: 'Failure', errorType: 'QueryParamMissing' }));
    return;
  }

  if (
    req.query.id === ''
    || req.query.name === ''
    || req.query.description === ''
    || req.query.skills === ''
    || req.query.qualifications === ''
    || req.query.extra === ''
    || req.query.contact === ''
    || req.query.key === ''
  ) {
    res.send(JSON.stringify({ Update: 'Failure', errorType: 'QueryInputError' }));
    return;
  }

  const post = [
    req.query.name,
    req.query.description,
    req.query.skills,
    req.query.qualifications,
    req.query.extra,
    req.query.contact,
    req.query.id,
    req.query.key,
  ];

  // eslint-disable-next-line no-unused-vars
  const query = pool.query('UPDATE roadscross.PostedJobs SET StartUp = ?, Description = ?, SkillsNeeded = ?, Qualifications = ?, Extra = ?, Contact = ? WHERE ID = ? AND UniqueKey = ?;',
    post,
    (err1, result) => {
      if (result === undefined || result.affectedRows === 0) {
        res.send(JSON.stringify({ Update: 'Failure' }));
      } else {
        res.send(JSON.stringify({ Update: 'Success' }));
      }
    });
});


//  Return uniqueKey for a Job ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//  @dev @todo write TDD tests
app.get('/api/getUniqueKey', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'max-age=0, private, must-revalidate');
  res.setHeader('Access-Control-Allow-Origin', '*');

  const { id } = req.query;

  //  @dev must send the long key with the request to authenticate ourselves
  if (req.query.authKey !== 'ncmdjelduoyupghhtqbzNMGHksdmdfGekshPolsambcXdwodnhwfjgyVbmdh') {
    res.send(JSON.stringify({ Get: 'Failure', errorType: 'Not Authenticated' }));
    return;
  }

  // eslint-disable-next-line no-unused-vars
  const query = pool.query('SELECT UniqueKey FROM roadscross.PostedJobs WHERE ID = ?;', id, (err1, result) => {
    if (err1) {
      // eslint-disable-next-line no-console
      console.log(err1);
    } else {
      res.send(JSON.stringify(result));
    }
  });
});

module.exports = app;
