#!/bin/zsh
export PATH="/opt/homebrew/opt/node@24/bin:$PATH"
export NODE_PATH="$(pwd)/node_modules"
exec npx expo start "$@"
