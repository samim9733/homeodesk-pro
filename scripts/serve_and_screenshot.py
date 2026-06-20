#!/usr/bin/env python3
"""Serve the dist directory and take screenshots with playwright."""
import subprocess
import time
import os
import sys
from playwright.sync_api import sync_playwright

DIST_DIR = "/home/z/my-project/homeodesk-pro/dist"
OUTPUT_DIR = "/home/z/my-project/download"

def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    # Start server
    server = subprocess.Popen(
        ["python3", "-m", "http.server", "3002"],
        cwd=DIST_DIR,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL
    )
    time.sleep(2)
    
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch()
            page = browser.new_page(viewport={"width": 1280, "height": 800})
            
            # Screenshot 1: Home page
            page.goto("http://localhost:3002", timeout=20000)
            page.wait_for_load_state("networkidle", timeout=15000)
            page.screenshot(path=os.path.join(OUTPUT_DIR, "homeodesk-home.png"))
            print("Screenshot 1: Home page saved")
            
            # Screenshot 2: Repertory tab - click on it
            try:
                # Look for Repertory tab/link
                rep_tab = page.locator("text=Repertory").first
                if rep_tab.is_visible(timeout=5000):
                    rep_tab.click()
                    time.sleep(2)
                    page.wait_for_load_state("networkidle", timeout=10000)
                    page.screenshot(path=os.path.join(OUTPUT_DIR, "homeodesk-repertory.png"))
                    print("Screenshot 2: Repertory tab saved")
            except Exception as e:
                print(f"Could not capture Repertory tab: {e}")
            
            browser.close()
    finally:
        server.terminate()
        server.wait(timeout=5)
    
    print("Done!")

if __name__ == "__main__":
    main()
