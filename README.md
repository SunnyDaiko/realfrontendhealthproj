# Sports Apparel, Inc.

This is a starter project for a Sports Apparel Company that was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
## Description
*Frontend application that grabs patient data from a backend API and displays each patient's first name, last name, age, and gender on /Patients. Each patient has a view button next to them that, when clicked, takes the user to that patient's details page. That page allows the user to edit and update that patient's data, and once updated gets updated on the main Patients page.


## Install Prerequisites

### Node Version Manager (NVM)

NVM is a utility to help you quickly install and switch between Node versions. With NVM, there is no need to manually install and uninstall versions.

Follow the Installation Steps for [NVM on GitHub](https://github.com/coreybutler/nvm-windows).

## Usage

1. Clone this project locally.
1. CD into the root folder
1. Run `npm install` in the root folder to install dependencies.

This command installs a package, and any packages that it depends on.

1. Run `npm start`.

Runs the app in the development mode.\
Open [http://localhost:3000/Patients](http://localhost:3000/Patients) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Dependencies
* Sports apparel api must be running. Confer with team resources if you are unsure.

## Testing
* You can run tests with coverage via `npm run test:coverage`

## ESLint
To run ESLint using Airbnb's configuration, follow these steps:

Step 1: Make sure you have ESLint installed globally. If not, you can install it by running the following command:

shell
Copy code
npm install -g eslint

Step 2: In your project directory, create an .eslintrc file with the following content:

json
Copy code
{
  "extends": "airbnb"
}

Step 3: Add the linting script to your package.json file:

json
Copy code
"scripts": {
  "lint": "eslint ."
}

Step 4: Run the linting script using the following command:
shell
Copy code
npm run lint

This will run ESLint with Airbnb's configuration on all JavaScript files in your project.
