#!/bin/bash
# Demo Navigation Script - Previous Step
# This script moves to the previous step tag in your demo

# Get all step tags sorted naturally (step-1, step-2, ... step-10, etc.)
STEPS=($(git tag -l "step-*" | sort -V))

# Get current tag (if on a tagged commit)
CURRENT=$(git describe --tags --exact-match 2>/dev/null || echo "")

# Find current step index
CURRENT_INDEX=-1
for i in "${!STEPS[@]}"; do
  if [[ "${STEPS[$i]}" = "${CURRENT}" ]]; then
    CURRENT_INDEX=$i
    break
  fi
done

# If not on a tagged commit, warn user
if [ $CURRENT_INDEX -eq -1 ]; then
  echo "📍 Not on a step tag. Use 'Demo: Jump to Step' to go to a specific step."
  exit 1
fi

# Go to previous step
PREV_INDEX=$((CURRENT_INDEX - 1))
if [ $PREV_INDEX -ge 0 ]; then
  git checkout "${STEPS[$PREV_INDEX]}" 2>/dev/null
  if [ $? -eq 0 ]; then
    echo "✅ Moved to ${STEPS[$PREV_INDEX]} ($(($PREV_INDEX + 1))/${#STEPS[@]})"
  else
    echo "❌ Error: Could not checkout ${STEPS[$PREV_INDEX]}"
  fi
else
  echo "🎬 Already at the first step: ${CURRENT}"
fi
