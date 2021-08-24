const playwright = require('playwright');

async function main() {
	console.log('1');
	const browser = await playwright.chromium.launch();
	console.log('2');
	const page = await browser.newPage();

	console.log('3');
	await page.goto(`http://${process.env.HOST}:8080`);

	console.log('4');
	await page.setDefaultTimeout(3000);

	console.log('5');
	await page.click("text='Login'");
}

main().then(() => process.exit(0)).catch(() => process.exit(1));
