import os
from pathlib import Path

# --- CONFIG ---
# Folders to skip entirely
IGNORE_DIRS = {'.git', 'node_modules', '.next', '__pycache__', '.vercel', 'public', 'dist'}
# Only read these file types
EXTENSIONS = {'.ts', '.tsx', '.js', '.jsx', '.json', '.py', '.md', '.css'}

def scan_selected_folder():
    # 1. Get the path from user
    target_input = input("📁 Enter the folder path to scan (relative or absolute): ").strip()
    root = Path(target_input).resolve()

    if not root.exists() or not root.is_dir():
        print("❌ Error: Path does not exist or is not a directory.")
        return

    output_file = f"content_{root.name}.txt"
    
    

    print(f"Scanning {root}...")

    with open(output_file, 'w', encoding='utf-8') as f:
        # rglob('*') finds everything recursively
        for path in root.rglob('*'):
            
            # Skip if any part of the path is in IGNORE_DIRS
            if any(part in IGNORE_DIRS for part in path.parts):
                continue
            
            # Write Directory Structure
            if path.is_dir():
                level = len(path.relative_to(root).parts)
                indent = "  " * level
                f.write(f"\n{indent}[DIR] {path.name}/\n")
                continue

            # Process Files
            if path.is_file() and path.suffix in EXTENSIONS:
                rel_path = path.relative_to(root)
                indent = "  " * len(rel_path.parts)
                f.write(f"{indent}├── {path.name}\n")
                
                try:
                    content = path.read_text(encoding='utf-8')
                    prefix = f"{indent}  | "
                    f.write(f"{prefix}--- START: {rel_path} ---\n")
                    for line in content.splitlines():
                        f.write(f"{prefix}{line}\n")
                    f.write(f"{prefix}--- END ---\n\n")
                except Exception as e:
                    f.write(f"{indent}  | [Error reading file: {e}]\n")

    print(f"✅ Extraction complete! File saved as: {output_file}")

if __name__ == "__main__":
    scan_selected_folder()