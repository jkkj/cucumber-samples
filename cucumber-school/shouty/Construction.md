# Steps to create the app

We create these app as the outcome from the [course](https://school.cucumber.io/courses/take/bdd-with-cucumber-javascript/lessons/11261249-introduction-to-bdd) on the [Cucumber web page](https://school.cucumber.io/)

There is a [github repo](https://github.com/cucumber-school/scripts) for this course.

## Install Cucumber

- test if a modern version of NodeJs and NPM are installed by running  
    `node -v`  
    `npm -v`

- create a new directory for the project and go into it:  
`mkdir shouty`  
`cd shouty`

- initialize the project (create `package.json`) and add cucumber:  
`npm init -y`  
`npm install -D @cucumber/cucumber`

- run `cucumber-js` to check that everything is fine:  
`./node_modules/.bin/cucumber.js`  
there should be no errors to see that everything runs but also nothing was tested

- edit `package.json` and change the `test` entry inside `scripts`:  

    ```json
    "scripts": {
        "test": "cucumber-js"
    },
    ```

    now we can run cucumber by `npm test`

- install `hamjest` for more expressive assertions:  
`npm install -D hamjest`

## Add a scenario, wire it up

- create `features` folder  
`mkdir features`

- create the first feature file `features/hear_shout.feature` and put inside it:  

```feature
Feature: Hear shout
  Scenario: Listener is within range
    Given Lucy is located 15 meters from Sean
    When Sean shouts "free bagels at Sean's"
    Then Lucy hears Sean's message
```

- run `npm test`
- to avoid the green warning box we create `cucumber.js` in the root directory and put inside it:  

    ```js
    module.exports = { default: '--publish-quiet'}
    ```

- create steps definitions  
copy the suggestions after running `npm test`, it should looks like:

    ```console
    Failures:

    1) Scenario: Listener is within range # features/hear_shout.feature:3
    ? Given Lucy is located 15 meters from Sean
        Undefined. Implement with the following snippet:
        
            Given('Lucy is located {int} meters from Sean', function (int) {
            // Given('Lucy is located {float} meters from Sean', function (float) {
            // Write code here that turns the phrase above into concrete actions
            return 'pending';
            });
        
    ? When Sean shouts "free bagels at Sean's"
        Undefined. Implement with the following snippet:
        
            When('Sean shouts {string}', function (string) {
            // Write code here that turns the phrase above into concrete actions
            return 'pending';
            });
        
    ? Then Lucy hears Sean's message
        Undefined. Implement with the following snippet:
        
            Then('Lucy hears Sean\'s message', function () {
            // Write code here that turns the phrase above into concrete actions
            return 'pending';
            });

    ```

    paste them to a new directory `step_definitions` in `feature` directory  
    `mkdir features/step_definitions`  
    create there a file `steps.js` and paste there the snippets, we also need to import `Given, When, Then` so the result file looks like this:

    ```js
    const { Given, When, Then } = require ('@cucumber/cucumber')

    Given('Lucy is located {int} meters from Sean', function (int) {
    // Given('Lucy is located {float} meters from Sean', function (float) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
    });


    When('Sean shouts {string}', function (string) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
    });


    Then('Lucy hears Sean\'s message', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
    });
    ```

    we rename the `int` parameter to something more descriptive and print it to the terminal

    ```js
    Given('Lucy is located {int} meters from Sean', function (distance){
        console.log(distance);
        return 'pending';
    })
    ```

    now, we run `npm test` again and we can see that it prints `15` - this value is nowhere in our code, it is automatically passed from Gherkin step

- `pending` means that the step (and by inference the scenario that contains it) is being worked on  
in the CI/CD pipeline we can choose to ignore `pending` steps

- continuing implementing the scenario we got to the point when we get our first failing test

- never trust an automated test that you haven't seen fail!

- when there is just an insignificant chance of regression, we can remove certain scenarios to keep it readable

- tabular syntax - Data Tables

- name tag could be used to filter the scenarios

- scenarios can be run by the line and files they are on

- a tag could be used to run just certain scenarios such as `@smoke`, or to exclude slow ones

- scenarios can run in a random order by a flag `--order random`
