# Set up basic app

## Attempt one

inspired by [these steps](https://www.elliotdenolf.com/blog/cucumberjs-with-typescript)  
with some help of googling and chatGPT

### Initialize npm project

run `npm init` in your target folder and set up properties like the description of the project

### Install dependencies

run (`npm i -D` is a shortcut for `npm install --save-dev`)  
`npm i -D cucumber cucumber-tsflow cucumber-pretty ts-node typescript chai`  
`npm i -D @types/cucumber @types/chai`

### Create tsconfig.json

create `tsconfig.json` file and put inside:

```json
{
    "compilerOptions": {
        "target": "es6",
        "module": "commonjs",
        "outDir": "dist",
        "sourceMap": true,
        "experimentalDecorators": true
    },
    "include": ["**/*.ts"],
    "exclude": ["node_modules"]
}
```

### Create test directories and files

- create `features` directory and a file `bank-account.feature` inside it with the content:

```text
Feature: Bank Account

  Scenario: Stores money
    Given A bank account with starting balance of $100
    When $100 is deposited
    Then The bank account balance should be $200
```

- create `step-definitions` directory and a file `bank-account.steps.ts` inside it with the content:

```ts
import { binding, given, then, when } from 'cucumber-tsflow';
import { assert } from 'chai';

@binding()
export class BankAccountSteps {
    private accountBalance: number = 0;

    @given(/A bank account with starting balance of \$(\d*)/)
    public givenAccountWithStartingBalance(amount: number) {
        this.accountBalance = amount;
    }

    @when(/\$(\d*) is deposited/)
    public deposit(amount: number) {
        this.accountBalance = Number(this.accountBalance) + Number(amount);
    }

    @then(/The bank account balance should be \$(\d*)/)
    public accountBalanceShouldEqual(expectedAmount: number) {
        assert.equal(this.accountBalance, expectedAmount);
    }
}
```

- create `cucumber.js` file in the root directory with the content:

```js
let common = [
    'features/**/*.feature',                // Specify our feature files
    '--require-module ts-node/register',    // Load Typescript module
    '--require step-definitions/**/*.ts',  // Load step definitions
    '--format progress-bar',                // Load custom formatter
    '--format node_modules/cucumber-pretty' // Load custom formatter
].join(' ');

module.exports = {
    default: common
};
```

- add an npm script to `package.json`:

```json
{
    // ...
    "scripts": {
        "test": "./node_modules/.bin/cucumber-js -p default"
    },
    // ...
}
```

### Run the tests

now we encountered a problem by running `npm test`  
the problem could had be solved by using other versions of the packages from the showcase of the source blog:

```json
"devDependencies": {
    "@types/chai": "^4.1.7",
    "@types/cucumber": "^4.0.5",
    "chai": "^4.2.0",
    "cucumber": "^5.1.0",
    "cucumber-pretty": "^1.5.0",
    "cucumber-tsflow": "^3.2.0",
    "ts-node": "^8.0.3",
    "typescript": "^3.3.3333"
  }
```

instead of

```json
"devDependencies": {
    "@types/chai": "^4.3.4",
    "@types/cucumber": "^7.0.0",
    "chai": "^4.3.7",
    "cucumber": "^6.0.7",
    "cucumber-pretty": "^6.0.1",
    "cucumber-tsflow": "^4.0.0-rc.7",
    "ts-node": "^10.9.1",
    "typescript": "^5.0.2"
  }
```

## Attempt two

The package [cucumber](https://www.npmjs.com/package/cucumber) is deprecated so let's use [@cucumber/cucumber](https://www.npmjs.com/package/@cucumber/cucumber) and follow their steps  

### Install

run  `npm install @cucumber/cucumber`

### Get started

- create a file `src/index.js` with the content:

    ```js
    class Greeter {
        sayHello() {
            return 'hello'
        }
    }

    module.exports = {
        Greeter
    }
    ```

- write the first feature in `features/greeting.feature`:

    ```feature
    Feature: Greeting

        Scenario: Say hello
        When the greeter says hello
        Then I should have heard "hello"
    ```

- implement the steps in `features/support/steps.js`

    ```js
    const assert = require('assert')
    const { When, Then } = require('@cucumber/cucumber')
    const { Greeter } = require('../../src')

    When('the greeter says hello', function() {
        this.whatIHeard = new Greeter().sayHello()
    });

    Then('I should have heard {string}', function (expectedResponse) {
        assert.equal(this.whatIHeard, expectedResponse)
    });

- run Cucumber

    `npx cucumber-js`

This steps were fully successful with the resulting `package.json`:

```json
{
  "name": "cucumber-selenium-sample",
  "version": "1.0.0",
  "description": "",
  "main": "cucumber.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Jakub Kováč",
  "license": "MIT",
  "dependencies": {
    "@cucumber/cucumber": "^9.1.0"
  }
}
```
