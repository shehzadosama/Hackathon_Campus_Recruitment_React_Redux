import ActionTypes from '../constant/constant';

const INITIAL_STATE = {
    userName: 'Haider',
    currentUser: {},
    login: false,
    users: [],
    messages: [],
    recipientID: '',
    msgs: [],
    jobs: null,
    students: null,
    companies: null,
    allJobs: null,
    applicants: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.USERNAME:
            return ({
                ...state,
                userName: action.payload
            })
        case ActionTypes.APPLICANTS:
            return ({
                ...state,
                applicants: action.payload
            })
        case ActionTypes.JOBS:
            return ({
                ...state,
                jobs: action.payload
            })
        case ActionTypes.ALL_JOBS:
            return ({
                ...state,
                allJobs: action.payload
            })
        case ActionTypes.STUDENTS:
            return ({
                ...state,
                students: action.payload
            })
        case ActionTypes.COMPANIES:
            return ({
                ...state,
                companies: action.payload
            })
        case ActionTypes.CURRENTUSER:
            return ({
                ...state,
                currentUser: action.payload
            })
        case ActionTypes.LOGIN:
            return ({
                ...state,
                login: action.payload
            })
        case ActionTypes.ALLUSERS:
            return ({
                ...state,
                users: action.payload
            })
        case ActionTypes.CHANGERECPUID:
            return ({
                ...state,
                receipentDetails: action.payload
            })
        case ActionTypes.MESSAGES:
            return ({
                ...state,
                messages: action.payload
            })
        case ActionTypes.UPDATEPORTFOLIO:
            return ({
                ...state,
                portfolios: action.payload
            })
        case ActionTypes.SHOW_MESSAGES:
            return ({
                ...state,
                msgs: action.payload
            })
        default:
            return state;
    }

}