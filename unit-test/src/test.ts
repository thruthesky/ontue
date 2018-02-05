import * as puppeteer from 'puppeteer';

const login_id = 'testlogin@gmail.com';
const login_password = '12345a';

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
            .catch(e => this.error('find() cannot find: ' + selector + ' message: ' + message));

    }
    async clickFind(o) {
        await this.click(o['click']);
        await this.find(o['find'], o['message']);
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

    async login(email, password) {
        this.ok("Login begins...!");
        await this.clickFind({ click: '.header-login', find: '[name="email"]', login: "Login page opened" });

        await this.page.type('[name="email"]', email, { delay: 50 }).catch(x => this.error('Cannot type email'));
        await this.page.waitFor(100);
        await this.page.type(`[name="password"]`, password, { delay: 50 });
        await this.page.waitFor(100);

        await this.page.click('.input .app-button');
        await this.page.waitFor('page-home .header-home').then(x => this.ok("Login success!")).catch(x => this.error('Login Failed!'));

        await this.page.waitFor(200);
    }

    /**
     * Ajax 콜이 완료되면 값이 Input 박스에 들어가는 경우가 있을 때,
     * 이 함수를 사용하여, Input 박스에 값이 나타나면 그 값을 얻을 수 있다.
     * @param selector selector for input element
     */
    async waitForTextValueAppear(selector) {
        for( let i = 0; i < 100; i ++ ) {
            this.wait(100);
            const handle = await this.page.$(selector);
            const v = await this.page.evaluate((input) => input.value, handle);
            if ( v ) return v;
        }
    }

}

(async () => {
    const t = new T();
    t.ok("Begin new test. at : " + (new Date).toLocaleString());
    await t.init({ headless: true, devtools: true });
    await t.open('http://www.katalkenglish.com');
    await t.wait(1000);
    await t.find('.teacher-profile-photo', "First page is not homepage. The website is down? or is there any debugging code to redirect a sub page?");
    const rules = [
        // { click: '.header-home', find: '.teacher-profile-photo', message: 'Home page opened.'},
        { click: '.header-register', find: '[name="nickname"]', message: 'Register page opened.' },
        { click: '.header-adv', find: '.where', message: 'Student Adv page opened.' },
        { click: '.header-leveltest', find: '.teacher-profile-photo', message: 'Level test page opened.' },
        { click: '.teacher-profile-photo', find: '.teacher-profile-photo', message: 'Schedule table page opened.' },
        { click: '.header-schedule-available', find: 'schedule-available-page', message: 'Instant book page opended' },
        { click: '.header-class-comment', find: '.comment-wrapper', message: 'Class comment page opended' },
        { click: '.header-class-payment', find: 'payment-page', message: 'Payment page opended' },
        { click: '.header-class-help', find: '.part.qna', message: 'Help page opended' },
        { click: '.header-class-menu', find: '.menu-schedule-table', message: 'Menu page opended' },
        { click: '.menu-schedule-table', find: '.schedule-table-content', message: 'All schedule table page opended' },
        // { click: '.header-login', find: '[name="email"]', message: 'Login page opened.' },
    ];

    // for (const rule of rules) {
    //     await t.clickFind(rule);
    // }


    await t.login(login_id, login_password);

    // after login, you will need to re-visit the site. Or click will not work. Maybe because of 'modal loader?'
    await t.open('http://www.katalkenglish.com');

    // check meber information. check email.
    await t.clickFind({ click: '.header-class-menu', find: '.menu-profile', message: 'Menu page opended' });
    await t.clickFind({ click: '.menu-profile', find: '[name="email"]', message: 'Profile page opended' });

    const email = await t.waitForTextValueAppear('[name="email"]');
console.log('email: ', email);
    if (email == login_id) t.ok("login email matches on profile update.");
    else t.error("Email on profile update page does not match with login id");

    await t.wait(5000000);
    await t.end();
})();
