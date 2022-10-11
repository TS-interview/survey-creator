import React from 'react';

import PropTypes from 'prop-types';

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
  return (
    <Layout>
      <Header title={survey?.title} />
      <SurveyForm survey={survey} />
    </Layout>
  );
};

SurveyCreator.propTypes = {
  survey: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    children: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        type: PropTypes.string,
        options: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string,
            label: PropTypes.string,
          })
        ),
      })
    ),
  }),
};

export default SurveyCreator;
