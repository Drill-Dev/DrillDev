const playwright = require('playwright');

// A function for running the Playwright test
async function runTest(browser) {
	const page = await browser.newPage();

	await page.goto('http://localhost:8080');
	await page.setDefaultTimeout(3000);
	await page.click("text='Login'");
}

async function judgeSubmission() {
	// Launch a playwright browser
	const browser = await playwright.chromium.launch();
	try {
		// Run the test
		await runTest(browser);

		// Send an AC status if the test passes without errors
		return { status: 'AC' };
	} catch (error) {
		console.error(error)
		// Send a TLE if the error is a TimeoutError
		if (error instanceof playwright.errors.TimeoutError) {
			return { status: 'TLE' };
		} else {
			return { status: 'IE' };
		}
	} finally {
		// Close the browser
		await browser.close();
	}
}

(async () => {
	const result = await judgeSubmission();
	console.log(JSON.stringify(result));
})();
