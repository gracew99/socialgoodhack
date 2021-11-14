import spacy
import sys
# print('hi')
nlp = spacy.load('en_core_web_lg')
doc = nlp(sys.argv[1])
print(doc.ents)
# print(sys.argv[1])