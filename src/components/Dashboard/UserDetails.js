import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase"; // Assuming you have your Firebase configuration exported from a file named firebase.js


const fetchUserData = async (userId) => {
    try {
      const userDocRef = doc(db, "users", userId);
      const userDocSnapshot = await getDoc(userDocRef);
  
      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        console.log("User Data:", userData);
        return userData;
      } else {
        console.log("User not found.");
        return null;
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error; // Re-throw the error for handling in the calling function
    }
  };
  
  const UserDetails = ({ user }) => {
    // eslint-disable-next-line
    const [userData, setUserData] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
  
    useEffect(() => {
      const fetchUserDetails = async () => {
        try {
          if (user) {
            const userData = await fetchUserData(user.uid);
            setUserData(userData);
            setEmail(userData.email)
            setUsername(userData.username)
          } else {
            console.log("User is not logged in.");
          }
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      };
  
      fetchUserDetails();
    }, [user]);
  


    return (
        <>
            {/* UserDetailsArticle: Block for user details */}
            <article className="UserDetailsArticle DashboardArticles">
                {/* Heading for UserDetailsArticle */}
                <section className="Heading UserDetailsHeadingSection">
                    <h2 className="HeadingText UserDetailsHeadingText">
                        User Details
                    </h2>
                </section>
                {/* User details */}
                <section className="UserDetailsSection">
                    <ul className="UserDetailList">
                        <li id="UserName">
                            Name: {username}
                            {/* Enter the user name that is fetched from the database here */}
                        </li>
                        <li id="Email">
                            Email Address: {email}
                            {/* Enter the email that is fetched from the database here */}
                        </li>
                    </ul>
                </section>
            </article>
        </>
    );
}

export default UserDetails;