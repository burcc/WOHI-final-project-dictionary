# WOHI Final Project Burcu Koyluoglu


The project is an english to english dictionary. First page, Dictionary, allows user to search the meaning of the word. Additionally it gives both written and mp3 pronunciations. In the bottom of the first page there is Bookmark Word button which allows user to bookmark the word and see on bookmark page. If user would like to hear mp3 pronunciation of the word, there is another button on the bottom of the first page. All a user have to do is clicking the Hear Pronunciation button.

The second page of the project is Bookmarks. User can see all of saved words and if would like to remove any, word can be deleted. 

The third page of the project is Quiz. If there is bookmarked words saved, Quiz page allows user to practice these words. When user see a word it never shows up again during the same quiz session. If there is made any mistake about predicting the word page shows the user correct answer. In order to start a quiz, there has to be at least one bookmarked word, after that it will show the meaning of the word and allows user to guess. When the word guessing is submitted, it will show the answer. Users can repeat same quiz as much as they want. 

Project features:
-API from: Free Dictionary https://api.dictionaryapi.dev/api/v2/entries/en/
-To make API requests: Axios 
-To handle the routing between pages: react-router-dom
-for style/functionality: bootstrap