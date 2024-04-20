//  include the Keyword Extractor
const keyword_extractor = require("keyword-extractor");

//  Opening sentence to NY Times Article at
/*
http://www.nytimes.com/2013/09/10/world/middleeast/
surprise-russian-proposal-catches-obama-between-putin-and-house-republicans.html
*/
const sentence =`Dong's Lab
front page
ITX
Login | Register
Scan code to log in
Open WeChat, click [+] in the upper right corner of the homepage, select [Scan]

Refresh QR code
How to extract keywords? Introduce how to use jieba in node.
#Node.js
Last edit: 2021-04-14
Recently, I want to add an automatic keyword extraction function to the articles and Q&A sections of the site.

There is already a keyword table in the database, which contains a batch of commonly used keywords. The structure is as follows:

  {
    "id": "design_pattern",
    "name" : "Design Pattern",
    "otherName" : ["Design pattern"],
    "fathers" : []
  },
  {
    "id": "create_pattern",
    "name" : "Creative Mode",
    "otherName" : [],
    "fathers" : ["design_pattern"]
  },
  {
    "id": "struct_pattern",
    "name" : "Structural Schema",
    "otherName" : [],
    "fathers" : ["design_pattern"]
  },
  {
    "id": "behavior_pattern",
    "name" : "Behavior Mode",
    "otherName" : [],
    "fathers" : ["design_pattern"]
  },
  {
    "id": "factory_method",
    "name" : "Factory Method Pattern",
    "otherName" : ["Factory Method", "Virtual Constructor", "Virtual Constructor"],
    "fathers" : ["design_pattern", "create_pattern"]
  },
  {
    "id": "abstract_factory",
    "name" : "Abstract Factory Pattern",
    "otherName" : ["Abstract Factory"],
    "fathers" : ["design_pattern", "create_pattern"]
  },
  // ...
The main implementation ideas are as follows:

According to the word segmentation tool, break up the content of the article, a bit like a big explosion of a hammer,
Then calculate the most important phrases according to the frequency of the words,
Finally, the phrase is matched in the keywords database, and if the match is successful, it will be automatically associated
First of all, the big bang function reminded me of the jieba library, the github address. At that time, I was familiar with this mainly because of the good name, Chinese: stutter, 233, and it was lingering in the brain after one ear.

After a simple search, there is indeed an implementation version of node: nodejieba

Introduction to jieba
The main version of the project is a Chinese word segmentation framework provided by Python components. As we all know, Python is widely used. However, whether it is front-end or back-end, this word segmentation component is very helpful in data analysis, crawler, keyword processing in search engines, etc.

Features of stammering participles:

Support traditional word segmentation
Support custom dictionary
MIT License
Support 4 word segmentation modes
4 word segmentation modes:
a. Precise mode, try to cut the sentence most accurately, suitable for text analysis; b. Full mode, scan all the words in the sentence that can be turned into words, very fast, but cannot resolve ambiguity; c. Search engine mode , On the basis of the precise mode, the long words are segmented again to improve the recall rate, which is suitable for word segmentation in search engines. d. The paddle mode uses the Paddle deep learning framework to train the sequence labeling (bidirectional GRU) network model to achieve word segmentation. Also supports part-of-speech tagging. To use paddle mode, you need to install paddlepaddle-tiny, pip install paddlepaddle-tiny==1.6.1. Currently paddle mode supports jieba v0.40 and above.

nodejieba
When I wrote this article, nodejieba was in the v2.5.1 version. First, I briefly looked at the README.md and package.json of the library, which contained this:

"engines": {
  "node": ">= 10.20.0"
},
After all, it is a transplanted project, so it is recommended that the node version be upgraded to 10.20.0 or above, otherwise there will be some inexplicable errors.

The official website documentation is not very detailed, but briefly summarizes the commonly used methods.

load

//The load parameters are optional, and if there is no corresponding item, the default parameters are automatically filled.

nodejieba.load({
 dict: nodejieba.DEFAULT_DICT,
  hmmDict: nodejieba.DEFAULT_HMM_DICT,
  userDict: __dirname + '/testdata/userdict.utf8',
  idfDict: nodejieba.DEFAULT_IDF_DICT,
  stopWordDict: nodejieba.DEFAULT_STOP_WORD_DICT,
});

// Use userDict to load custom dictionaries
nodejieba.load({
  userDict: __dirname + '/testdata/userdict.utf8',
});

result = nodejieba.cut('Anthracia dials Qingbo')
console.log(result);

use

var sentence = "I'm a walk-behind tractor major at the Tractor Academy. It won't be long before I get a promotion and a raise, become a CEO, and reach the pinnacle of my life.";

var result;

// When nodejieba.load is not actively called to load the dictionary,
// The default dictionary is automatically loaded when cut or other functions that require a dictionary are called for the first time.
// The dictionary will only be loaded once.

// basic participle
result = nodejieba.cut(sentence);
console.log(result);

result = nodejieba.cut(sentence, true);
console.log(result);

result = nodejieba.cutHMM(sentence);
console.log(result);

result = nodejieba.cutAll(sentence);
console.log(result);

result = nodejieba.cutForSearch(sentence);
console.log(result);

result = nodejieba.tag(sentence);
console.log(result);

// Return the topN most important words by word
// The return value format is: { word: string, weight: number }
var topN = 5;
result = nodejieba.extract(sentence, topN);
console.log(result);

result = nodejieba.cut("Male silent and female tears");
console.log(result);

// Insert custom words into the dictionary before word segmentation
nodejieba.insertWord("Male silent and female tears");
result = nodejieba.cut("Male silent and female tears");
console.log(result);

result = nodejieba.cutSmall("Nanjing Yangtze River Bridge", 3);
console.log(result);

custom dictionary format
The good thing about jieba is that you can flexibly insert custom dictionaries, such as the keyword list at the beginning of the article, which can be automatically generated as a dictionary. The custom dictionary txt file format currently only supports utf-8, the specific format is as follows:

Keyword Weight Part of Speech
Keyword Weight Part of Speech

// For example:

Hybrid development 999 n
Weex 9999 n
Flutter 9999 n
Mini Program 9999 n
React Native 9999 n
RN 999 n
jsBridge 9999 n
Native two-way communication 999 n
Angular 9999 n
SSR 9999 n
Server-side rendering 999 n
Server-Side Rendering 999 n
Eslint 9999 n
The part of speech uses the ICTCLAS standard, and the specific types are as follows:

Code Name Interpretation to help memory
Ag form morpheme Adjective morpheme. The adjective code is a, and the morpheme code g is preceded by an A.
a Adjective Take the first letter of the English adjective adjective.
ad adverb Adjective that is directly used as an adverbial. The adjective code a and the adverb code d are combined.
an noun An adjective that functions as a noun. The adjective code a and the noun code n are combined.
b Distinguishing words Take the initials of the Chinese character "bie".
c Conjunction Take the first letter of the English conjunction conjunction.
Dg Adverbial morpheme Adverbial morpheme. The adverb code is d, and the morpheme code g is preceded by a D.
d Adverb Take the 2nd letter of adverb because the 1st letter is already used for an adjective.
e Interjection Take the first letter of the English interjection exclamation.
f Orientation word Take the initial consonant of the Chinese character "fang".
g morpheme Most morphemes can be used as the "root" of compound words, taking the initial consonant of the Chinese character "root".
h Prefix component Take the first letter of the English head.
i idiom Take the first letter of the English idiom idiom.
j Abbreviations Take the initials of the Chinese character "Jian".
k trailing component
l Idioms Idioms have not yet become idioms, and they are somewhat "temporary", so take the initials of "pro".
m Numerals Take the third letter of English numeral, n and u have been used for other purposes.
Ng Noun morpheme Noun morpheme. The noun code is n, and the morpheme code g is preceded by N.
n Noun Take the first letter of the English noun noun.
nr person's name The noun code n is combined with the initials of "person (ren)".
ns place name noun code n and place word code s together.
nt Institutional group "Tuan" has an initial t, and the noun codes n and t are combined.
nz The first letter of the initials of other proper names "special" is z, and the noun codes n and z are combined together.
o Onomatopoeia Take the first letter of the English onomatopoeia onomatopoeia.
p Preposition Take the first letter of the English prepositional.
q Quantifier Take the first letter of English quantity.
r Pronoun Takes the second letter of the English pronoun pronoun, because p has been used for prepositions.
s Place word Take the first letter of English space.
Tg time morpheme Time part of speech morpheme. The time word code is t, and T is preceded by the code g of the morpheme.
t Time word Take the first letter of English time.
u Auxiliary word Take the second letter of the English auxiliary word auxiliary, because a has been used for adjectives.
Vg Verb morpheme Verb morpheme. The verb code is v. The morpheme code g is preceded by a V.
v verb Take the first letter of the English verb verb.
vd Adverb Verbs that act directly as adverbs. Codes for verbs and adverbs are grouped together.
vn noun verbs are verbs that function as nouns. Codes for verbs and nouns are grouped together.
w punctuation mark
x Non-morpheme word A non-morpheme word is just a symbol. The letter x is usually used to represent unknown numbers and symbols.
y Modal particle Take the initial consonant of the Chinese character "language".
z Status word Take the previous letter of the initial consonant of the Chinese character "shape".
finally realized
1. Generate a dictionary
This method can be executed according to a certain strategy, such as: execute when the keyword table changes, execute the timing script (node-schedule)
`;

//  Extract the keywords
const extraction_result =
keyword_extractor.extract(sentence,{
    language:"english",
    remove_digits: true,
    return_changed_case:true,
    remove_duplicates: false

});

console.log(extraction_result);