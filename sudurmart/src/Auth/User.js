export const setUser = (user)=>{
    localStorage.setItem('user', user)
}

export const getUser = ()=>localStorage.getItem('user')

export const removeUser = (user)=>{
    localStorage.clear()
}