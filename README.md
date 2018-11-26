# Installation

The first thing you need to do is download Node.js, which should be pretty easy.
Next, Run the commands found below in the directory where you cloned this repository:
```
npm install -g @vue/cli
npm install
```
The first line installs the vue.js command line interface, which allows you to run the project while you're making changes,
and see the changes happen wihtout having to refresh the browser.
The second line installs all the packages that the projet relies on without you having to do anything.

# Testing the Project
If you want to be able to test the website, run this command:
```
npm run serve
```
This should start the website, and open up a new tab in your browser with it open.
Any time you save a file in the project, it should automatically change the test website.

# Syntax Checking
Before commiting to this repository, make sure to run this command:
```
npm run lint
```
This checks the syntax of all the files in the project, and yells at you if you don't follow the standards.


### Compiles and minifies for production
```
npm run build
```

### Runs tests that we don't have
```
npm run test
```

