import { OrderTracking } from "../OrderStatus/OrderTracking";

export default function UserDetails() {
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
                        <li id="UserName">Name:</li>
                        <li id="Email">Email Address:</li>
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
            <article className="OrderHistoryArticle">
                <section className="Heading OrderHistorySectionHeading">
                    <h2 className="HeadingText OrderHistoryHeadingText">
                        Order History
                    </h2>
                </section>
                <section className="OrderHistorySection">
                    <section className="OrderHistoryEntrySection">
                        <ul className="OrderHistoryEntryList">
                            <li id="OrderNumber">Order Number:</li>
                            <li id="OrderDate">Order Date:</li>
                            <li id="OrderLocation">Order Location:</li>
                            <li id="OrderTotal">Order Number:</li>
                        </ul>
                    </section>
                </section>
            </article>
        </>
    );
}
