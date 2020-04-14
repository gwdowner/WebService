import lodash from 'lodash';

// Auto updates state with dependancy injection values
// do not use for values with user input
export const updateState = (component) => {
    const { state, props } = component;

    let updatedState = {};
    for (let item in state) {
        if (props[item] && !lodash.isEqual(state[item], props[item])) {
            updatedState[item] = props[item]
        }
    }

    if (!lodash.isEmpty(updatedState)) {
        component.setState(updatedState);
    }
};