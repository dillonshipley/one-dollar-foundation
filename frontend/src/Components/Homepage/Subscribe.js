import React, {useState} from "react";

function PostSubmit(){
  let imgSrc = process.env.PUBLIC_URL + '/logos/checkmark.png';
  return (
    <div className = "postSubscribeText">
      <div className = "successImgContainer">
        <img src = {imgSrc} className = "postSubscribeImg" alt = "oops" />
        <div>Success!</div>
      </div>
      <div>Thank you for subscribing to our monthly mailing list!</div>
      <div className = "st2">Please consider donating if you haven't already.</div>
      <div className = "st2">We appreciate your support, and we promise we'll try to make great things happen a little bit at a time.</div>
      <div className = "st2">Sincerely,</div>
      <div className = "st2 sig">The One Dollar Foundation</div>
    </div>
  );
}

function Submit(){
  return (
    <div className = "loadingContainer">
      <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
  );
}

function PreSubmit({errors, subscribe}){
  return (
      <>
        <div className = "subscribeHeader c">Subscribe to see how we use every dollar donated.</div>
        <form className = "subscribeForm">
            <label htmlFor ="email" className = "st label">Email:</label>
            <input id = "email" className = "st input" placeholder = "Enter your email here" />
            <div className = "emailError">
              {errors.includes("email") && <div className = "errorText">Please enter a valid email address.</div>}
              {errors.includes("exists") && <div className = "errorText">That email address already exists!</div>}
            </div>
            <label htmlFor ="suggestion" className = "st label">Suggestion:</label>
            <div className = "suggestionContainer input st lh2">
              <textarea id = "suggestion" placeholder = "Please let us know of any events in your community you'd like us to be involved in" className = "st input suggestion lh2" rows="2"></textarea>
            </div>            
        </form>
        
        <div className = "moreSubTextSection c">
          <p className = "moreSubText email">We will <u>only</u> email you once a month for our newsletter and expenditures report.</p>
          <p className = "moreSubText nospam">We will never send you email asking for money or personal information.</p>
          <div className = "subscribeButton" onClick = {() => subscribe()}>
            <div>Subscribe</div>
          </div>
        </div>
    </>
    );
}

export default function Subscribe(){
  const [error, setError] = useState("");
  const [subscribeState, setSubscribeState] = useState("pre")

  const postSubscribe = () => {
    setSubscribeState("during")
    console.log("Sending subscribe post...");
    const emailInput = document.getElementById('email').value;
    if(emailInput === ''){
      setError("email");
      setSubscribeState("pre");
      return;
    }

    const suggestionInput = document.getElementById('suggestion').value;
    fetch('https://odfserver-kmusbztw2q-uc.a.run.app/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'email': emailInput, 'suggestion': suggestionInput})
    })
    .then((response) => {
      return response.json()
    })
    .then((data)=> {
      console.log(data.message);
      if(data.message == "ExistsError"){
        setSubscribeState("pre");
        setError("exists")
      } else {
        setSubscribeState("post");
      }
    })
  }

    return (
        <div className = "subscribeContainer">
          <div className="subscribe">
            {subscribeState === "pre" && <PreSubmit errors = {error} subscribe = {() => postSubscribe()}/>}
            {subscribeState === "during" && <Submit />}
            {subscribeState === "post" && <PostSubmit />}
          </div>
        </div>
    );
  }