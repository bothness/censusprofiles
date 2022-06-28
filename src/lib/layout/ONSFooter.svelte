<script>
	export let lang = "en";
	export let baseurl = "//www.ons.gov.uk";

	const texts = {
		"Footer links": "",
		"Help": "Cymorth",
		"Accessibility": "Hygyrchedd",
		"Cookies": "Cookies",
		"Privacy": "Privacy",
		"Terms and conditions": "Telerau ac amodau",
		"About ONS": "Ynglŷn ag SYG",
		"What we do": "Beth rydym yn ei wneud",
		"Careers": "Gyrfaoedd",
		"Contact us": "Cysylltu â ni",
		"Freedom of Information": "Rhyddid Gwybodaeth",
		"Connect with us": "Cysylltu â ni",
		"Twitter": "Twitter",
		"Facebook": "Facebook",
		"LinkedIn": "LinkedIn",
		"Consulations": "Consulations",
		"Discussion forums": "Discussion forums",
		"Email alerts": "Rhybuddion ebost",
		"All content is available under the <a href='http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/'>Open Government Licence v3.0</a>, except where otherwise stated": "Mae'r holl gynnwys ar gael o dan delerau'r <a href='https://www.nationalarchives.gov.uk/doc/open-government-licence-cymraeg/version/3/'>Drwydded Llywodraeth Agored f3.0"
	};

	function i18n(text, lang) {
		return lang == "cy" && texts[text] ? texts[text] : text;
	}
</script>

<footer class="print--hide margin-top--4">
	<h2 class="visuallyhidden">{i18n('Footer links', lang)}</h2>
	<div class="footer">
		<div class="wrapper">
			<nav aria-label="Footer links">
				<div class="footer-nav col-wrap">
					<div class="col col--lg-one-third col--md-one-third">
						<h3 class="footer-nav__heading">{i18n('Help', lang)}</h3>
						<ul class="footer-nav__list">
							<li class="footer-nav__item">
								<a href="{baseurl}/help/accessibility">{i18n('Accessibility', lang)}</a>
							</li>
							<li class="footer-nav__item">
								<a href="{baseurl}/cookies">{i18n('Cookies', lang)}</a>
							</li>
							<li class="footer-nav__item">
								<a href="{baseurl}/help/privacynotice">{i18n('Privacy', lang)}</a>
							</li>
							<li class="footer-nav__item">
								<a href="{baseurl}/help/termsandconditions">{i18n('Terms and conditions', lang)}</a>
							</li>
						</ul>
					</div>
					<div class="col col--lg-one-third col--md-one-third">
						<h3 class="footer-nav__heading">{i18n('About ONS', lang)}</h3>
						<ul class="footer-nav__list">
							<li class="footer-nav__item">
								<a href="{baseurl}/aboutus/whatwedo">{i18n('What we do', lang)}</a>
							</li>
							<li class="footer-nav__item">
								<a href="{baseurl}/aboutus/careers">{i18n('Careers', lang)}</a>
							</li>
							<li class="footer-nav__item">
								<a href="{baseurl}/aboutus/contactus">{i18n('Contact us', lang)}</a>
							</li>
							<li class="footer-nav__item">
								<a href="{baseurl}/aboutus/transparencyandgovernance/freedomofinformationfoi">{i18n('Freedom of Information', lang)}</a>
							</li>
						</ul>
					</div>
					<div class="col col--lg-one-third col--md-one-third">
						<h3 class="footer-nav__heading">{i18n('Connect with us', lang)}</h3>
						<ul class="footer-nav__list">
							<li class="footer-nav__item">
								<a href="https://twitter.com/ONS">{i18n('Twitter', lang)}</a>
							</li>
							<li class="footer-nav__item">
								<a href="https://www.facebook.com/ONS">{i18n('Facebook', lang)}</a>
							</li>
							<li class="footer-nav__item">
								<a href="https://www.linkedin.com/company/office-for-national-statistics">{i18n('LinkedIn', lang)}</a>
							</li>
							<li class="footer-nav__item">
								<a href="https://consultations.ons.gov.uk/">{i18n('Consultations', lang)}</a>
							</li>
							<li class="footer-nav__item">
								<a href="https://www.statsusernet.org.uk/login">{i18n('Discussion forums', lang)}</a>
							</li>
							<li class="footer-nav__item">
								<a href="https://public.govdelivery.com/accounts/UKONS/subscribers/new">{i18n('Email alerts', lang)}</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</div>
		<div class="wrapper">
			<div class="footer-license">
				<img class="footer-license__img" alt="OGL" width="60" src="https://cdn.ons.gov.uk/assets/images/logo-ogl-footer.svg">
				<p class="footer-license__text margin-left-sm--0">
					{@html i18n("All content is available under the <a href='http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/'>Open Government Licence v3.0</a>, except where otherwise stated", lang)}
				</p>
			</div>
		</div>
	</div>
</footer>