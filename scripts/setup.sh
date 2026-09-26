#!/usr/bin/env bash
# OmniDev Local Setup and Quick Start Script
set -e

echo "⚡ Setting up OmniDev..."

if command -v python3 &>/dev/null; then
    echo "✓ Python 3 detected. Testing OmniDev CLI..."
    python3 python/omnidev.py list-prompts
elif command -v python &>/dev/null; then
    echo "✓ Python detected. Testing OmniDev CLI..."
    python python/omnidev.py list-prompts
else
    echo "ℹ Python not found. You can still open index.html directly in any browser."
fi

echo "🚀 To launch the web dashboard, open index.html in your browser or run:"
echo "   python3 -m http.server 3000"
