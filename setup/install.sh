#!/usr/bin/env bash
# Tokwi Setup — Install Claude Code config on any Windows PC
# Run this once per PC: bash setup/install.sh

set -e

# ── Detect current Windows username ──────────────────────────────────────────
# Try multiple methods — works on Git Bash, WSL, MSYS2
WIN_USER=$(powershell.exe -NoProfile -Command "[Environment]::UserName" 2>/dev/null | tr -d '\r\n')

if [ -z "$WIN_USER" ]; then
  WIN_USER=$(whoami 2>/dev/null | sed 's/.*\\\\//' | tr -d '\r\n')
fi

if [ -z "$WIN_USER" ]; then
  WIN_USER="$USER"
fi

if [ -z "$WIN_USER" ]; then
  echo "❌ Could not detect Windows username. Run this from Git Bash or WSL."
  exit 1
fi

CLAUDE_DIR="/c/Users/$WIN_USER/.claude"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo ""
echo "  ████████╗ ██████╗ ██╗  ██╗██╗    ██╗██╗"
echo "     ██╔══╝██╔═══██╗██║ ██╔╝██║    ██║██║"
echo "     ██║   ██║   ██║█████╔╝ ██║ █╗ ██║██║"
echo "     ██║   ██║   ██║██╔═██╗ ██║███╗██║██║"
echo "     ██║   ╚██████╔╝██║  ██╗╚███╔███╔╝██║"
echo "     ╚═╝    ╚═════╝ ╚═╝  ╚═╝ ╚══╝╚══╝ ╚═╝"
echo ""
echo "  Tokwi Setup — Claude Code Config Installer"
echo "  ─────────────────────────────────────────"
echo "  PC User   : $WIN_USER"
echo "  Target    : $CLAUDE_DIR"
echo "  Source    : $SCRIPT_DIR"
echo ""

# ── Create .claude dir if not exists ─────────────────────────────────────────
mkdir -p "$CLAUDE_DIR"

# ── Copy statusline script ────────────────────────────────────────────────────
echo "  [1/3] Copying statusline-command.sh..."
cp "$SCRIPT_DIR/statusline-command.sh" "$CLAUDE_DIR/statusline-command.sh"
chmod +x "$CLAUDE_DIR/statusline-command.sh"
echo "        ✅ Done"

# ── Generate settings.json with correct username ─────────────────────────────
echo "  [2/3] Writing settings.json..."

SETTINGS_FILE="$CLAUDE_DIR/settings.json"

# Backup existing if present
if [ -f "$SETTINGS_FILE" ]; then
  cp "$SETTINGS_FILE" "$SETTINGS_FILE.bak"
  echo "        ℹ️  Backed up existing settings to settings.json.bak"
fi

# Write settings directly (no jq needed)
cat > "$SETTINGS_FILE" <<EOF
{
  "alwaysThinkingEnabled": true,
  "statusLine": {
    "type": "command",
    "command": "bash C:/Users/$WIN_USER/.claude/statusline-command.sh"
  }
}
EOF

echo "        ✅ Done"

# ── Add tokwi alias to ~/.bashrc ─────────────────────────────────────────────
echo "  [3/4] Adding 'tokwi' alias..."
BASHRC="$HOME/.bashrc"
if ! grep -q "alias tokwi=" "$BASHRC" 2>/dev/null; then
  echo "" >> "$BASHRC"
  echo "# Tokwi alias" >> "$BASHRC"
  echo "alias tokwi='claude'" >> "$BASHRC"
  echo "        ✅ Alias added — run: source ~/.bashrc"
else
  echo "        ℹ️  Alias already exists, skipped"
fi

# ── Verify ────────────────────────────────────────────────────────────────────
echo "  [4/4] Verifying install..."
if [ -f "$CLAUDE_DIR/statusline-command.sh" ] && [ -f "$CLAUDE_DIR/settings.json" ]; then
  echo "        ✅ All files in place"
else
  echo "        ❌ Something went wrong. Check $CLAUDE_DIR"
  exit 1
fi

echo ""
echo "  ─────────────────────────────────────────"
echo "  ✅ Tokwi installed successfully!"
echo ""
echo "  Next: Restart Claude Code"
echo "  Status line will show:"
echo "  \033[1;36mTokwi\033[0m | <project> | ctx X% used (Y% left)"
echo ""
