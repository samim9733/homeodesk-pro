from playwright.sync_api import sync_playwright
import subprocess, time

# Start server in same process context
proc = subprocess.Popen(
    ['npx', 'vite', 'preview', '--port', '4179', '--host', '0.0.0.0'],
    cwd='/home/z/my-project/homeodesk-pro',
    stdout=subprocess.PIPE, stderr=subprocess.PIPE
)
time.sleep(5)

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={'width': 1400, 'height': 900})
    
    page.goto('http://localhost:4179/', timeout=15000)
    time.sleep(3)
    
    # 1. Dashboard
    page.screenshot(path='/home/z/my-project/download/check-dash.png')
    print('1. Dashboard saved')
    
    # 2. Repertory
    page.click('text=KENT\'S REPERTORY')
    time.sleep(2)
    page.screenshot(path='/home/z/my-project/download/check-repertory.png')
    
    # Search and add rubrics
    page.fill('input[placeholder*="Search rubrics"]', 'anxiety')
    page.keyboard.press('Enter')
    time.sleep(1.5)
    
    add_btns = page.query_selector_all('button')
    added = 0
    for b in add_btns:
        txt = b.inner_text().strip()
        if txt == '+ Add' and added < 4:
            b.click()
            added += 1
            time.sleep(0.3)
    
    time.sleep(1)
    page.screenshot(path='/home/z/my-project/download/check-repertory-added.png')
    print(f'2. Repertory saved ({added} rubrics added)')
    
    # 3. Analysis with Top 3 remedies
    page.click('text=CASE ANALYSIS')
    time.sleep(3)
    page.screenshot(path='/home/z/my-project/download/check-analysis-top3.png', full_page=True)
    print('3. Analysis Top 3 saved')
    
    # 4. Reminders
    page.click('text=REMINDERS')
    time.sleep(1.5)
    page.screenshot(path='/home/z/my-project/download/check-reminders.png')
    print('4. Reminders saved')
    
    # 5. Pharmacy
    page.click('text=PHARMACY')
    time.sleep(1.5)
    page.screenshot(path='/home/z/my-project/download/check-pharmacy.png')
    print('5. Pharmacy saved')
    
    browser.close()
    print('All screenshots done!')

proc.terminate()
