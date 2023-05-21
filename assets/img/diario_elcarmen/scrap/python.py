import requests
from bs4 import BeautifulSoup
import csv
import pandas as pd

base_url = 'https://laws.justice.gc.ca'

def get_page_content(url):
    response = requests.get(url)
    return BeautifulSoup(response.text, 'html.parser')

def extract_text_from_page(soup):
    content = soup.find('div', {'id': 'wb-auto-6'}).get_text(separator=' ', strip=True)
    return content

def get_link_url(soup, link_text):
    link = soup.find('a', text=link_text)
    return base_url + link['href'] if link else None

def scrape_link(link_text):
    soup = get_page_content(base_url + '/eng/acts/I-2.5/')
    link_url = get_link_url(soup, link_text)
    if link_url:
        page_soup = get_page_content(link_url)
        return extract_text_from_page(page_soup)
    else:
        print(f"Link not found: {link_text}")
        return None

# List of links to scrape
links_list = [
    'Table of Contents',
    'Immigration and Refugee Protection Act',
    '1 - Short Title',
    # Add the rest of your links here...
]

data = {}

# Scrape each link and save the text content
for link in links_list:
    print(f"Scraping link: {link}")
    data[link] = scrape_link(link)

# Convert the dictionary to a DataFrame
df = pd.DataFrame(list(data.items()), columns=['Link', 'Content'])

# Save the DataFrame to a CSV file
df.to_csv('scraped_data.csv', index=False)
