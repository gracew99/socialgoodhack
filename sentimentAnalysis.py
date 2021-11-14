import nltk
import sys
# nltk.download('vader_lexicon')
from nltk.sentiment.vader import SentimentIntensityAnalyzer

sid = SentimentIntensityAnalyzer()
scores = sid.polarity_scores(sys.argv[1])
print(scores['pos'])