import React from 'react'

function Terms({onCheck,onback,onsubmit,showmes,message}) {
    return (
        <div>
            <div className="content">
       <h1> General</h1>     
            <p>
            These Terms applies to all users of the Services, including without limitation users who are sellers, buyers, information and other materials. If you are entering into this agreement for and on behalf of a business entity, and the term “you” in this agreement shall mean the business entity on whose behalf you are using the Services, unless the context does not permit.
These Terms are between you and TaboGarahe or between you and any different service provider identified for a particular Service. For ease of reference, each of TaboGarahe and its subsidiaries are referred to in these Terms as “TaboGarahe”.
By using the Services in any manner, including but not limited to visiting or browsing the Services, you agree to observe and be bound by these Terms and the additional terms and conditions and policies referenced herein and/or available by hyperlink.   
TaboGarahe reserves the right to change or modify these Terms at any time. You will be deemed to have agreed to the amended Terms by your continued use of the Services following the date on which the amended Terms are posted here.

            </p>
        <h1>Use of the Services</h1>
            <p>
            Subject to your compliance with these Terms, TaboGarahegrants you a limited, non-exclusive, revocable (with or without cause), non-transferable right and license to use the Services.
You shall use the Services in accordance with these Terms and shall not:
•	Upload any Content (as defined below) that violates or infringes another party’s rights of publicity, privacy, copyright, trademark or any other intellectual property right.

•	Copy, decompile, reverse engineer, disassemble, attempt to derive the source code of, decrypt, interfere with, or disrupt the integrity or the performance of the Services.

•	Make any modification, adaptation, improvement, enhancement, translation or derivative work from the Services.


            </p>

            </div>
            
            <p className="check text-info"><input type="checkbox" onChange={onCheck} name="terms"  /> Aceept the Terms and Condition</p>
            <div className="margin">
        {showmes ? (<p className={message.msgclas}>{message.msg}</p>):(
            <>
            <button className="btn btn-primary float-right" onClick={onsubmit}>Sign up</button>
            <button className="btn btn-danger float-left" onClick={onback}>Back</button>
            </>
            )}
            </div>
        </div>
    )
}

export default Terms
