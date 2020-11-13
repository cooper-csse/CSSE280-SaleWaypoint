import AuthManager from "../authManager.js";

/**
 * Abstract Page class
 * @abstract
 */
export default class Page {
	/**
	 * Singleton instance
	 * @type Page
	 */
	static instance;
	static fade = 200;

	/**
	 * Url parameters
	 * @type URLSearchParams
	 */
	urlParams;

	constructor() {
		this.urlParams = new URLSearchParams(window.location.search);

		$("#linkSales").on("click", this.redirect.bind(this, "./sales.html"));
		$("#linkWishlist").on("click", this.redirect.bind(this, "./wishlist.html"));
		$("#linkAbout").on("click", this.redirect.bind(this, "./about.html"));
		$("#logout").on("click", AuthManager.signOut);
		$("#content").animate({opacity: 1}, Page.fade);

		$(".store-link").on("click", (event) => {
			let store = $(event.target).data("store");
			this.redirect("./stores.html?store=" + store);
		});
	}

	redirect(url) {
		// TODO: persist settings
		$("#content").animate({opacity: 0}, Page.fade, () => {
			window.location.href = url;
		});
	}

	/**
	 * This page's init method. It is called when the page is first loaded.
	 * Note, at this point the user may NOT be signed in.
	 * @abstract
	 */
	init() {}

	/**
	 * This page's main method, where you set up the controllers, etc.
	 * This is only called once the user is signed in.
	 * This is the equivalent of what we were doing in the follow-alongs
	 * @abstract
	 */
	main() {}

	getReference(ref) {
		return ref;
	}
}
