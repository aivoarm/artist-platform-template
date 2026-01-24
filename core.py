import os

# Configuration: What to skip and what to read
EXCLUDE = {'.git', 'node_modules', '__pycache__', '.next', '.env', 'package-lock.json'}
EXTENSIONS = ('.js', '.ts', '.tsx', '.py', '.json', '.md', '.css')

def extract_project(path, output_file="core_code_structure.txt"):
    with open(output_file, 'w', encoding='utf-8') as out:
        for root, dirs, files in os.walk(path):
            # Filter directories and files
            dirs[:] = [d for d in dirs if d not in EXCLUDE]
            files = [f for f in files if f not in EXCLUDE]

            # Calculate indentation and print directory
            rel_path = os.path.relpath(root, path)
            indent = "  " * (0 if rel_path == "." else rel_path.count(os.sep) + 1)
            out.write(f"\n{indent}[DIR] {os.path.basename(root)}/\n")

            for file in files:
                out.write(f"{indent}  ├── {file}\n")
                
                # Only extract content if it matches extensions
                if file.lower().endswith(EXTENSIONS):
                    file_path = os.path.join(root, file)
                    try:
                        with open(file_path, 'r', encoding='utf-8') as f:
                            content = f.read()
                            # Indent file content for readability
                            prefix = f"{indent}  | "
                            out.write(f"{prefix}--- START ---\n")
                            out.write("".join([f"{prefix}{line}\n" for line in content.splitlines()]))
                            out.write(f"{prefix}--- END ---\n")
                    except Exception as e:
                        out.write(f"{indent}  | [ERROR: {e}]\n")

if __name__ == "__main__":
    import sys
    target = sys.argv[1] if len(sys.argv) > 1 else "."
    extract_project(target)
    print(f"Extraction complete for: {target}")