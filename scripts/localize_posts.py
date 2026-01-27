import os
import re
import time
from deep_translator import GoogleTranslator

# Configuration
BASE_POSTS_DIR = os.path.join('app', '[lang]', 'blog', 'posts')
SOURCE_LANG = 'en'
TARGET_LANGS = ['fr', 'es', 'it', 'de', 'hy', 'ru', 'ar', 'pt']

def sanitize_mdx_tags(text):
    """
    Finds patterns like „<Image>“ or "<Component>" and wraps them 
    in backticks so MDX doesn't try to execute them as code.
    """
    # Pattern matches: optional opening quotes + <Word> + optional closing quotes
    # Handles German „“, English "", and standard brackets
    tag_pattern = r'([„"\'\s]?)<([A-Z][a-zA-Z0-9]*)>([“"\'\s]?)'
    
    def replace_with_code(match):
        prefix = match.group(1)
        tag_name = match.group(2)
        suffix = match.group(3)
        return f'{prefix}`<{tag_name} />`{suffix}'

    return re.sub(tag_pattern, replace_with_code, text)

def translate_text(text, target_lang):
    if not text or not text.strip() or len(text.strip()) < 2:
        return text
    
    try:
        time.sleep(0.6) 
        translator = GoogleTranslator(source='auto', target=target_lang)
        chunks = [text[i:i+4000] for i in range(0, len(text), 4000)]
        translated_chunks = []
        
        for chunk in chunks:
            result = translator.translate(chunk)
            translated_chunks.append(result if result else chunk)
                
        final_text = "".join(translated_chunks)
        
        # NEW: Sanitize the translation before returning
        return sanitize_mdx_tags(final_text)
        
    except Exception as e:
        print(f"      Translation Error: {e}")
        return text

def process_mdx(content, target_lang):
    fm_match = re.match(r'^---\s*([\s\S]*?)\s*---', content)
    if fm_match:
        fm_block = fm_match.group(1)
        body = content[fm_match.end():]
        new_fm_lines = []
        for line in fm_block.strip().split('\n'):
            if ':' in line:
                key, val = line.split(':', 1)
                if key.strip() in ['title', 'summary', 'excerpt']:
                    # Sanitize titles too, just in case
                    translated_val = translate_text(val.strip(), target_lang)
                    new_fm_lines.append(f"{key}: '{translated_val}'")
                else:
                    new_fm_lines.append(line)
            else:
                new_fm_lines.append(line)
        new_frontmatter = "---\n" + "\n".join(new_fm_lines) + "\n---\n"
    else:
        new_frontmatter = ""
        body = content

    # Protect actual React blocks and ensure block spacing
    pattern = r'(<[A-Z][a-zA-Z]*[^>]*/>|<div[^>]*>[\s\S]*?</div>|<iframe[^>]*>[\s\S]*?</iframe>)'
    segments = re.split(pattern, body)
    
    translated_segments = []
    for seg in segments:
        if not seg or not seg.strip(): continue
        
        if seg.strip().startswith('<'):
            # This is a real code block, just preserve it
            translated_segments.append(f"\n\n{seg.strip()}\n\n")
        else:
            # This is prose, translate AND sanitize
            res = translate_text(seg.strip(), target_lang)
            if res:
                translated_segments.append(f"\n\n{res}\n\n")
            
    final_body = "".join(translated_segments)
    final_body = re.sub(r'\n{3,}', '\n\n', final_body).strip()
            
    return new_frontmatter + "\n\n" + final_body

def run_localization():
    source_path = os.path.join(BASE_POSTS_DIR, SOURCE_LANG)
    if not os.path.exists(source_path):
        print(f"Error: {source_path} not found.")
        return

    files = [f for f in os.listdir(source_path) if f.endswith('.mdx')]
    
    for lang in TARGET_LANGS:
        target_dir = os.path.join(BASE_POSTS_DIR, lang)
        os.makedirs(target_dir, exist_ok=True)
        print(f"🌍 Localizing: {lang.upper()}")

        for file_name in files:
            target_file = os.path.join(target_dir, file_name)
            if os.path.exists(target_file):
                print(f"  - Skipped: {file_name}")
                continue

            with open(os.path.join(source_path, file_name), 'r', encoding='utf-8') as f:
                original_content = f.read()
            
            translated_content = process_mdx(original_content, lang)
            
            with open(target_file, 'w', encoding='utf-8') as f:
                f.write(translated_content)
            print(f"  - Created: {file_name}")

if __name__ == "__main__":
    run_localization()