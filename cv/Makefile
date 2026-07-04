# Jingtian Ji — CV build
# ---------------------------------------------------------------------------
#   make            build cv.pdf
#   make publish    build, then copy to ../public/cv.pdf (the CV the site serves)
#   make watch      auto-rebuild on every save (Ctrl-C to stop)
#   make clean      remove LaTeX aux files (keeps cv.pdf)
#   make distclean  also remove cv.pdf
# ---------------------------------------------------------------------------
MAIN   = cv
PUBLIC = ../public/cv.pdf
LATEXMK = latexmk -pdf -halt-on-error -interaction=nonstopmode

.PHONY: all publish watch clean distclean

all: $(MAIN).pdf

$(MAIN).pdf: $(MAIN).tex
	$(LATEXMK) $(MAIN).tex

publish: all
	cp $(MAIN).pdf $(PUBLIC)
	@echo "→ published $(MAIN).pdf to $(PUBLIC)"

watch:
	latexmk -pdf -pvc $(MAIN).tex

clean:
	latexmk -c $(MAIN).tex
	rm -f $(MAIN).run.xml $(MAIN).bbl $(MAIN).blg

distclean: clean
	rm -f $(MAIN).pdf
