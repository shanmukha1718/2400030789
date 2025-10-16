export const load = (key:string)=>{
  try{
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : null
  }catch{
    return null
  }
}

export const save = (key:string, value:any)=>{
  try{
    localStorage.setItem(key, JSON.stringify(value))
  }catch{}
}
