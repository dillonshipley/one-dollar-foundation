export default function Unsubscribe(){

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      }

    const postUnsubscribe = () => {
        const emailInput = document.getElementById('unsubscribe').value;
        console.log("unsubscribeClicked");
        if(emailInput === ''){

        }
        if (validateEmail(emailInput)) {
          console.log('Email is valid');
        } else {
          console.log('Invalid email');
        }
        fetch('http://localhost:3001/unsubscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({'email': emailInput})
        });
      }

    return (
        <div className = "unsubscribeWrapper">
            <p>We're sorry to see you go.</p>
            <p>Enter your email below to unsubscribe.</p>
            <form>
                 <input className = "label" id = "unsubscribe" placeholder = "Enter your email here"></input>
            </form>
            <button className = "unsubscribeButton" onClick= {() => postUnsubscribe()}>Unsubscribe</button>
        </div>
    );
}