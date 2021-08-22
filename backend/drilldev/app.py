import os
import tempfile

import flask
import playwright.sync_api

app = flask.Flask(__name__)


@app.route("/")
def root():
	return '''
		<form action="/run" method="post" enctype="multipart/form-data">
			<label for="file">Upload and test an HTML file</label><br />
			<input type="file" id="file" name="file" /><br />
			<input type="submit" value="Submit" /><br />
		</form>
	'''


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
