#!/usr/bin/env python3
"""
Fixes for Sauerteig-Love:
- repair mojibake in JS files (Ã¼ -> ü, Â· -> ·, â™¥ -> ♥, ...)
- load pet-fixes.css so the sourdough pets render instead of the old blue pet
- replace old codex pet IDs in app.js with the three sourdough pets
- make pet migration robust for stale localStorage values
- bump the service worker cache name so browsers pick up the new files

Run from the repository root:
    python3 apply_sauerteig_fixes.py
"""

from __future__ import annotations

import re
from pathlib import Path


ROOT = Path.cwd()


def read(path: str) -> str:
    return (ROOT / path).read_text(encoding="utf-8")


def write(path: str, text: str) -> None:
    (ROOT / path).write_text(text, encoding="utf-8")


def repair_mojibake(text: str) -> str:
    """Repair text that was UTF-8 but got decoded as Windows-1252."""
    if not any(marker in text for marker in ("Ã", "Â", "â", "Å")):
        return text

    try:
        return text.encode("cp1252").decode("utf-8")
    except UnicodeError:
        # Conservative fallback for the characters used in this project.
        replacements = {
            "Ã¤": "ä",
            "Ã¶": "ö",
            "Ã¼": "ü",
            "Ã„": "Ä",
            "Ã–": "Ö",
            "Ãœ": "Ü",
            "ÃŸ": "ß",
            "Ã©": "é",
            "Ã­": "í",
            "Ã¡": "á",
            "Ã³": "ó",
            "Ã ": "à",
            "ÅŸ": "ş",
            "Â·": "·",
            "Â°": "°",
            "â–¶": "▶",
            "â™¥": "♥",
            "â—·": "◷",
            "â€“": "–",
            "â€”": "—",
            "â€œ": "“",
            "â€": "”",
            "â€˜": "‘",
            "â€™": "’",
        }
        for wrong, right in replacements.items():
            text = text.replace(wrong, right)
        return text


def fix_index_html() -> None:
    path = "index.html"
    text = read(path)

    if 'href="pet-fixes.css"' not in text:
        text = text.replace(
            '    <link rel="stylesheet" href="overrides.css" />\n'
            '    <script src="customizations.js"></script>',
            '    <link rel="stylesheet" href="overrides.css" />\n'
            '    <link rel="stylesheet" href="pet-fixes.css" />\n'
            '    <script src="customizations.js"></script>',
        )

    write(path, text)


def fix_app_js() -> None:
    path = "app.js"
    text = repair_mojibake(read(path))

    new_pets = """const PETS = [
  { id: "sourdough-crumb", name: "Brösel", label: "Weicher Teigfreund" },
  { id: "sourdough-rye", name: "Krusti", label: "Roggenlaib" },
  { id: "sourdough-starter", name: "Blubbi", label: "Starterkern" },
];"""

    text = re.sub(
        r"const PETS = \[\n.*?\n\];\n\nconst STATUS_META",
        new_pets + "\n\nconst STATUS_META",
        text,
        count=1,
        flags=re.S,
    )

    text = text.replace('petId: "codex-blue",', 'petId: "sourdough-crumb",')

    old_load_state = """function loadState() {
  try {
    return { ...DEFAULT_STATE, ...JSON.parse(localStorage.getItem(STORE_KEY) || "{}") };
  } catch {
    return { ...DEFAULT_STATE };
  }
}"""

    new_load_state = """function loadState() {
  try {
    const loaded = { ...DEFAULT_STATE, ...JSON.parse(localStorage.getItem(STORE_KEY) || "{}") };
    if (!PETS.some((pet) => pet.id === loaded.petId)) {
      loaded.petId = DEFAULT_STATE.petId;
    }
    return loaded;
  } catch {
    return { ...DEFAULT_STATE };
  }
}"""

    if old_load_state in text:
        text = text.replace(old_load_state, new_load_state)

    write(path, text)


def fix_customizations_js() -> None:
    path = "customizations.js"
    text = repair_mojibake(read(path))

    text = text.replace(
        '{ id: "sourdough-crumb", name: "Broesel", label: "Weicher Teigfreund", className: "custom-pet-crumb" }',
        '{ id: "sourdough-crumb", name: "Brösel", label: "Weicher Teigfreund", className: "custom-pet-crumb" }',
    )
    text = text.replace("ausgewaehlt", "ausgewählt")

    old_migrate = """function migrateState() {
    const state = readState();
    if (!state.petId || LEGACY_PETS.includes(state.petId)) {
      writeState({ petId: PETS[0].id });
    }
  }"""

    new_migrate = """function migrateState() {
    const state = readState();
    if (!state.petId || LEGACY_PETS.includes(state.petId) || !PETS.some((pet) => pet.id === state.petId)) {
      writeState({ petId: PETS[0].id });
    }
  }"""

    if old_migrate in text:
        text = text.replace(old_migrate, new_migrate)

    write(path, text)


def fix_sw_js() -> None:
    path = "sw.js"
    text = read(path)

    match = re.search(r'const CACHE_NAME = "sauerteig-love-v(\d+)";', text)
    if match:
        next_version = int(match.group(1)) + 1
        text = re.sub(
            r'const CACHE_NAME = "sauerteig-love-v\d+";',
            f'const CACHE_NAME = "sauerteig-love-v{next_version}";',
            text,
            count=1,
        )

    write(path, text)


def main() -> None:
    required = ["index.html", "app.js", "customizations.js", "sw.js", "pet-fixes.css"]
    missing = [name for name in required if not (ROOT / name).exists()]
    if missing:
        raise SystemExit(f"Missing files in {ROOT}: {', '.join(missing)}")

    fix_index_html()
    fix_app_js()
    fix_customizations_js()
    fix_sw_js()

    print("Done. Please review with:")
    print("  git diff -- index.html app.js customizations.js sw.js")
    print("Then test with a hard reload / service worker unregister if needed.")


if __name__ == "__main__":
    main()
