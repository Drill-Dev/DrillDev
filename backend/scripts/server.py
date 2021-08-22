import os


def main():
	os.environ["FLASK_APP"] = "drilldev/app.py"
	os.environ["FLASK_DEBUG"] = "1"
	if os.path.isfile("/.dockerenv"):
		os.system("flask run --host=0.0.0.0 --port=5000")
	else:
		os.system("flask run --port=5000")
