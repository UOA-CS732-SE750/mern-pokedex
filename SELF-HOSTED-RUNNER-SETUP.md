# Self-Hosted Runner Setup Guide

This guide walks you through setting up a GitHub Actions self-hosted runner on your VM for automatic deployments.

## 📋 Prerequisites

Before you begin, ensure:
- ✅ You have SSH access to your VM
- ✅ Your VM has Docker and Docker Compose installed
- ✅ Your repository is cloned on the VM at a known path
- ✅ You have admin access to the GitHub repository

## 🚀 Part 1: Add Self-Hosted Runner to GitHub

### Step 1: Navigate to Repository Settings

1. Go to your GitHub repository
2. Click **Settings** (top menu)
3. In the left sidebar, click **Actions** → **Runners**
4. Click the **New self-hosted runner** button

### Step 2: Select Your VM's Operating System

GitHub will show you a setup page. Select:
- **Runner image**: Choose your VM's OS (Linux, macOS, or Windows)
- **Architecture**: Usually `x64` (64-bit)

### Step 3: Note the Commands

GitHub will generate custom commands for your repository. They'll look something like:

```bash
# Download
mkdir actions-runner && cd actions-runner
curl -o actions-runner-linux-x64-2.316.0.tar.gz -L https://github.com/actions/runner/releases/download/v2.316.0/actions-runner-linux-x64-2.316.0.tar.gz
tar xzf ./actions-runner-linux-x64-2.316.0.tar.gz

# Configure
./config.sh --url https://github.com/YOUR-USERNAME/YOUR-REPO --token YOUR-TOKEN

# Run
./run.sh
```

**Important**: Keep this browser tab open - you'll need these commands in the next part!

## 🖥️ Part 2: Install Runner on Your VM

### Step 4: SSH into Your VM

```bash
ssh your-username@your-vm-address
```

### Step 5: Navigate to Your Project Directory

```bash
cd /path/to/your/project
# For example: cd ~/pokedex-app
```

**Important**: Install the runner in your project directory so it has access to `docker compose`.

### Step 6: Create Runner Directory

```bash
mkdir -p actions-runner && cd actions-runner
```

### Step 7: Download the Runner

Copy the download commands from GitHub (Step 3) and run them:

```bash
# Example - use YOUR actual commands from GitHub
curl -o actions-runner-linux-x64-2.316.0.tar.gz -L https://github.com/actions/runner/releases/download/v2.316.0/actions-runner-linux-x64-2.316.0.tar.gz
tar xzf ./actions-runner-linux-x64-2.316.0.tar.gz
```

### Step 8: Configure the Runner

Run the configuration command from GitHub:

```bash
# Example - use YOUR actual command from GitHub
./config.sh --url https://github.com/YOUR-USERNAME/YOUR-REPO --token YOUR-TOKEN
```

You'll be prompted with several questions:

1. **Enter the name of the runner group** → Press Enter (default)
2. **Enter the name of runner** → Give it a name like `production-vm` or `pokedex-server`
3. **Enter any additional labels** → Press Enter (default)
4. **Enter name of work folder** → Press Enter (default: `_work`)

You should see: ✅ **"Settings Saved."**

### Step 9: Test the Runner (Optional but Recommended)

Before installing as a service, test that it works:

```bash
./run.sh
```

You should see:
```
√ Connected to GitHub
√ Runner is running
```

Press `Ctrl+C` to stop it. Now let's install it as a service so it runs automatically.

## 🔧 Part 3: Install Runner as a Service

Running as a service ensures the runner:
- ✅ Starts automatically when the VM boots
- ✅ Restarts automatically if it crashes
- ✅ Runs in the background

### Step 10: Install the Service

```bash
sudo ./svc.sh install
```

### Step 11: Start the Service

```bash
sudo ./svc.sh start
```

### Step 12: Verify the Service is Running

```bash
sudo ./svc.sh status
```

You should see: **`Active: active (running)`**

### Step 13: Verify in GitHub

1. Go back to your GitHub repository
2. Navigate to **Settings** → **Actions** → **Runners**
3. You should see your runner listed with a **green dot** (status: Idle)

✅ **Success!** Your runner is now online and waiting for jobs.

## 🔐 Part 4: Configure Docker Permissions (Important!)

The GitHub Actions runner needs permission to execute Docker commands.

### Step 14: Add Runner User to Docker Group

First, find out which user the runner is running as:

```bash
sudo ./svc.sh status
```

Look for the user (usually your current user). Then add them to the docker group:

```bash
# Replace 'your-username' with the actual username
sudo usermod -aG docker your-username
```

### Step 15: Restart the Runner Service

```bash
sudo ./svc.sh stop
sudo ./svc.sh start
```

### Step 16: Test Docker Access

```bash
docker ps
```

You should see your running containers (or an empty list if none are running).

## 📂 Part 5: Configure Working Directory

The runner needs to execute Docker Compose commands in your project directory.

### Step 17: Update the Workflow (Already Done!)

The workflow file `.github/workflows/deploy.yml` is already configured to:
1. Checkout code (into the runner's work directory)
2. Pull latest changes
3. Run `docker compose down`
4. Run `docker compose up --build -d`

### Step 18: Ensure Repository is Cloned on VM

The runner executes workflows in a temporary work directory, but for Docker Compose to work, we need the repository accessible. The workflow uses `git pull`, so ensure:

```bash
cd /path/to/your/project/root
# Check you're in the right place
ls -la docker-compose.yml
```

If the repo isn't cloned yet:

```bash
cd /path/where/you/want/it
git clone https://github.com/YOUR-USERNAME/YOUR-REPO.git
cd YOUR-REPO
```

**Note**: The workflow's `git pull` assumes the runner is executing from within a git repository. You may need to adjust the workflow depending on your setup.

## 🧪 Part 6: Test the Deployment

### Step 19: Trigger a Deployment

Make a small change to your repository and push to main:

```bash
# On your local machine
echo "# Test" >> README.md
git add README.md
git commit -m "Test deployment workflow"
git push origin main
```

### Step 20: Monitor the Workflow

1. Go to your GitHub repository
2. Click the **Actions** tab
3. You should see the "Deploy to Production" workflow running
4. Click on it to see real-time logs

### Step 21: Verify on Your VM

SSH into your VM and check:

```bash
docker compose ps
```

You should see your containers running with the latest build.

## 🛠️ Troubleshooting

### Runner Shows Offline
```bash
# Check service status
sudo ./svc.sh status

# View logs
sudo journalctl -u actions.runner.* -f
```

### Docker Permission Denied
```bash
# Ensure user is in docker group
groups your-username

# If 'docker' isn't listed, add it
sudo usermod -aG docker your-username

# Restart runner
sudo ./svc.sh stop
sudo ./svc.sh start

# Log out and back in (or restart)
```

### Workflow Fails on Git Pull
The workflow runs in the runner's work directory. Consider modifying the workflow to:
- Clone fresh each time, or
- Navigate to your project directory before running docker commands

See "Alternative Workflow" section below.

### Port Already in Use
```bash
# Stop existing containers first
docker compose down

# Then the workflow will work
```

## 🔄 Maintenance

### Updating the Runner

GitHub automatically updates the runner application, but if you need to manually update:

```bash
cd /path/to/actions-runner
sudo ./svc.sh stop
# Download new version and extract
sudo ./svc.sh start
```

### Removing the Runner

If you need to remove the runner:

```bash
cd /path/to/actions-runner
sudo ./svc.sh stop
sudo ./svc.sh uninstall
./config.sh remove --token YOUR-REMOVAL-TOKEN
```

Get the removal token from: **Settings** → **Actions** → **Runners** → Click your runner → **Remove**

## 📝 Alternative Workflow Configuration

If you prefer the workflow to navigate to your project directory instead of relying on the checkout:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    name: Deploy Application
    runs-on: self-hosted
    environment:
      name: production
    
    steps:
      - name: Navigate to project directory
        working-directory: /absolute/path/to/your/project
        run: pwd

      - name: Pull latest changes
        working-directory: /absolute/path/to/your/project
        run: git pull origin main

      - name: Stop running containers
        working-directory: /absolute/path/to/your/project
        run: docker compose down

      - name: Rebuild and start containers
        working-directory: /absolute/path/to/your/project
        run: docker compose up --build -d

      - name: Verify deployment
        working-directory: /absolute/path/to/your/project
        run: docker compose ps
```

## ✅ Summary

You now have:
- ✅ A self-hosted runner installed on your VM
- ✅ The runner running as a service (auto-starts on boot)
- ✅ Docker permissions configured
- ✅ Automatic deployments on push to main

Every time you merge a PR to `main`:
1. 🧪 Tests run and pass (from your PR workflows)
2. ✅ PR is merged
3. 🚀 Deployment workflow triggers
4. 📦 Runner pulls latest code
5. 🔄 Containers are rebuilt and restarted
6. ✨ Your app is live with the latest changes!

## 🆘 Need Help?

- [GitHub Actions Self-Hosted Runner Docs](https://docs.github.com/en/actions/hosting-your-own-runners)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- Check workflow logs in the **Actions** tab of your repository
