# 📘 Assignment: Algorithmic Problem Solving with Search and Sort

## 🎯 Objective

Practice breaking a programming problem into clear steps by searching and sorting a game leaderboard. You will use Python lists and loops to find information and organize data.

## 📝 Tasks

### 🛠️ Find a Player Score

#### Description
Use the provided leaderboard to write a function that searches for a player's name and returns that player's score.

#### Requirements
Completed program should:

- Write a function named `find_score(leaderboard, player_name)`
- Search through every player and score in the leaderboard
- Return the matching score when the player is found
- Return `None` when the player is not on the leaderboard


### 🛠️ Sort the Leaderboard

#### Description
Create a function that orders the leaderboard from the highest score to the lowest score. Print the sorted leaderboard so the ranking is easy to read.

#### Requirements
Completed program should:

- Write a function named `sort_leaderboard(leaderboard)`
- Return a new list ordered from highest score to lowest score
- Keep each player's name paired with the correct score
- Leave the original leaderboard unchanged


### 🛠️ Identify the Top Players

#### Description
Combine your search and sorting skills to display the top three players. Make sure the program still works when the leaderboard has fewer than three players.

#### Requirements
Completed program should:

- Use `sort_leaderboard()` to determine the ranking
- Print the name and score for up to the top three players
- Avoid an error when fewer than three players are available
- Test the program with a player name that is not on the leaderboard