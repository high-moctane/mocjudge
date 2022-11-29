.PHONY: all
all:
	$(MAKE) .git/hooks/pre-commit

.git/hooks/pre-commit: scripts/pre-commit
	cp -f scripts/pre-commit .git/hooks/
