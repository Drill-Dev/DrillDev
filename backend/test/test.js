const playwright = require('playwright');

async function main() {
	const browser = await playwright.chromium.launch();
	const page = await browser.newPage();
	await page.goto(`http://${process.env.HOST}`);
	await page.setDefaultTimeout(3000);
	await page.click("text='Login'");
}

main()
	.then(() => process.exit(0))
	.catch(() => process.exit(1));
