import React from 'react'

export default function NavbarComponent() {
  return (
    <>

    <nav>
      <div className="left">
        {
          [1,2,3,4,4,1,2,3,4,4].map((item,index)=>{
            return (
              <>
                 <div className="item">
          <div className="icon">
            <i class='bx bxs-grid-alt'></i>
          </div>
          <div className="text">Overview</div>
          <div className="x">x</div>
        </div>
              </>
            )
          })
        }
     
     
      </div>
      <div className="right">
        <div className="item">
        <button><i class='bx bx-plus'></i></button>
        </div>
       
      </div>
    </nav>
 
    </>
  )
}
