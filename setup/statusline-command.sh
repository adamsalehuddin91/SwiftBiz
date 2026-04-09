#!/usr/bin/env bash
# Tokwi Status Line — Claude Code statusLine command
# Shows: companion name, context usage, rate limits, cwd

input=$(cat)

# Context usage
used_pct=$(echo "$input" | jq -r '.context_window.used_percentage // empty')
remaining_pct=$(echo "$input" | jq -r '.context_window.remaining_percentage // empty')

# Rate limits
five_pct=$(echo "$input" | jq -r '.rate_limits.five_hour.used_percentage // empty')
week_pct=$(echo "$input" | jq -r '.rate_limits.seven_day.used_percentage // empty')

# Current directory (basename)
cwd=$(echo "$input" | jq -r '.workspace.current_dir // .cwd // empty')
dir_label=""
if [ -n "$cwd" ]; then
  dir_label=" | $(basename "$cwd")"
fi

# Build context segment
ctx_segment=""
if [ -n "$used_pct" ] && [ -n "$remaining_pct" ]; then
  ctx_used=$(printf "%.0f" "$used_pct")
  ctx_rem=$(printf "%.0f" "$remaining_pct")
  ctx_segment=" | ctx ${ctx_used}% used (${ctx_rem}% left)"
elif [ -n "$used_pct" ]; then
  ctx_used=$(printf "%.0f" "$used_pct")
  ctx_segment=" | ctx ${ctx_used}%"
fi

# Build rate limit segment
rate_segment=""
if [ -n "$five_pct" ]; then
  five_fmt=$(printf "%.0f" "$five_pct")
  rate_segment=" | 5h: ${five_fmt}%"
fi
if [ -n "$week_pct" ]; then
  week_fmt=$(printf "%.0f" "$week_pct")
  rate_segment="${rate_segment} 7d: ${week_fmt}%"
fi

printf "\033[1;36mTokwi\033[0m%s%s%s" "$dir_label" "$ctx_segment" "$rate_segment"
