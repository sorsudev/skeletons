import Router from 'next/router';

const sample = (currentStep) => {
  return (dispatch) => {
    Router.push(backStepsList[currentStep]);
    dispatch({
      type: 'sample', sample: {a: 'b'}
    })
  }
}

export default {
  sample,
};
