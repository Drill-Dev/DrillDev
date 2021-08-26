#!/bin/sh

echo "[include]\n  path = ../.gitalias" > "$(dirname "$0")/../.git/config
