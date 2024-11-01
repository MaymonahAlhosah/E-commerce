import { useState } from "react"

const Login = () => {

  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username:"",
    password:"",
    email:""
  })

  const changeHandler = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value});
  }

  const login = async () => {
    console.log("Login function executed", formData);
    let responseData;
    await fetch('http://localhost:4000/login', {
      method:"POST",
      headers: {
        Accept: 'application/formData',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    }).then((response)=> response.json()).then((data)=> responseData=data)

    if(responseData.success){
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace('/');
    }
    else{
      alert(responseData.errors)
    }
  }
  
  const signup = async () => {
    console.log("signup function executed", formData);
    let responseData;
    await fetch('http://localhost:4000/signup', {
      method:"POST",
      headers: {
        Accept: 'application/formData',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    }).then((response)=> response.json()).then((data)=> responseData=data)

    if(responseData.success){
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace('/');
    }
    else{
      alert(responseData.errors)
    }

  }

  return (
    <section className="max_padd_container flexCenter flex-col pt-32">
      <div className="max-w-[555px] h-[600px] bg-white m-auto px-14 py-10 rounded-md">
        <h3 className="h3">{state}</h3>
        <div className="flex flex-col gap-4 mt-7">
          {state === "Sign Up" ? <input name="username" value={formData.username} onChange={changeHandler} type="text" placeholder="اسم المستخدم" className="h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl" /> : ''}
          <input name="email" value={formData.email} onChange={changeHandler} type="email" placeholder="الرجاء ادخال بريدك الاكتروني" className="h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl" />
          <input name="password" value={formData.password} onChange={changeHandler} type="password" placeholder="الرجاء ادخال الرمز السري" className="h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl" />
        </div>
        <button onClick={()=>{state==="Login"?login():signup()}} className="btn_dark_rounded my-5 w-full !rounded-md">تسجيل الدخول </button>

        {state === "Sign Up" ? <p className="text-black font-bold">لديك حساب بالفعل ؟ <span onClick={() => { setState("Login") }} className="text-secondary underline cursor-pointer">تسجيل الدخول </span></p> : <p className="text-black font-bold">ليس لديك حساب ؟ <span onClick={() => { setState("Sign Up") }} className="text-secondary underline cursor-pointer"> قم بانشاء مستخدم جديد </span></p>}

        <div className="flexCenter mt-6 gap-3">
          <input type="checkbox" name="" id="" />
          <p>من خلال المتابعة، أوافق على شروط الاستخدام وسياسة الخصوصية</p>
        </div>
      </div>
    </section>
  )
}

export default Login