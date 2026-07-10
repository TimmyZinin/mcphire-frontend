#!/usr/bin/env bash
# MCPHire — one-liner installer for Claude Desktop.
# Adds the mcphire MCP server entry to claude_desktop_config.json.
#
# Usage:
#   curl -fsSL https://mcphire.com/install.sh | bash
#
# The script detects macOS / Linux / Windows (via WSL or Git Bash) config paths
# and writes a minimal entry. If the file already contains an `mcphire` entry
# the script exits without changes. Requires `jq` for safe JSON merging; if
# jq is not available the script falls back to instructions-only mode.

set -euo pipefail

SERVER_NAME="mcphire"
SSE_URL="https://mcp.mcphire.com/mcp"

say() { printf "\033[1;36m[mcphire]\033[0m %s\n" "$*"; }
warn() { printf "\033[1;33m[mcphire]\033[0m %s\n" "$*" >&2; }
die() { printf "\033[1;31m[mcphire]\033[0m %s\n" "$*" >&2; exit 1; }

detect_config_path() {
  # macOS
  if [ "$(uname -s 2>/dev/null || true)" = "Darwin" ]; then
    echo "$HOME/Library/Application Support/Claude/claude_desktop_config.json"
    return
  fi
  # Windows (Git Bash / WSL)
  if [ -n "${APPDATA:-}" ]; then
    # APPDATA is set in Git Bash on Windows
    echo "$APPDATA/Claude/claude_desktop_config.json"
    return
  fi
  if [ -d "/mnt/c/Users" ]; then
    # WSL
    local winuser
    winuser="$(cmd.exe /c 'echo %USERNAME%' 2>/dev/null | tr -d '\r\n' || true)"
    if [ -n "$winuser" ] && [ -d "/mnt/c/Users/$winuser/AppData/Roaming/Claude" ]; then
      echo "/mnt/c/Users/$winuser/AppData/Roaming/Claude/claude_desktop_config.json"
      return
    fi
  fi
  # Linux (Claude Desktop has a Linux build)
  if [ -d "$HOME/.config/Claude" ]; then
    echo "$HOME/.config/Claude/claude_desktop_config.json"
    return
  fi
  # Fallback — print for the user
  echo ""
}

print_manual_snippet() {
  cat <<EOF

  Add this to your claude_desktop_config.json (create the file if missing):

  {
    "mcpServers": {
      "$SERVER_NAME": {
        "type": "http",
        "url": "$SSE_URL"
      }
    }
  }

  Then fully quit Claude Desktop (⌘Q on macOS, File → Quit on Windows) and
  reopen it. In a new chat ask "what tools do you have from mcphire?" —
  you should see 22 tools.

EOF
}

CONFIG="$(detect_config_path)"

if [ -z "$CONFIG" ]; then
  warn "Could not detect Claude Desktop config path automatically."
  print_manual_snippet
  exit 0
fi

say "Detected config: $CONFIG"

if [ -f "$CONFIG" ] && grep -q "\"$SERVER_NAME\"" "$CONFIG" 2>/dev/null; then
  say "mcphire entry already present — no changes."
  say "Restart Claude Desktop if you haven't already."
  exit 0
fi

if ! command -v jq >/dev/null 2>&1; then
  warn "jq not found — cannot safely merge JSON. Showing manual snippet:"
  print_manual_snippet
  exit 0
fi

mkdir -p "$(dirname "$CONFIG")"

if [ ! -f "$CONFIG" ]; then
  cat > "$CONFIG" <<EOF
{
  "mcpServers": {
    "$SERVER_NAME": {
      "type": "http",
      "url": "$SSE_URL"
    }
  }
}
EOF
  say "Wrote fresh config with mcphire entry."
else
  backup="$CONFIG.bak.$(date +%Y%m%d%H%M%S)"
  cp "$CONFIG" "$backup"
  say "Backup: $backup"
  tmp="$(mktemp)"
  jq --arg name "$SERVER_NAME" --arg url "$SSE_URL" \
    '.mcpServers = (.mcpServers // {}) | .mcpServers[$name] = {"type":"http","url":$url}' \
    "$CONFIG" > "$tmp"
  mv "$tmp" "$CONFIG"
  say "Merged mcphire entry into existing config."
fi

say "Done. Fully quit Claude Desktop (⌘Q on macOS / File → Quit on Windows) then reopen."
say "Verification: in a new chat ask 'what tools do you have from mcphire?' — expect 19."
