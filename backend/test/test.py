import json
import playwright.sync_api

def main():
    with playwright.sync_api.sync_playwright() as p:
        browser = p.firefox.launch()
        page = browser.new_page()
        page.goto("http://localhost:8080")
        page.set_default_timeout(3000)  # 3 seconds
        try:
            page.click("text='Login'")
        except playwright.sync_api.TimeoutError:
            return {"status": "TLE"}
        browser.close()
    return {"status": "AC"}

if __name__ == "__main__":
    print(json.dumps(main()))
