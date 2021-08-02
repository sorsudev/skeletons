const initialState = {
  data: {
    'key_1': {
      body: '...',
      index: 'One'
    },
    'key_2': {
      body: '...',
      index: 'Two'
    },
    'key_3': {
      body: '...',
      index: 'Three'
    },
    'key_4': {
      body: '...',
      index: 'Four'
    },
    'key_5': {
      body: '...',
      index: 'Five'
    },
    'key_6': {
      body: '...',
      index: 'Six'
    },
    'key_7': {
      body: '...',
      index: 'Seven'
    },
    'key_8': {
      body: '...',
      index: 'Eight'
    },
    'key_9': {
      body: '...',
      index: 'Nine'
    },
    'key_10': {
      body: '...',
      index: 'Ten'
    },
    'key_11': {
      body: '...',
      index: 'Eleven'
    },
    'key_12': {
      body: '...',
      index: 'Twelve'
    },
    'key_13': {
      body: '...',
      index: 'Thirteen'
    },
    'key_14': {
      body: '...',
      index: 'Fourteen'
    }
  }
}

const pipedriveDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'getData':
      return { ...state, data: action.data };
    default:
      return { ...state };
  }
}

export default pipedriveDataReducer;
