import React from 'react';


function DocumentsTab(){
    return (
      <div className="app-sec">
            <div className="header">
                <div className="left">
                    <label htmlFor="">
                        Documents
                    </label>
                </div>
                <div className="right">
                    <div className="options">
                        <div className="search-box">
                            <i class='bx bx-search'></i>
                            <input type="text"  placeholder='Search'/>
                        </div>
                
                        <div className="display">
                            <span>
                                <i class='bx bx-grid-alt'></i>
                            </span>
                            <span>
                                <i class='bx bx-list-ul'></i>
                            </span>
                        </div>
                        <div className="upload">
                            <button>Upload</button>
                        </div>
                    </div>

                </div>
            </div>
            <div className="app-body">

            </div>
      </div>
    )
}


export default DocumentsTab