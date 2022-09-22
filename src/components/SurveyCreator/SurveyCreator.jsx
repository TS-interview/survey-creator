import React, { useState } from 'react';

import PropTypes from 'prop-types';

import Header from './shared/Header';
import Layout from './shared/Layout';
import SurveyForm from './shared/SurveyForm';

const SurveyCreator = ({ survey }) => {
  const emptyData = {
    title: 'Untitled survey',
    description: 'description',
    questionList: [
      {
        title: 'Question 1',
        type: 'multiple-choice',
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
