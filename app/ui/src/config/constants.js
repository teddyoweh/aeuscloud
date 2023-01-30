const serverip = 'http://120.0.0.1:8000/'

const headers =   {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept':"*/*",
    'Access-Control-Allow-Origin': '*',
    'x-access-token':localStorage.getItem('token')
  }
const authendpoints ={

    'register':`${serverip}/p/register`,
    'login':`${serverip}/p/login`,
}
const homendpoints = {
  'home':`${serverip}/p`
}
export {serverip,authendpoints,homendpoints, headers}