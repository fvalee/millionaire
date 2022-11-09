## Millionaire
A simple web application based on the famous game show.

### Instructions
#### How to run
First, make sure your database connection is properly set up in backend/src/main/resources/application.properties.
From root folder run `mvn clean package` command, followed by `java -jar target/backend-0.0.1-SNAPSHOT.jar` command
from backend module. The application is now available on http://localhost:3000.


#### How to play
You can create a new game from home screen or continue existing game based on your Game ID. By creating a new game from 
home screen, the app will randomly choose question set and its order for the new game. From administrator panel, you can 
add more questions to database and create a new game with desired question set and its order. By doing that, the app 
will return Game ID which you will need to pass into Existing Game ID input box on home screen to play your game.
