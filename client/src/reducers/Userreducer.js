export const initialState = false

export const reducer = (isLoggedIn,action) =>{
    if(action.type === 'isLoggedIn'){
            return action.payload
    }
        return isLoggedIn

}
