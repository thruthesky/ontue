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
        await this.page.waitForSelector(selector, { timeout: 7000 }).catch(e => this.error('click() : Cannot find: ' + selector));
        await this.page.click(selector);
    }
    async find(selector, message = '') {
        await this.wait(500);
        await this.page.waitForSelector(selector, { timeout: 1000 })
            .then(x => this.ok(`${selector} found. message: ${message}`))
            .catch(e => this.error('find() cannot find: ' + selector));

    }
    async clickFind( o ) {
        await this.click( o['click'] );
        await this.find( o['find'], o['message'] );
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
    t.ok("Begin new test. at : " + (new Date).toLocaleString());
    await t.init({ headless: true, devtools: true });
    await t.open('https://www.katalkenglish.com/');
    await t.click('page-home .header-login');
    await t.find('[name="email"]');

    const rules = [
        { click: '.header-register', find: '[name="nickname"]', message: 'Register page opened.'},
        { click: '.header-adv', find: '.where', message: 'Student Adv page opened.'},
        { click: '.header-leveltest', find: '.teacher-profile-photo', message: 'Level test page opened.'},
        { click: '.teacher-profile-photo', find: '.teacher-profile-photo', message: 'Schedule table page opened.'},
        { click: '.header-schedule-available', find: 'schedule-available-page', message: 'Instant book page opended'},
        { click: '.header-class-comment', find: '.comment-wrapper', message: 'Class comment page opended'},
        { click: '.header-class-payment', find: 'payment-page', message: 'Payment page opended'},
        { click: '.header-class-help', find: '.part.qna', message: 'Help page opended'},
        { click: '.header-class-menu', find: '.menu-schedule-table', message: 'Menu page opended'},
    ];

    for( const rule of rules ) {
        await t.clickFind( rule );
    }


    

    await t.wait(500000);
    await t.end();
})();
