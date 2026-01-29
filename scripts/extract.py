import os
import sys
import re
from pathlib import Path

# --- Configuration Constants ---

# Directories to ignore (Added Vercel, caches, and media folders to keep output clean)
EXCLUDE_DIRS = {
    'node_modules', '.next', '.git', '.vercel', '__pycache__', 
    '.pytest_cache', 'venv', 'dist', 'build', '.vscode', 
    '.idea', 'tmp', 'temp', 'logs', 'coverage', 'public/audio'
}

# Files to ignore (Crucial for preventing credential leaks)
EXCLUDE_FILES = {
    '.env', '.env.local', '.env.development', '.env.production',
    '.gitignore', 'package-lock.json', 'yarn.lock', 'pnpm-lock.yaml', 
    'Thumbs.db', '.DS_Store', 'favicon.ico', 'apple-icon.png', 'logo.gif',
    'pnpm-debug.log', 'npm-debug.log', 'code_structure.txt'
}

# Maximum file size to read (500KB) to prevent crashes or massive text files
MAX_FILE_SIZE = 500_000 

# Extensions to extract
CODE_EXTENSIONS = (
    '.js', '.jsx', '.ts', '.tsx', '.css', '.scss', 
    '.json', '.html', '.md', '.mdx', '.txt', 
    '.yaml', '.yml', '.toml'
)

# Safety: Regex patterns to detect and redact potential secrets
SECRET_PATTERNS = [
    re.compile(r'(key|secret|token|auth|password|pwd|api_key)\s*[:=]\s*["\'][a-zA-Z0-9_\-]{8,}', re.I),
    re.compile(r'AI_KEY\s*[:=]\s*.*', re.I),
    re.compile(r'DATABASE_URL\s*[:=]\s*.*', re.I)
]

# --- Main Logic ---

def is_line_sensitive(line):
    """Checks if a line of code likely contains a secret."""
    return any(pattern.search(line) for pattern in SECRET_PATTERNS)

def print_directory_structure(startpath, output_file=None):
    output_stream = open(output_file, 'w', encoding='utf-8') if output_file else sys.stdout
    
    def write_output(text):
        output_stream.write(text + '\n')
    
    startpath = os.path.abspath(startpath)
    write_output(f"Project Structure and Content for: {os.path.basename(startpath)}")
    write_output("=" * 60 + "\n")

    for root, dirs, files in os.walk(startpath):
        # Exclude directories in-place
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
        
        relative_root = os.path.relpath(root, startpath)
        level = relative_root.count(os.sep) if relative_root != '.' else 0
        dir_indent = '│   ' * level + ('├── ' if level > 0 else '')
        write_output(f"{dir_indent}{os.path.basename(root)}/")
        
        file_indent = '│   ' * (level + 1) + '├── '
        
        for file in files:
            if file in EXCLUDE_FILES:
                continue
                
            file_path = os.path.join(root, file)
            write_output(f"{file_indent}{file}")
            
            if file_path.lower().endswith(CODE_EXTENSIONS):
                CONTENT_PREFIX = '│   ' * (level + 2) + '| ' 
                
                # Safety Check: File Size
                if os.path.getsize(file_path) > MAX_FILE_SIZE:
                    write_output(f"{CONTENT_PREFIX}[SKIPPED: File too large]")
                    continue

                try:
                    write_output(f"{CONTENT_PREFIX}--- START: {file} ---")
                    with open(file_path, 'r', encoding='utf-8') as f:
                        for line in f:
                            # Safety Check: Redact secrets
                            if is_line_sensitive(line):
                                write_output(f"{CONTENT_PREFIX}[REDACTED POTENTIAL SECRET]")
                            else:
                                write_output(f"{CONTENT_PREFIX}{line.rstrip()}")
                    write_output(f"{CONTENT_PREFIX}--- END: {file} ---\n")
                except Exception as e:
                    write_output(f"{CONTENT_PREFIX}[ERROR READING FILE: {str(e)}]\n")

    if output_file:
        output_stream.close()

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python extractor.py <project_dir> [output_file]")
        sys.exit(1)
    
    target_dir = sys.argv[1]
    out_file = sys.argv[2] if len(sys.argv) > 2 else "code_structure.txt"
    
    print(f"Extracting safely from: {target_dir}")
    print_directory_structure(target_dir, out_file)
    print(f"Done. Output saved to: {out_file}")