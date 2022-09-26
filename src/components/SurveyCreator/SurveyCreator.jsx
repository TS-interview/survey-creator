import React, { useState } from 'react';

import PropTypes from 'prop-types';
import uuid from 'react-uuid';

import Header from './shared/Header';
import Layout from './shared/Layout';
import SurveyForm from './shared/SurveyForm';

/**
 *
 * Simple survey creator. Heavily influenced by Google Forms.
 *
 * List of TODO:
 * - Make MC options draggable
 * - Skeleton loading states for fields
 * - Debounce Input Fields
 * - Additional testing
 *
 * @param {Object} survey
 * @returns
 */
const SurveyCreator = ({ survey }) => {
  const emptyData = {
    title: 'Untitled survey',
    description: 'description',
    questionList: [
      {
        id: uuid(),
        title: 'Question 1',
        type: 'multiple-choice',
        options: [{ id: uuid(), label: 'option 1' }],
      },
    ],
  };

  const surveyData = survey?.title ? survey : emptyData;
  return (
    <Layout>
      <Header title={surveyData.title} />
      <SurveyForm survey={surveyData} />
    </Layout>
  );
};

SurveyCreator.propTypes = {
  survey: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    questionList: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        type: PropTypes.string,
        options: PropTypes.arrayOf(PropTypes.string),
      })
    ),
  }),
};

export default SurveyCreator;
