export default function OrderHistory() {
    return (
        <>
            {/* OrderHistoryArticle: block for list of previous orders */}
            <article className="OrderHistoryArticle DashboardArticles">
                {/* OrderHistoryArticle heading */}
                <section className="Heading OrderHistorySectionHeading">
                    <h2 className="HeadingText OrderHistoryHeadingText">
                        Order History
                    </h2>
                </section>
                {/* Order History List */}
                <section className="OrderHistorySection">
                    <section className="OrderHistoryEntrySection DashboardArticles">
                        <ul className="OrderHistoryEntryList">
                            <li id="OrderNumber">
                                Order Number:
                                {/* Enter the order number that is fetched from the database here */}
                            </li>
                            <li id="OrderDate">
                                Order Date:
                                {/* Enter the order date that is fetched from the database here */}
                            </li>
                            <li id="OrderLocation">
                                Order Location:
                                {/* Enter the order location that is fetched from the database here */}
                            </li>
                            <li id="OrderTotal">
                                Order Total:
                                {/* Enter the order number that is fetched from the database here */}
                            </li>
                        </ul>
                    </section>
                </section>
            </article>
        </>
    );
}
