from playwright.sync_api import sync_playwright
import subprocess
import time

# Start vite preview
proc = subprocess.Popen(
    ['npx', 'vite', 'preview', '--port', '4175', '--host', '0.0.0.0'],
    cwd='/home/z/my-project/homeodesk-pro',
    stdout=subprocess.PIPE, stderr=subprocess.PIPE
)
time.sleep(5)

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={"width": 1400, "height": 900})
    
    # 1. Go to Analysis tab (empty state)
    page.goto('http://localhost:4175/', timeout=15000)
    time.sleep(2)
    page.click('text=Analysis')
    time.sleep(2)
    page.screenshot(path='/home/z/my-project/download/analysis-top3-empty.png')
    print("Saved: analysis-top3-empty.png")
    
    # 2. Go to Repertory and add rubrics
    page.click('text=Repertory')
    time.sleep(1.5)
    
    # Search for "anxiety"
    page.fill('input[placeholder*="Search rubrics"]', 'anxiety')
    page.keyboard.press('Enter')
    time.sleep(1.5)
    
    # Add first 4 rubrics
    add_buttons = page.query_selector_all('button:has-text("+ Add")')
    for btn in add_buttons[:4]:
        try:
            btn.click()
            time.sleep(0.3)
        except:
            pass
    time.sleep(1)
    
    # 3. Go back to Analysis tab
    page.click('text=Analysis')
    time.sleep(3)
    
    # Take screenshot - full page
    page.screenshot(path='/home/z/my-project/download/analysis-top3-results.png', full_page=True)
    print("Saved: analysis-top3-results.png")
    
    browser.close()

proc.terminate()
print("Done!")
