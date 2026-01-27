import requests
from bs4 import BeautifulSoup
import json

# The pages you want the Professor to "study"
urls = {
    "home": "https://www.armanayva.com/en",
        "about": "https://www.armanayva.com/en/about",
        "videos": "https://www.armanayva.com/en/videos",

    "radio": "https://www.armanayva.com/en/radio",
    "arcade": "https://www.armanayva.com/en/puzzle",
    "privacy": "https://www.armanayva.com/en/privacy",
    "medium_article": "https://r.jina.ai/https://medium.com/@arman_ayva/the-architecture-of-a-0-modern-website-a0440766ebf2"
}

knowledge_base = {}

for key, url in urls.items():
    print(f"Harvseting {key}...")
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Remove clutter
    for element in soup(['script', 'style', 'nav', 'footer']):
        element.decompose()
        
    # Get clean text
    knowledge_base[key] = soup.get_text(separator=' ', strip=True)[:2000] # Cap at 2k chars

# Save for the Next.js API
with open('dictionaries/site-knowledge.json', 'w', encoding='utf-8') as f:
    json.dump(knowledge_base, f, indent=2)

print("Knowledge base updated!")