import sys
import os
import tempfile

import flask
import flask_cors
import playwright.sync_api
import docker

app = flask.Flask(__name__)
flask_cors.CORS(app)

client = docker.from_env()

# Make sure python:3.8 is pulled before the server starts
try:
	client.images.get("python:3.8")
except docker.errors.ImageNotFound:
	print("Run docker pull python3.8 or something lol")
	sys.exit(51)

@app.route("/run", methods=["POST"])
def run():
	with tempfile.TemporaryDirectory() as dirname:
		dirname = os.path.abspath(dirname)
		flask.request.files["file"].save(os.path.join(dirname, "index.html"))
		container = client.containers.run(
            "python:3.8",
            "python -m http.server -d /root/html 80",
            detach=True,
            ports={80: 8080},
            volumes={dirname: {"bind": "/root/html", "mode": "ro"}},
        )
		try:
			with playwright.sync_api.sync_playwright() as p:
				browser = p.firefox.launch()
				page = browser.new_page()
				page.goto("localhost:8080")
				page.set_default_timeout(3000)  # 3 seconds
				try:
					page.click("text='Login'")
				except playwright.sync_api.TimeoutError:
					return {"status": "TLE"}
				browser.close()
		finally:
			container.remove(force=True)
	return {"status": "AC"}


if __name__ == "__main__":
	app.run()
