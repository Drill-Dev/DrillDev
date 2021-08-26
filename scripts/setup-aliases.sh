#!/bin/sh

echo "[include]\n  path = ../.gitalias" >> $(dirname "$0")/../.git/config
echo "[include]\n  path = ../.gitalias" >> $(dirname "$0")/../.git/modules/backend/config
