import './signup.css';

function SignUp() {
      return (
        <>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Sign Up</title>
          <link rel="stylesheet" href="signup.css" />
          <div className="phone-container">
            <div className="container">
              <h2>Sign Up</h2>
              <form id="signup-form">
                <div className="form-control">
                  <label htmlFor="Name">Name</label>
                  <input type="text" id="Name" name="Name" required />
                </div>
                <div className="form-control">
                  <label htmlFor="Surname">Surname</label>
                  <input type="text" id="Surname" name="Surname" required />
                </div>
                <div className="form-control">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" required />
                </div>
                <div className="form-control">
                  <label htmlFor="password">Password</label>
                  <input type="password" id="password" name="password" required />
                </div>
                <div className="form-control">
                  <label htmlFor="confirm-password">Confirm Password</label>
                  <input type="password" id="confirm-password" name="confirm-password" required />
                </div>
                <form-control>
                  <label htmlFor="UserType">User type:</label>
                  <select name="Account type" id="type">
                    <option value="Buyer">Buyer</option>
                    <option value="Seller">Seller</option>
                  </select>
                </form-control>
                <button type="submit">Sign Up</button>
              </form>
            </div>
          </div>
        </>
      );
    }

  export default SignUp;