/* eslint-disable no-undef */
const express = require('express');
const moxios = require('moxios');
const request = require('supertest');
const app = require('../app');

describe('GET /api/greeting', () => {
  const url = '/api/greeting';

  test('It should give status code 200', () => request(app).get(url).then((response) => {
    expect(response.statusCode).toBe(200);
  }));

  test('It should return Hello World! with No name', () => request(app).get(url).then((response) => {
    const obj = JSON.parse(response.text);
    expect(obj.greeting).toBe('Hello World!');
  }));

  // eslint-disable-next-line prefer-template
  test('It should return Hello aaa with Name aaa!', () => request(app).get(url + '?name=aaa').then((response) => {
    const obj = JSON.parse(response.text);
    expect(obj.greeting).toBe('Hello aaa!');
  }));
});


describe('GET /api/showAllJobs', () => {
  jest.setTimeout(10000);
  const url = '/api/showAllJobs';

  test('It should give status code 200', async () => {
    const response = await request(app).get(url);
    expect(response.statusCode).toBe(200);
  });
});


describe('GET /api/addJob', () => {
  jest.setTimeout(30000);
  const url = '/api/addJob';
  const showUrl = '/api/showAllJobs';

  test('It should return Success and 200 code with Query Parameters', async () => {
    const params = '?name=addJobTest&description=addJobTest&skills=math&qualifications=degree&extra=male&contact=bunc713@tamu.edu';
    const response = await request(app).get(url + params);
    const obj = JSON.parse(response.text);
    //expect(obj).toBe('{"Insert": "Success"}');
    expect(obj.Insert).toBe('Success');
    expect(response.statusCode).toBe(200);
    const uniqueKey = obj.UniqueKey;

    const response3 = await request(app).get(showUrl);
    const obj3 = JSON.parse(response3.text);
    const last = obj3[obj3.length - 1];

    //  Delete the newly added element
    const deleteUrl = '/api/deleteJob';
    const paramsDel = '?id=' + last.ID + '&key=' + uniqueKey; // give it a dynamic number
    const responseDel = await request(app).get(deleteUrl + paramsDel);
    const objDel = JSON.parse(responseDel.text);
    //expect(objDel).toBe('{"Delete": "Success"}');
    expect(objDel.Delete).toBe('Success');
  });

  test('It should give status code 200 with No Query Parameters', async () => {
    const params = '?name=aaaa';
    const response = await request(app).get(url + params);
    expect(response.statusCode).toBe(200);
  });

  test('It should return Failure with No Query Parameters', async () => {
    const params = '?name=aaaa&contact=dormanjohn96@tamu.edu';
    const response = await request(app).get(url + params);
    const obj = JSON.parse(response.text);
    expect(obj.Insert).toBe('Failure');
    expect(obj.errorType).toBe('QueryParamMissing');
  });

  test('It should give status code 200 with Wrong Query Input', async () => {
    const params = '?name=&description=&skills=&qualifications=&extra=&contact=bunc713@tamu.edu';
    const response = await request(app).get(url + params);
    expect(response.statusCode).toBe(200);
  });

  test('It should return Failure with Wrong Query Input', async () => {
    const params = '?name=&description=&skills=&qualifications=&extra=&contact=bunc713@tamu.edu';
    const response = await request(app).get(url + params);
    const obj = JSON.parse(response.text);
    expect(obj.Insert).toBe('Failure');
    expect(obj.errorType).toBe('QueryInputError');
  });
});


describe('AddJob functionality check', () => {
  jest.setTimeout(30000);
  const addUrl = '/api/addJob';
  const showUrl = '/api/showAllJobs';

  test('The count of jobs should increase by 1 when Add succeeds', async () => {
    const response1 = await request(app).get(showUrl);
    const obj1 = JSON.parse(response1.text);
    const count = obj1.length;

    const params = '?name=IncreaseByOneTest&description=IncreaseByOneTest&skills=math&qualifications=degree&extra=male&contact=bunc713@tamu.edu';
    const response2 = await request(app).get(addUrl + params);
    const obj2 = JSON.parse(response2.text);
    expect(obj2.Insert).toBe('Success');
    const uniqueKey = obj2.UniqueKey;

    const response3 = await request(app).get(showUrl);
    const obj3 = JSON.parse(response3.text);
    const count3 = obj3.length;
    const last = obj3[obj3.length - 1];
    expect(count3).toBe(count + 1);

    //  Delete the newly added element
    const deleteUrl = '/api/deleteJob';
    const paramsDel = '?id=' + last.ID + '&key=' + uniqueKey;
    const responseDel = await request(app).get(deleteUrl + paramsDel);
    const objDel = JSON.parse(responseDel.text);
    expect(objDel.Delete).toBe('Success');
  });

  test('It should have the newly added jobpost when Add succeeds', async () => {
    const params = '?name=ElementCheck&description=ElementCheck&skills=math&qualifications=degree&extra=male&contact=bunc713@tamu.edu';
    const response2 = await request(app).get(addUrl + params);
    const obj2 = JSON.parse(response2.text);
    expect(obj2.Insert).toBe('Success');
    const uniqueKey = obj2.UniqueKey;

    const response1 = await request(app).get(showUrl);
    const obj1 = JSON.parse(response1.text);
    const last = obj1[obj1.length - 1];

    expect(last.StartUp).toBe('ElementCheck');

    //  Delete the newly added element
    const deleteUrl = '/api/deleteJob';
    const params2 = '?id=' + last.ID + '&key=' + uniqueKey;
    const response3 = await request(app).get(deleteUrl + params2);
    const obj3 = JSON.parse(response3.text);
    expect(obj3.Delete).toBe('Success');
  });

  test('The count of jobs should not increase when Add fails', async () => {
    const response1 = await request(app).get(showUrl);
    const obj1 = JSON.parse(response1.text);
    const count = obj1.length;
    const params = '?name=&description=&skills=&qualifications=&extra=&contact=bunc713@tamu.edu';

    const response2 = await request(app).get(addUrl + params);
    const obj2 = JSON.parse(response2.text);
    expect(obj2.Insert).toBe('Failure');
    expect(obj2.errorType).toBe('QueryInputError');

    const response3 = await request(app).get(showUrl);
    const obj3 = JSON.parse(response3.text);
    const count3 = obj3.length;
    expect(count3).toBe(count);
  });
});

describe('UpdateJob functionality', () => {
  jest.setTimeout(30000);
  const addUrl = '/api/addJob';
  const addParams = '?name=NeedsUpdates&description=updateSkills&skills=soldering&qualifications=degree&extra=male&contact=dormanjohn96@tamu.edu';
  const updateUrl = '/api/editJobPost';
  const deleteUrl = '/api/deleteJob';
  const showUrl = '/api/showAllJobs';
  let k;
  let ident;

  test('Should return failure when a field is left empty', async () => {
    const addResp = await request(app).get(addUrl + addParams);
    const addObj = JSON.parse(addResp.text);
    k = addObj.UniqueKey;

    const showResp = await request(app).get(showUrl);
    const showObj = JSON.parse(showResp.text);
    const last = showObj[showObj.length - 1];
    ident = last.ID;

    const params1 = '?name=&description=updateSkills&skills=coding&qualifications=degree&extra=male&contact=dormanjohn96@tamu.edu&id=' + ident + '&key=' + k;
    const updateResp = await request(app).get(updateUrl + params1);
    const updateObj = JSON.parse(updateResp.text);
    expect(updateObj.Update).toBe('Failure');
    expect(updateObj.errorType).toBe('QueryInputError');
  });

  test('Should return failure when a field has a missing value', async () => {
    const params3 = '?name=aaa&contact=dormanjohn96@tamu.edu';
    const updateResp = await request(app).get(updateUrl + params3);
    const updateObj = JSON.parse(updateResp.text);
    expect(updateObj.Update).toBe('Failure');
    expect(updateObj.errorType).toBe('QueryParamMissing');
  });

  test('Should return failure when updated email is invalid', async () => {
    const params2 = '?name=NeedsUpdates&description=updateSkills&skills=soldering&qualifications=degree&extra=male&contact=dudebro&id=' + ident + '&key=' + k;
    const updateResp = await request(app).get(updateUrl + params2);
    const updateObj = JSON.parse(updateResp.text);
    expect(updateObj.Update).toBe('Failure');
    expect(updateObj.errorType).toBe('EmailInvalid');
  });

  test('Should return success when successfully updating a job posting', async () => {
    const params4 = '?name=NeedsUpdates&description=updateSkills&skills=coding&qualifications=degree&extra=male&contact=dormanjohn96@tamu.edu&id=' + ident + '&key=' + k;
    const updateResp = await request(app).get(updateUrl + params4);
    const updateObj = JSON.parse(updateResp.text);
    expect(updateObj.Update).toBe('Success');
    
    const deleteResp = await request(app).get(deleteUrl + '?id=' + ident + '&key=' + k);
  });

});

describe('DeleteJob functionality', () => {
  jest.setTimeout(30000);
  const deleteUrl = '/api/deleteJob';
  const showUrl = '/api/showAllJobs';
  const addUrl = '/api/addJob';
  const addParams = '?name=IncreaseByOneTest&description=IncreaseByOneTest&skills=math&qualifications=degree&extra=male&contact=dormanjohn96@tamu.edu';

  test('Should return fail if delete fails', async () => {
    const params = '?id=-1&key=aa';
    const response2 = await request(app).get(deleteUrl + params);
    const obj2 = JSON.parse(response2.text);
    expect(obj2.Delete).toBe('Failure');
  });

  test('Should return success, reduce count by 1 if delete succeeds', async () => {
    const addResp = await request(app).get(addUrl + addParams);
    const addObj = JSON.parse(addResp.text);
    const addKey = addObj.UniqueKey;
    const idResp = await request(app).get(showUrl);
    const idObj = JSON.parse(idResp.text);
    const last = idObj[idObj.length - 1];

    const params = '?id=' + last.ID + '&key=' + addKey;
    const countResp1 = await request(app).get(showUrl);
    const prevObj1 = JSON.parse(countResp1.text);
    const prevCount = prevObj1.length;
    const response3 = await request(app).get(deleteUrl + params);
    const obj3 = JSON.parse(response3.text);
    expect(obj3.Delete).toBe('Success');
    countResp2 = await request(app).get(showUrl);
    prevObj2 = JSON.parse(countResp2.text);
    const postCount = prevObj2.length;
    expect(prevCount - postCount).toBe(1);
  });
});

describe('getUniqueKey functionality check', () => {
  jest.setTimeout(30000);
  const authKey = 'ncmdjelduoyupghhtqbzNMGHksdmdfGekshPolsambcXdwodnhwfjgyVbmdh';
  const getKeyUrl = '/api/getUniqueKey';
  const showUrl = '/api/showAllJobs';
  const addUrl = '/api/addJob';
  const deleteUrl = '/api/deleteJob';
  const addParams = '?name=GrabKeyTest&description=Grabthekey&skills=math&qualifications=degree&extra=male&contact=dormanjohn96@tamu.edu'
  let k;
  let ident;

  test('Should return failure when authentication key is invalid', async () => {
    addResp = await request(app).get(addUrl + addParams);
    addObj = JSON.parse(addResp.text);
    k = addObj.UniqueKey;

    showResp = await request(app).get(showUrl);
    showObj = JSON.parse(showResp.text);
    ident = showObj[showObj.length - 1].ID;

    const getKeyResp = await request(app).get(getKeyUrl + '?id=' + ident + '&authKey=abcd');
    const keyObj = JSON.parse(getKeyResp.text);
    expect(keyObj.Get).toBe('Failure');
    expect(keyObj.errorType).toBe('Not Authenticated');
  });

  test('Should return undefined key when searching for ID of nonexistent entry', async () => {
    const getKeyResp = await request(app).get(getKeyUrl + '?id=9999' + '&authKey=' + authKey);
    const keyObj = JSON.parse(getKeyResp.text);
    expect(keyObj[0]).toBe(undefined);
  });

  test('Should succeed when it grabs key of existing entry of ID', async () => {
    const getKeyResp = await request(app).get(getKeyUrl + '?id=' + ident + '&authKey=' + authKey);
    const keyObj = JSON.parse(getKeyResp.text);
    expect(keyObj[0].UniqueKey).toBe(k);

    const deleteResp = await request(app).get(deleteUrl + '?id=' + ident + '&key=' + k);
  });
});

describe('jobInfo functionality check', () => {
  jest.setTimeout(30000);
  const addUrl = '/api/addJob';
  const deleteUrl = '/api/deleteJob';
  const infoUrl = '/api/jobInfo';
  const showUrl = '/api/showAllJobs';
  const addParams = '?name=GrabJobInfoTest&description=Grabtheinfo&skills=math&qualifications=degree&extra=male&contact=dormanjohn96@tamu.edu';
  let ident;
  let k;

  test('Should fail when retrieving an ID of a nonexistent job posting', async () => {
    const addResp = await request(app).get(addUrl + addParams);
    const addObj = JSON.parse(addResp.text);
    k = addObj.UniqueKey;

    const showResp = await request(app).get(showUrl);
    const showObj = JSON.parse(showResp.text);
    ident = showObj[showObj.length - 1].ID;

    const infoResp = await request(app).get(infoUrl + '?id=9999');
    const infoObj = JSON.parse(infoResp.text);
    expect(infoObj[0]).toBe(undefined);
  });

  test('Should successfully bring back job posting with given ID', async () => {
    const infoResp = await request(app).get(infoUrl + '?id=' + ident);
    const infoObj = JSON.parse(infoResp.text);
    expect(infoObj[0].ID).toBe(ident);
    expect(infoObj[0].Contact).toBe('dormanjohn96@tamu.edu');
    expect(infoObj[0].SkillsNeeded).toBe('math');

    const deleteResp = await request(app).get(deleteUrl);
  });
});

//  Mentor matching tests
describe('Mentor matching form functionality check', () => {
  jest.setTimeout(30000);
  const mentorMatchUrl = '/api/addMatchMentor';

  test('The email should send', async () => {
    const params = '?answer1=Hello&answer2=IncreaseByOneTest&answer3=math&answer4=degree&answer5=male&answer6=Hello&answer7=Hello&answer8=Hello&answer9=Hello&answer10=Hello&answer11=Hello';
    const response1 = await request(app).get(mentorMatchUrl + params);
    const obj1 = JSON.parse(response1.text);
    expect(obj1.Send).toBe('Success');
  });

  test('Email fails with query parameter missing. No answer 11.', async () => {
    const params = '?answer1=Hello&answer2=IncreaseByOneTest&answer3=math&answer4=degree&answer5=male&answer6=Hello&answer7=Hello&answer8=Hello&answer9=Hello&answer10=Hello';
    const response1 = await request(app).get(mentorMatchUrl + params);
    const obj1 = JSON.parse(response1.text);
    expect(obj1.Send).toBe('Failure');
    expect(obj1.errorType).toBe('QueryParamMissing');
  });

  test('Email fails with query parameter empty string answer 11 as empty string', async () => {
    const params = '?answer1=Hello&answer2=IncreaseByOneTest&answer3=math&answer4=degree&answer5=male&answer6=Hello&answer7=Hello&answer8=Hello&answer9=Hello&answer10=Hello&answer11=';
    const response1 = await request(app).get(mentorMatchUrl + params);
    const obj1 = JSON.parse(response1.text);
    expect(obj1.Send).toBe('Failure');
    expect(obj1.errorType).toBe('QueryInputError');
  });
});
