export const deleteCookie =(name:any)=> {
  document.cookie = `${name  }=; expires=Thu, 10 oct 2023 00:00:00 UTC; path=/;`;
}