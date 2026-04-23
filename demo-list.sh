#!/bin/bash
# Demo Navigation Script - List All Steps
# This script shows all available demo steps

echo "📚 Available Demo Steps:"
echo "======================="

STEPS=($(git tag -l "step-*" | sort -V))
CURRENT=$(git describe --tags --exact-match 2>/dev/null || echo "")

for i in "${!STEPS[@]}"; do
  STEP="${STEPS[$i]}"
  # Get commit message for this tag
  MESSAGE=$(git log -1 --pretty=%B "${STEP}" | head -n 1)
  
  # Mark current step
  if [[ "${STEP}" = "${CURRENT}" ]]; then
    echo "👉 $((i + 1)). ${STEP} - ${MESSAGE}"
  else
    echo "   $((i + 1)). ${STEP} - ${MESSAGE}"
  fi
done

echo ""
echo "Total: ${#STEPS[@]} steps"

if [[ -n "${CURRENT}" ]]; then
  echo "Current: ${CURRENT}"
else
  echo "Current: Not on a step tag"
fi
