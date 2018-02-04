import * as puppeteer from 'puppeteer';

class T {
    browser;
    page: puppeteer.Page = null;
    async init(o) {
        this.browser = await puppeteer.launch(o);
        this.page = await this.browser.newPage();
    }
    async open(url) {
        await this.page.goto(url);
    }
    async click(selector) {
        await this.wait(500);
        await this.page.waitForSelector(selector, { timeout: 10000 }).catch(e => this.error('Cannot find: ' + selector));
        await this.page.click(selector);
    }
    async exist(selector) {
        await this.wait(500);
        await this.page.waitForSelector(selector, { timeout: 1000 })
            .then(x => this.ok(`${selector} exists.`))
            .catch(e => this.error('exits() cannot find: ' + selector));

    }
    async clickExist( click_selector, exist_selector ) {
        await this.click( click_selector );
        await this.exist( exist_selector );
    }
    async wait(n) {
        await this.page.waitFor(n);
    }
    error(e) {
        console.log("TEST ERROR: ", e);
        process.exit(-1);
    }
    ok(msg) {
        console.log("TEST OK: ", msg);
    }
    end() {
        this.browser.close();
    }
}

(async () => {
    const t = new T();
    t.ok("Begin new test ... at : " + (new Date).toLocaleString());
    await t.init({ headless: false, devtools: true });
    await t.open('https://www.katalkenglish.com/');
    await t.click('page-home .header-login');
    await t.exist('[name="email"]');

    await t.clickExist('.header-register', '[name="nickname"]');

    await t.wait(500000);
    await t.end();
})();
