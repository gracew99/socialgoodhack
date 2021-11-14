# import spacy
import sys
from keybert import KeyBERT

kw_model = KeyBERT()
keywords = kw_model.extract_keywords(sys.argv[1])
print(keywords[0])
# print('hi')
# from rake_nltk import Rake
# r = Rake()
# r.extract_keywords_from_text(sys.argv[1])
# arr = r.get_ranked_phrases()
# if (len(arr[0].split(" ")) >= 2):
#     if (len(arr[1].split(" ")) >= 2):
#         print(arr[0].split(" ")[0] + " " + arr[0].split(" ")[1] + ", " + arr[1].split(" ")[0] + " " + arr[1].split(" ")[1])
#     else:
#         print(arr[0].split(" ")[0] + " " + arr[0].split(" ")[1] + ", " + arr[1])
# else:
#     if (len(arr[1].split(" ")) >= 2):
#         print(arr[0] + ", " + arr[1].split(" ")[0] + " " + arr[1].split(" ")[1])
#     else:
#         print(arr[0] + " " + arr[1].split(" ")[0])
# nlp = spacy.load('en_core_web_lg')
# doc = nlp(sys.argv[1])
# print(doc.ents)
# print(sys.argv[1])