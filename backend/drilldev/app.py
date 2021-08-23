import os
import tempfile

import flask
import flask_cors
import playwright.sync_api

app = flask.Flask(__name__)
flask_cors.CORS(app)


@app.route("/run", methods=["POST"])
def run():
	with tempfile.TemporaryDirectory() as dirname:
		dirname = os.path.abspath(dirname)
		flask.request.files["file"].save(os.path.join(dirname, "index.html"))
		with playwright.sync_api.sync_playwright() as p:
			browser = p.firefox.launch()
			page = browser.new_page()
			page.goto(f"file:///{dirname}/index.html")
			page.set_default_timeout(3000)  # 3 seconds
			try:
				page.click("text='Login'")
			except playwright.sync_api.TimeoutError:
				return {"status": "TLE"}
			browser.close()
	return {"status": "AC"}


if __name__ == "__main__":
	app.run()
