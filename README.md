
# Battleship NodeJs with Typescript

A simple game of Battleship, written in NodeJs using TypeScript.  

# Getting started

To edit and debug this project, you can use [Visual Studio Code](https://code.visualstudio.com/) or any other suitable editor.
You might want to install these extensions to better support this project in VSCode:
* Jest Test Explorer https://marketplace.visualstudio.com/items?itemName=kavod-io.vscode-jest-test-adapter
* Cucumber (Gherkin) Full Support https://marketplace.visualstudio.com/items?itemName=alexkrechik.cucumberautocomplete

## Run locally
Install packages

```bash
npm install
```

Run battleship

```bash
npm run start
```

## Execute tests

Execute all tests
```bash
npm test
```
or you can use Sidebar if you install Jest Test Explorer. You can debug tests as well using simple 'Debug' context menu
You can check coverage results by opening coverage\lcov-report\index.html in your browser.


Execute Cucumber-js tests
```bash
npm run cucumber
```
This should generate a cucumber-report.html. If you open this html file in a browser, you will see the test report
## Docker

To run and test the project in a container, use these steps:

```bash
docker run -it -v ${PWD}:/battleship -w /battleship node bash
npm install
npm test
npm run start
```

# Use ts-mockito
https://github.com/NagRock/ts-mockito

# Run sonarqube for typescript files

You can run sonar against a local sonar server, follow steps below

## Step 1: Install sonarqube docker first
```
docker run -d --name sonarqube -p 9000:9000 sonarqube
```
## Step 2: Configure sonar locally
```
open sonarqube in browser http://localhost:9000, initially enter admin/admin as username/password. Sonarqube will ask you
to change password. Select a suitable new password.
```

## Step 3: Create project in sonarqube and use 'manually' as option

Enter battleship:nodejs-ts as project display name and key name

## Step 4:  Click Setup and download sonarqube scanner

You can select your OS. If you select Windows, you will get a command like following
```
sonar-scanner.bat -D"sonar.projectKey=battleship:nodejs-ts" -D"sonar.sources=." 
-D"sonar.host.url=http://localhost:9000" -D"sonar.login=<Key Name>"
```
