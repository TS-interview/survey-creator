# Simple Survey Creator

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and [Chakra UI]().\
Libraries such as [react-beautiful-dnd](https://www.npmjs.com/package/react-beautiful-dnd) and [formik](https://www.npmjs.com/package/formik) were used to create a more enjoyable UI experience.

## Design V1

Here is a very simple [competitive analysis](https://www.figma.com/file/b5eTVqCszpJqv96pbcMoS0/Enveritas-Survey-Creator) and a [design V1 rough draft](https://www.figma.com/file/sJs4usXpyZa9lKauY5NKT0/Enveritas---Survey-Creator-Draft-V1?node-id=802%3A9203). These were done before development to get an initial idea of the application.

The idea behind V1 is to have a straightforward survey/form creator. I hand tested a couple form/survey creators, but always ended back to the Google Form as it was simple to use,\
and interacting with the application was very enjoyable. A simple breakdown can be found in the [competitive analysis](https://www.figma.com/file/b5eTVqCszpJqv96pbcMoS0/Enveritas-Survey-Creator) figma file.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in the interactive watch mode.\
Currently only contains basic unit tests that covers creating new questions and setting question/answer type.

## TODO

Will most likely come back to fixing these issues, but ran out of time before turning in the take home.

### Performance

When 10+ questions are created, the input fields start to have some latency issues. This is due to unnecessary re-renders of all the fields.\
Wherever possible, I have made performance tweaks (such as using `FastFields`, validating on submit only, and placing functions in the `useCallBack` hook).\
However, what would have made a large difference is debouncing the `onChange` function for the input fields.\
Progress was made in [DebouncedTextField.jsx](src/components/common/DebouncedTextField.jsx), but there are some issues with the Formik and Chakra UI `Input` component.

### Testing

Definitely can use more unit testing, especially around form submission, but a nice to have would be to set up integration tests for testing drag and dropping of the question cards.

### Form Validation

Did not have the time to get around to this, nor were there specific guidelines on validation, but it would have been nice to have actual form validation.\
Currently, the form only checks for a valid quetion/answer type on submit. The plan was to set character max length limits for the `title`, `label`, and `description` fields.\
With that set up, we can have error/success toasts appear on submit.
