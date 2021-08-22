import os

import flask
import playwright.sync_api

app = flask.Flask(__name__)


@app.route("/run", methods=["POST"])
def run():
	flask.request.files["file"].save("file.html")
	with playwright.sync_api.sync_playwright() as p:
		browser = p.firefox.launch()
		page = browser.new_page()
		page.goto(f"file:///{os.getcwd()}/file.html")
		page.set_default_timeout(3000)  # 3 seconds
		try:
			page.click("text='Login'")
		except BaseException as e:  # TODO: Replace with TimeoutError later
			print(repr(e))
			return f'''
				<p>Failed</p>
				<a href="{flask.url_for("root")}">Home</a>
			'''
		browser.close()
	return f'''
		<p>Passed</p>
		<a href="{flask.url_for("root")}">Home</a>
	'''


if __name__ == "__main__":
	app.run()
