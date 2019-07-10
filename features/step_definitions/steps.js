const react = require('react');
const { Given, When, Then } = require('cucumber');

const webdriver = require('selenium-webdriver');

// make it headless
const browser = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();

Given('I am at the home page of the website', async () => browser.get('http://localhost:3000/'));

When('I click the tab with ID {string}', async tab => browser.findElement({ id: tab }).click());

Then('I should be at {string}', async (url) => {
  await browser.sleep(1000);
  if (browser.getCurrentUrl() === url) {
    return 'success';
  }
  return 'failure';
});


//  Job posting card tests

Given('I am at the job posting page', async () => browser.get('http://localhost:3000/postings'));

Then('I should see some jobs', async () => {
  await browser.sleep(1000);

  browser.findElement({ id: 'cardContainer' }).then((elements) => {
    if (elements.childElementCount !== 0) {
      return 'success';
    }
    return 'failure';
  });

  await browser.sleep(1000);
});

//  Job posting form tests

Given('I am at the job posting form page', async () => browser.get('http://localhost:3000/jobPostingForm'));

When('I enter values', async () => browser.findElement({ id: 'question1' }).sendKeys('Hello'));

Then('I should see those values added', async () => {
  await browser.sleep(1000);

  browser.findElement({ id: 'question1' }).getAttribute('value').then((text) => {
    if (text === 'Hello') {
      return 'success';
    }
    return 'failure';
  });
  await browser.sleep(1000);
});

When('I submit before everything is filled out', async () => browser.findElement({ id: 'submitBtn' }).click());

Then('the submit should fail', async () => {
  await browser.sleep(1000);
  browser.switchTo().alert().getText().then((text) => {
    if (text === 'Form not filled out.') {
      browser.switchTo().alert().accept();
      return 'success';
    }
    return 'failure';
  });
  await browser.sleep(1000);
});

When('I submit the filled out form', async () => {
  browser.findElement({ id: 'question1' }).sendKeys('a');
  browser.findElement({ id: 'question2' }).sendKeys('a');
  browser.findElement({ id: 'question3' }).sendKeys('a');
  browser.findElement({ id: 'question4' }).sendKeys('a');
  browser.findElement({ id: 'question5' }).sendKeys('a');
  browser.findElement({ id: 'question6' }).sendKeys('bunc713@tamu.edu');

  return browser.findElement({ id: 'submitBtn' }).click();
});

Then('the submit should succeed', async () => {
  await browser.sleep(1000);
  browser.switchTo().alert().getText().then((text) => {
    if (text === 'Successfully posted') {
      browser.switchTo().alert().accept();
      return 'success';
    }
    return 'failure';
  });
  await browser.sleep(1000);
});

When('I click on the button to post a new job', async () => {
  await browser.sleep(1000);
  browser.findElement({ id: 'formbutton' }).click();
});

Then('I should be on the job posting form page', async () => {
  await browser.sleep(1000);
  if (browser.getCurrentUrl() === 'http://localhost:3000/jobPostingForm') {
    return 'success';
  }
  return 'failure';
});


//  Mentor matching form

Given('I am at the mentor matching form page', async () => browser.get('http://localhost:3000/mentorMatchingForm'));

When('I submit the filled out form on the mentor matching form', async () => {
  browser.findElement({ id: 'question1' }).sendKeys('a');
  browser.findElement({ id: 'question2' }).sendKeys('a');
  browser.findElement({ id: 'question3' }).sendKeys('a');
  browser.findElement({ id: 'question4' }).sendKeys('a');
  browser.findElement({ id: 'question5' }).sendKeys('a');
  browser.findElement({ id: 'question6' }).sendKeys('a');
  browser.findElement({ id: 'question7' }).sendKeys('a');
  browser.findElement({ id: 'question8' }).sendKeys('a');
  browser.findElement({ id: 'question9' }).sendKeys('a');
  browser.findElement({ id: 'question10' }).sendKeys('a');
  browser.findElement({ id: 'question11' }).sendKeys('a');

  return browser.findElement({ id: 'submitBtn' }).click();
});

Then('the submit should succeed on the mentor matching form', async () => {
  await browser.sleep(2000);
  browser.switchTo().alert().getText().then((text) => {
    if (text === 'Successfully submitted') {
      browser.switchTo().alert().accept();
      return 'success';
    }
    return 'failure';
  });
  await browser.sleep(2000);
});

Then('the submit should fail on the mentor matching form', async () => {
  await browser.sleep(2000);
  browser.switchTo().alert().getText().then((text) => {
    if (text === 'Form not filled out.') {
      browser.switchTo().alert().accept();
      return 'success';
    }
    return 'failure';
  });
  await browser.sleep(2000);
});

Given('I am at the roadmap page', async () => browser.get('http://localhost:3000/howtostartup'));

When('I click the next button {int} times and the back button {int} times', async (startClicks, backClicks) => {
  let i;
  await browser.sleep(1000);

  for (i = 0; i < startClicks; ++i) {
    browser.findElement({ id: 'nextButton' }).click();
    await browser.sleep(1000);
  }

  await browser.sleep(1000);
  for (i = 0; i < backClicks; ++i) {
    browser.findElement({ id: 'backButton' }).click();
    await browser.sleep(1000);
  }
});

Then('I should be on the target step', async () => {
  await browser.sleep(1000);
  const txt = 'Every startup needs an idea. This idea need not be revolutionary in scope, or solve complicated world issues. It only needs to solve a problem. Once you have formulated such an idea, fill out an application for your startup through Cross Roads application process.';
  const x = browser.findElement({ id: 'stepContent' });
  x.getText().then((text) => {
    if (txt === text) {
      return 'success';
    }
    return 'failure';
  });
});

Given('I am at the home page', async () => {
  await browser.sleep(1000);
  browser.get('http://localhost:3000/');
  await browser.sleep(1000);
});

When('I click the jobs page link', async () => {
  await browser.sleep(1000);
  browser.findElement({ id: 'jobPostingBtn' }).click();
});

Then('I should be on the jobs page', async () => {
  await browser.sleep(1000);
  if (browser.getCurrentUrl() === 'http://localhost:3000/postings') {
    return 'success';
  }
  return 'failure';
});

When('I click the events page link', async () => {
  await browser.sleep(1000);
  browser.findElement({ id: 'calendarBtn' }).click();
});

Then('I should be on the events page', async () => {
  await browser.sleep(1000);
  if (browser.getCurrentUrl() === 'http://localhost:3000/calendar') {
    return 'success';
  }
  return 'failure';
});

When('I click the mentor page link', async () => {
  await browser.sleep(1000);
  browser.findElement({ id: 'mentorBtn' }).click();
});

Then('I should be on the mentor page', async () => {
  await browser.sleep(1000);
  if (browser.getCurrentUrl() === 'http://localhost:3000/mentorMatchingForm') {
    return 'success';
  }
  return 'failure';
});

When('I click the roadmap page link', async () => {
  await browser.sleep(1000);
  browser.findElement({ id: 'roadmapBtn' }).click();
});

Then('I should be on the roadmap page', async () => {
  await browser.sleep(1000);
  if (browser.getCurrentUrl() === 'http://localhost:3000/howtostartup') {
    return 'success';
  }
  return 'failure';
});