#!/bin/bash

# This script does the following:
# - Initializes a git repository if not present.
# - Creates a "solutions" directory to contain each day's directories.
# - Runs `bun init` to create a bun project in each day directory, silencing the output unless an error occurs.
# - Creates a base README in the root directory.
# - Creates a README for each day with Problem Statement and Solution sections.

solutions_dir="solutions"

if [ ! -d ".git" ]; then
    git init
fi

mkdir -p "${solutions_dir}"

# Base README
{
    echo "# Advent of Code 2023"
    echo
    echo
} > "README.md"

for day in {1..25}; do
    day_padded=$(printf "%02d" $day)
    day_dir="${solutions_dir}/${day_padded}"
    
    mkdir -p "${day_dir}"
    
    pushd "${day_dir}" > /dev/null
    output=$(printf "\n\n" | bun init 2>&1)
    if ! echo "$output" | grep -q "Done!"; then
        echo "Bun init failed for ${day_dir}:"
        echo "$output"
    fi
    popd > /dev/null

    {
        echo "# Day ${day_padded}"
        echo
        echo "## Problem Statement"
        echo
        echo "## Solution"
    } > "${day_dir}/README.md"
    
done

echo "Advent of Code solutions directory structure is set up."
