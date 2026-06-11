command -v pnpm >/dev/null 2>&1 || {
	echo "pnpm is required but was not found in PATH" >&2
	exit 1
}

pnpm install
