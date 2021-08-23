import React, { useState, useEffect } from "react";
import "./BackToTopBtn.scss";

function BackToTopBtn() {
	const [showButton, setShowButton] = useState(false);

	const scrollToTop = () => {
		window.scrollTo(0, 0);
	};

	useEffect(() => {
		window.addEventListener("scroll", () => {
			if (window.pageYOffset > 300) {
				setShowButton(true);
			} else {
				setShowButton(false);
			}
		});
	}, [showButton]);

	return (
		<button
			className={showButton ? "back-to-top" : "back-to-top back-to-top--hide"}
			onClick={scrollToTop}>
			Back to top
		</button>
	);
}

export default BackToTopBtn;
