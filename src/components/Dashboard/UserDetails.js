export default function UserDetails({ user }) {
    const userEmail = user.email;

    return (
        <>
            {/* UserDetailsArticle: Block for user details */}
            <article className="UserDetailsArticle">
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
                            Name:
                            {/* Enter the user name that is fetched from the database here */}
                        </li>
                        <li id="Email">
                            Email Address: {userEmail}
                            {/* Enter the email that is fetched from the database here */}
                        </li>
                    </ul>
                    <button
                        type="button"
                        className="EditUserDetailsButton"
                        id="editUserDetails"
                    >
                        Edit info
                    </button>
                </section>
            </article>
        </>
    );
}
