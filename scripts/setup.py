import os
import json
import re

def run_wizard():
    print("🎨 Welcome to the Artist Platform Setup Wizard")
    print("-----------------------------------------------")

    # 1. Collect Basic Info
    name = input("Enter your Full Name (e.g., John Doe): ")
    handle = input("Enter your Username (e.g., johndoe): ")
    email = input("Enter your Contact Email: ")
    github = input("Enter your GitHub Profile URL: ")

    # 2. Collect API Keys (to generate .env.local)
    print("\n🔑 API Configuration (Leave blank to fill later)")
    gemini_key = input("Google Gemini API Key: ")
    spotify_id = input("Spotify Client ID: ")
    spotify_secret = input("Spotify Client Secret: ")

    # 3. Update site-knowledge.json
    knowledge_path = 'dictionaries/site-knowledge.json'
    if os.path.exists(knowledge_path):
        with open(knowledge_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        # Update specific fields
        data['ownerName'] = name
        data['username'] = handle
        data['contactEmail'] = email
        
        with open(knowledge_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2)
        print(f"✅ Updated {knowledge_path} [cite: 27]")

    # 4. Create .env.local
    env_content = f"""# Created by Setup Wizard
NEXT_PUBLIC_SITE_URL=http://localhost:3000
GEMINI_API_KEY={gemini_key}
SPOTIFY_CLIENT_ID={spotify_id}
SPOTIFY_CLIENT_SECRET={spotify_secret}
"""
    with open('.env.local', 'w') as f:
        f.write(env_content)
    print("✅ Created .env.local ")

    # 5. Global Search and Replace for Branding
    # Replaces your name/handle across UI components
    targets = ['app/layout.tsx', 'app/components/footer.tsx', 'package.json']
    
    for file_path in targets:
        if os.path.exists(file_path):
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Simple replacement logic
            content = content.replace("Arman Ayva", name)
            content = content.replace("aivoarm", handle)
            
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✅ Personalised {file_path} [cite: 19, 23, 27]")

    print("\n✨ Setup Complete!")
    print("Next steps: Replace public/logo.gif and public/favicon.ico with your own assets.")

if __name__ == "__main__":
    run_wizard()