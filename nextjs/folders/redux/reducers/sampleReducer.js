const initialState = {
  'a' : 'b'
}

const sampleReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'sample':
      return {
        ...state, sample: action.sample
      };
    default:
      return { ...state, algo: 'mas' };
  }
}

export default sampleReducer;
