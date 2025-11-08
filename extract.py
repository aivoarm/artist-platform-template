import os
import sys
from pathlib import Path

def print_directory_structure(startpath, output_file=None):
    """
    Recursively prints directory structure with file contents.
    
    Args:
        startpath (str): Root directory to scan
        output_file (str, optional): File to write output to. Defaults to None (prints to console).
    """
    exclude_dirs = {'node_modules', '.next', '.git', 'public'}
    exclude_files = {'.env', '.env.local', '.gitignore'}
    
    if output_file:
        f = open(output_file, 'w')
    
    def write_output(text):
        if output_file:
            f.write(text + '\n')
        else:
            print(text)
    
    for root, dirs, files in os.walk(startpath):
        # Exclude directories
        dirs[:] = [d for d in dirs if d not in exclude_dirs]
        
        level = root.replace(startpath, '').count(os.sep)
        indent = '│   ' * (level - 1) + '├── ' if level > 0 else ''
        
        write_output(f"{indent}{os.path.basename(root)}/")
        
        subindent = '│   ' * level + '├── '
        
        for file in files:
            if file not in exclude_files:
                file_path = os.path.join(root, file)
                try:
                    write_output(f"{subindent}{file}")
                    
                    # Print file content if it's a code file
                    if file_path.endswith(('.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.json')):
                        with open(file_path, 'r') as content_file:
                            content = content_file.read()
                            write_output('\n'.join([f"│   {subindent}{line}" for line in content.split('\n')]))
                            write_output('')  # Empty line after content
                except Exception as e:
                    write_output(f"{subindent}[Error reading {file}: {str(e)}]")
    
    if output_file:
        f.close()

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python nextjs_structure.py <project_directory> [output_file]")
        sys.exit(1)
    
    project_dir = sys.argv[1]
    output_file = sys.argv[2] if len(sys.argv) > 2 else "code_structure.txt"
    
    if not os.path.isdir(project_dir):
        print(f"Error: Directory '{project_dir}' does not exist.")
        sys.exit(1)
    
    print(f"Extracting structure from: {project_dir}")
    print_directory_structure(project_dir, output_file)
    
    if output_file:
        print(f"Structure saved to: {output_file}")
