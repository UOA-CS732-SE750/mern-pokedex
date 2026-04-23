# Demo Navigation Setup

This project includes tools for navigating between demo steps during live coding presentations.

## 📋 How It Works

Each demo step is marked with a Git tag (e.g., `step-1`, `step-2`, `step-3`). You can navigate between these steps using VS Code tasks or keyboard shortcuts.

## 🎯 Creating Demo Steps (Before Your Lecture)

1. Work on your code for step 1
2. Commit and tag it:
   ```bash
   git add .
   git commit -m "Step 1: Setup project"
   git tag step-1
   ```
3. Repeat for each demo step:
   ```bash
   git add .
   git commit -m "Step 2: Add components"
   git tag step-2
   
   git add .
   git commit -m "Step 3: Add tests"
   git tag step-3
   ```
4. Push your tags to backup:
   ```bash
   git push origin --tags
   ```

## ⌨️ Keyboard Shortcuts (During Your Lecture)

- **`Cmd+Shift+→`** - Go to next step
- **`Cmd+Shift+←`** - Go to previous step
- **`Cmd+Shift+L`** - List all available steps
- **`Cmd+Shift+H`** - Return to main branch

> Note: On Windows/Linux, use `Ctrl` instead of `Cmd`

## 🖱️ Using the Command Palette

1. Press `Cmd+Shift+P` (or `Ctrl+Shift+P`)
2. Type "Run Task"
3. Select from available demo tasks:
   - ▶️ Demo: Next Step
   - ◀️ Demo: Previous Step
   - 📚 Demo: List All Steps
   - 🎯 Demo: Jump to Step
   - 🏠 Demo: Reset to Main
   - 🎬 Demo: Start from Beginning

## 🔧 Manual Script Usage

You can also run the scripts directly in the terminal:

```bash
# Navigate forward/backward
./demo-next.sh
./demo-prev.sh

# View all steps
./demo-list.sh
```

## 📝 Best Practices

1. **Test your demo flow** - Run through all steps before your lecture
2. **Keep steps atomic** - Each step should be complete and working
3. **Use descriptive commit messages** - They appear when listing steps
4. **Start clean** - Begin your demo with `git checkout step-1`
5. **Have a backup** - Keep tags pushed to a remote repository

## 🐛 Troubleshooting

**Problem:** "Not on a step tag" message
- **Solution:** Run "Demo: Start from Beginning" or "Demo: Jump to Step"

**Problem:** Scripts not executable
- **Solution:** Run `chmod +x demo-*.sh`

**Problem:** No steps showing
- **Solution:** Create tags with the pattern `step-1`, `step-2`, etc.

## 📂 Files Created

- `demo-next.sh` - Navigate to next step
- `demo-prev.sh` - Navigate to previous step
- `demo-list.sh` - Show all available steps
- `.vscode/tasks.json` - VS Code task definitions
- `.vscode/keybindings.json` - Keyboard shortcut mappings

## 🎓 Example Workflow

Before lecture:
```bash
# Create your demo steps
git tag step-1
git tag step-2
git tag step-3
git push origin --tags
```

During lecture:
```bash
# Start at the beginning
git checkout step-1

# Then use keyboard shortcuts or tasks to navigate:
# Cmd+Shift+→ (next)
# Cmd+Shift+← (previous)
# Cmd+Shift+L (list all)
```

After lecture:
```bash
# Return to main branch
git checkout main
```

---

Happy teaching! 🎉
