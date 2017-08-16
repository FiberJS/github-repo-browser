# github-repo-browser
Sample app to showcase and develop the 3Flight framework.

Online demo: https://github-repo-buzzer.herokuapp.com

You can check out the framework here: https://github.com/jsbuzz/framework-concept

The flow-manager ui component is here: https://github.com/jsbuzz/3flight-flow-manager

# install
clone and then the usual
```
npm install
npm start
```
Then go to http://127.0.0.1:8080/

# tests
```
npm test
```

# development
I usually run these commands in split tabs:
```
webpack --watch
```
```
karma start
```
```
http-server ./
```
So you can see all your errors and test failures instantly.

# todo
- pagination of results and repos
- dev and prod environments and configurations
- minifying/gzipping in production
- pre-compile the framework code so no need for webpack config
- import webpack config in both build and test
- add tests for ui components and GitHub namespace
- play with integration tests
