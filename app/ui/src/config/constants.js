const serverip = 'http://127.0.0.1:5000'

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
const dataendpoints ={
  'upload':`${serverip}/d/upload`,
  'list':`${serverip}/d/data`
}
export {serverip,authendpoints,homendpoints, headers,dataendpoints}