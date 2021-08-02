import Router from 'next/router';
const nextStepsList = ['', '', '', '', ''];
const backStepsList = ['', '', '', ''];

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
