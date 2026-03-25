#!/bin/bash

# Script to cherry-pick a commit from main to all other branches
# and push the changes to origin

COMMIT="b81c0a1"
CURRENT_BRANCH=$(git branch --show-current)

echo "🍒 Starting cherry-pick process for commit: $COMMIT"
echo "================================================"
echo ""

# Get all local branches except main
BRANCHES=$(git branch | grep -v "main" | sed 's/^[ *]*//')

for branch in $BRANCHES; do
  echo "📝 Processing branch: $branch"
  
  # Checkout the branch
  git checkout "$branch"
  
  # Cherry-pick the commit
  git cherry-pick "$COMMIT"
  
  # Push to origin
  git push origin "$branch"
  
  echo "✅ Successfully cherry-picked and pushed to $branch"
  echo ""
done

# Return to the original branch
echo "🔙 Returning to $CURRENT_BRANCH"
git checkout "$CURRENT_BRANCH"

echo ""
echo "================================================"
echo "✨ Done! Commit $COMMIT has been applied to all branches."
