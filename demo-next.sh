#!/bin/bash
# Demo Navigation Script - Next Step
# This script moves to the next step tag in your demo

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

# If not on a tagged commit, start from the beginning
if [ $CURRENT_INDEX -eq -1 ]; then
  echo "📍 Not on a step tag. Starting from step-1..."
  git checkout "${STEPS[0]}" 2>/dev/null
  if [ $? -eq 0 ]; then
    echo "✅ Moved to ${STEPS[0]}"
  else
    echo "❌ Error: Could not checkout ${STEPS[0]}"
  fi
  exit 0
fi

# Go to next step
NEXT_INDEX=$((CURRENT_INDEX + 1))
if [ $NEXT_INDEX -lt ${#STEPS[@]} ]; then
  git checkout "${STEPS[$NEXT_INDEX]}" 2>/dev/null
  if [ $? -eq 0 ]; then
    echo "✅ Moved to ${STEPS[$NEXT_INDEX]} ($(($NEXT_INDEX + 1))/${#STEPS[@]})"
  else
    echo "❌ Error: Could not checkout ${STEPS[$NEXT_INDEX]}"
  fi
else
  echo "🏁 Already at the last step: ${CURRENT}"
  echo "   Run 'Demo: Reset to Latest' to return to main branch"
fi
