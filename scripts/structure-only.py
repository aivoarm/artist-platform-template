import os
import sys

def generate_structure(startpath, indent='', output_file=None):
    # Folders to ignore
    ignore_list = {'.git', '__pycache__', '.venv', 'node_modules', '.next', '.DS_Store'}
    
    try:
        # Filter out ignored items immediately
        items = [i for i in sorted(os.listdir(startpath)) if i not in ignore_list]
    except (PermissionError, FileNotFoundError) as e:
        return

    for i, item in enumerate(items):
        path = os.path.join(startpath, item)
        is_last = (i == len(items) - 1)
        
        connector = "└── " if is_last else "├── "
        line = f"{indent}{connector}{item}\n"
        
        print(line, end='')
        if output_file:
            output_file.write(line)
        
        if os.path.isdir(path):
            extension = "    " if is_last else "│   "
            generate_structure(path, indent + extension, output_file)

if __name__ == "__main__":
    # Determine the project root (one level up from this script's location)
    # This ensures it scans the whole project when run as 'python3 scripts/structure-only.py'
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    
    output_filename = "structure.txt"

    with open(output_filename, "w", encoding="utf-8") as f:
        header = f"Project Structure: {project_root}\n.\n"
        print(header, end='')
        f.write(header)
        
        generate_structure(project_root, output_file=f)
            
    print(f"\nStructure successfully saved to {output_filename}")