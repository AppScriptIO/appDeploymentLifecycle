#!/bin/bash
# IMPORTANT: Icons Doesn't Work as expected.

# uses Percent encoding for URIs for unicode icons.
# printf '%80s\n' | tr ' ' -
# Will print gibrish like a net.

# create padding 
message="$(printf '%20s-SZN-%20s' | tr ' ' $'#')";
printf '%15s' | tr ' ' $' ';
printf '\e[1;33m%-6s\e[m' "$message"; printf '\n';

# # ⭐ star : 
# printf '%80s\n' | tr ' ' $(echo -e '\xE2\x98\x85')
# echo -e '\xE2\x98\x85'