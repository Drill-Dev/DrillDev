import os

def main():
	os.system("""
		FLASK_APP=drilldev/app.py FLASK_DEBUG=1 \
			poetry run flask run --host=0.0.0.0 --port=5000
	""")
