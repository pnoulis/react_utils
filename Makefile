#!/usr/bin/make

# Make and Shell behavior
SHELL = /usr/bin/bash
.DELETE_ON_ERROR:
.ONESHELL:
.EXPORT_ALL_VARIABLES:
.DEFAULT_GOAL := all

# Build directories
srcdir := .
buildir := $(srcdir)/build
distdir := $(srcdir)/dist

# Programs and their configuration
node = node
vite = $(srcdir)/node_modules/.bin/vite

all: build

build:
	$(vite) build --mode production

clean:
	rm -rf node_modules
	rm -f package-lock.json
	rm -rf $(distdir)

.PHONY: all
.PHONY: build
