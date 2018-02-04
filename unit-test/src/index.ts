// const puppeteer = require('puppeteer');
import * as puppeteer from 'puppeteer';
function error(msg) {
  console.log("TEST ERRROR: ", msg);
  process.exit(-1);
}
function ok(msg) {
  console.log("TEST OK: ", msg);
}
const d = new Date();
const id = "test-user-" + d.getHours() + d.getMinutes() + d.getSeconds();

async function logout(page: puppeteer.Page) {
  await page.waitFor(500);
  await page.click('.header-menu').then(x => ok('Header menu clicked.')).catch(e => error('Failed to click header menu'));

  await page.waitFor(500);
  await page.waitFor('.menu-logout');
  await page.click('.menu-logout');
}

async function login(page: puppeteer.Page, email, password) {
  ok("Login begins...!");
  await page.waitFor('.header-login');
  await page.waitFor(500);
  await page.click('.header-login').then(x => ok(".header-login clicked."));
  await page.waitFor(500);
  await page.waitFor('[name="email"]');

  await page.waitFor(100);
  await page.type('[name="email"]', email, { delay: 50 }).catch(x => error('Cannot type email'));
  await page.waitFor(100);
  await page.type(`[name="password"]`, id, { delay: 50 });
  await page.waitFor(100);

  await page.click('.input .app-button');
  await page.waitFor('page-home .header-home').then(x => ok("Login success!")).catch(x => error('Login Failed!'));

  await page.waitFor(100);
}



(async () => {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();
  await page.goto('https://www.katalkenglish.com');
  page.on('console', msg => console.log('SITE CONSOLE LOG: ', msg.text()));

  await page.waitFor('.header-register').then(async x => {
    ok('Found register menu. Opening register page.');
    await page.click('.header-register').then(async x => {
      await page.waitFor('[name="email"]').catch(x => error('Cannot open register page.'));
      ok("Register page open ok for : " + id);
      await page.waitFor(100);
      await page.type('[name="email"]', id + '@test.com').catch(x => error('Cannot type email'));
      await page.waitFor(100);
      await page.type(`[name="password"]`, id, { delay: 20 });
      await page.waitFor(100);
      await page.type('[name="name"]', id + '-name');
      await page.type('[name="nickname"]', id + '-nickname');
      await page.type('[name="phone_number"]', '0123456789');
      await page.type('[name="kakaotalk_id"]', id + '-kakaotalk-id');

      await page.click('.input .app-button');
      await page.waitFor('student-register-success-page .header-menu').then(x => ok("Registration success!")).catch(x => error('Registration Failed!'));

      await page.waitFor(500);
      await page.waitFor('.header-leveltest').then(async x => {
        await page.click('.header-leveltest').then(async x => {
          ok('Level test page opened');

          await page.waitFor('.teacher-profile-photo');
          await page.waitFor(500);
          await page.click('.teacher-profile-photo');
          await page.waitFor('.ion-md-radio-button-off');

          await page.waitFor(500);
          await page.click('.ion-md-radio-button-off');
          await page.waitFor(500);
          await page.waitFor('[owner="me"]').then( x => ok("Reservation success"), e => error("Failed on reservation"));
          
          await page.waitFor(500);
          await page.click('.ion-md-radio-button-on');
          await page.waitFor(500);
          await page.waitFor('[owner=""]').then( x => ok("Cancellation success."), e => error("Failed on cancellation"));

        });
      });


      await logout(page);
      await login(page, id + '@test.com', id);

    });
  }).catch(x => console.log("ERROR: ", x));


  await page.waitFor(50);


  await browser.close();
})();
