import os
import sys
from pathlib import Path

# --- Configuration Constants ---

# Directories to ignore during extraction (e.g., binaries, caches, dependencies)
EXCLUDE_DIRS = {
    'node_modules', '.next', '.git',  
    '__pycache__', '.pytest_cache', 'venv', 'dist', 'build', '.vscode', 
    '.idea', 'tmp', 'temp', 'logs', 'blog', 'about', 'dictionaries', 'music-production-disclaimer', 'videos', 'subscribe',
    'other', 'radio', 'contact', 'contact-form', 'footer', 'game', 'puzzle'

}

# Files to ignore (e.g., secrets, lock files, system configuration)
EXCLUDE_FILES = {
    '.env', '.env.local', '.gitignore', 'package-lock.json', 
    'yarn.lock', 'pnpm-lock.yaml', 'Thumbs.db', '.DS_Store'
}

# Extensions of files whose content should be extracted
CODE_EXTENSIONS = (
    '.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.less', 
    '.json', '.html', '.htm', '.py', '.md', '.java', '.go', 
    '.c', '.cpp', '.h', '.txt', '.xml', '.yaml', '.yml', 
    '.sh', '.toml', '.lock'
)

# --- Main Logic ---

def print_directory_structure(startpath, output_file=None):
    """
    Recursively prints directory structure with file contents.
    
    Args:
        startpath (str): Root directory to scan
        output_file (str, optional): File to write output to. Defaults to None (prints to console).
    """
    
    output_stream = None
    if output_file:
        try:
            # Open file with UTF-8 encoding for broad compatibility
            output_stream = open(output_file, 'w', encoding='utf-8')
        except IOError as e:
            print(f"Error opening output file '{output_file}': {e}")
            return
    
    def write_output(text):
        if output_stream:
            output_stream.write(text + '\n')
        else:
            print(text)
    
    # Normalize startpath for clean relative path calculations
    startpath = os.path.abspath(startpath)
    
    write_output(f"Project Structure and Content for: {os.path.basename(startpath)}")
    write_output("=" * 60 + "\n")

    for root, dirs, files in os.walk(startpath):
        # Exclude directories in-place
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
        
        # Calculate depth level relative to the startpath
        relative_root = os.path.relpath(root, startpath)
        level = relative_root.count(os.sep) if relative_root != '.' else 0
        
        # Indentation for the directory name
        dir_indent = '│   ' * level + ('├── ' if level > 0 else '')
        
        # Print directory name
        write_output(f"{dir_indent}{os.path.basename(root)}/")
        
        # Indentation for file names within this directory
        file_indent = '│   ' * (level + 1) + '├── '
        
        for file in files:
            if file not in EXCLUDE_FILES:
                file_path = os.path.join(root, file)
                
                # Print file name
                write_output(f"{file_indent}{file}")
                
                # Check if file content should be extracted
                if file_path.lower().endswith(CODE_EXTENSIONS):
                    
                    # Consistent indentation prefix for content lines
                    CONTENT_PREFIX = '│   ' * (level + 2) + '| ' 
                    
                    try:
                        write_output(f"{CONTENT_PREFIX}--- FILE CONTENT START ({file}) ---")
                        
                        # Use universal read 'r' with specified encoding
                        with open(file_path, 'r', encoding='utf-8') as content_file:
                            content = content_file.read()
                            
                            # Prepend the content prefix to every line
                            content_lines = content.split('\n')
                            formatted_content = '\n'.join([f"{CONTENT_PREFIX}{line}" for line in content_lines])
                            
                            write_output(formatted_content)
                            
                        write_output(f"{CONTENT_PREFIX}--- FILE CONTENT END ---")
                        write_output('')  # Empty line after content block
                        
                    except UnicodeDecodeError:
                         write_output(f"{CONTENT_PREFIX}[ERROR READING FILE: Skipping due to non-UTF-8 binary content or encoding issues]")
                         write_output('')
                    except Exception as e:
                        # Handle other errors like permission denied
                        write_output(f"{CONTENT_PREFIX}[ERROR READING FILE: {str(e)}]")
                        write_output('')

    if output_stream:
        output_stream.close()

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python project_code_extractor.py <project_directory> [output_file]")
        sys.exit(1)
    
    project_dir = sys.argv[1]
    output_file = sys.argv[2] if len(sys.argv) > 2 else "code_structure.txt"
    
    if not os.path.isdir(project_dir):
        print(f"Error: Directory '{project_dir}' does not exist.")
        sys.exit(1)
    
    print(f"Starting extraction from: {project_dir}")
    print_directory_structure(project_dir, output_file)
    
    if os.path.exists(output_file):
        print(f"Extraction complete. Structure saved to: {output_file}")
    else:
        print("Extraction failed or output file could not be created.")