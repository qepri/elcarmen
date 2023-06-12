import requests
from bs4 import BeautifulSoup, NavigableString
import pdfkit
import pandas as pd



# Specify the URL
url = 'https://www.zoho.com/es-xl/deluge/'

# Send HTTP request and get the HTML of the page
response = requests.get(url)

# For HTTP error handling
response.raise_for_status()

# Get the HTML content of the page
html_content = response.text

# Parse the HTML with BeautifulSoup
soup = BeautifulSoup(html_content, 'html.parser')

# Initialize lists to store the tag names, attributes, and text content
tags = []
attrs = []
texts = []

# Traverse the parse tree
for element in soup.recursiveChildGenerator():
    if isinstance(element, NavigableString):
        continue
    else:
        tags.append(element.name)
        attrs.append(element.attrs)
        texts.append(element.get_text(strip=True, separator=' '))

# Write the HTML source code into a PDF
pdfkit.from_string(html_content, 'source_code.pdf')

# Write the text content into a PDF
pdfkit.from_string(soup.get_text(strip=True, separator=' '), 'content.pdf')

# Write the HTML elements and text content into a CSV
# This creates a CSV with three columns, where each row corresponds to an HTML element
df = pd.DataFrame({
    'Tag': tags,
    'Attributes': attrs,
    'Content': texts,
})
df.to_csv('relation.csv', index=False)
