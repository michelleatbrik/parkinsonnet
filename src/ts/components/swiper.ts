import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

export default function swiper() {
	let sliders = document.querySelectorAll('[data-swiper]') as NodeListOf<HTMLElement>;

	sliders.forEach((slider, _index) => {
		let slides = slider.querySelectorAll('.swiper-slide');
		// we can be certain this is present, otherwise this module wouldn't be called
		let sliderData = JSON.parse(slider.dataset.swiper!);
		let buttonNext = slider.querySelector('.button-next');
		let buttonPrev = slider.querySelector('.button-prev');
		let pagination = slider.querySelector('.swiper-pagination');
		let defaultOptions = {
			slidesPerView: 1.2,
			spaceBetween: 12,
			initialSlide: 0,
			grabCursor: true,
			centeredSlides: false,
			loop: false,
			navigation: {
				nextEl: buttonNext,
				prevEl: buttonPrev,
				disabledClass: 'opacity-50 pointer-events-none',
			},
			pagination: {
				el: pagination,
				clickable: true,
			},
		};

		let typeOptions = {};
		switch (sliderData.type) {
			case 'images':
				typeOptions = {
					spaceBetween: 0,
					slidesPerView: 1,
					loop: true,
				};
				break;
			case 'videos':
				typeOptions = {
					spaceBetween: 24,
					slidesPerView: 1,
					loop: true,
					centeredSlides: true,
				};
				break;
			case 'cards':
				typeOptions = {
					spaceBetween: 24,
					slidesPerView: 1.1,
					breakpoints: {
						768: {
							slidesPerView: 2.6,
						},
						1024: {
							slidesPerView: 3,
						},
						1280: {
							slidesPerView: 3.6,
						},
						1440: {
							slidesPerView: 3.8,
						},
						1600: {
							slidesPerView: 4,
						},
					},
				};
				break;
			case 'timelineCards':
				typeOptions = {
					spaceBetween: 24,
					slidesPerView: 1.1,
					breakpoints: {
						768: {
							slidesPerView: 1.6,
						},
						1024: {
							slidesPerView: 1.6,
						},
						1280: {
							slidesPerView: 2.4,
						},
						1440: {
							slidesPerView: 2.4,
						},
						1600: {
							slidesPerView: 3,
						},
					},
				};
				break;
			case 'timelineCardsColSpan9':
				typeOptions = {
					spaceBetween: 24,
					slidesPerView: 1.1,
					breakpoints: {
						768: {
							slidesPerView: 2.4,
						},
						1024: {
							slidesPerView: 2.6,
						},
						1280: {
							slidesPerView: 3.2,
						},
						1440: {
							slidesPerView: 3.4,
						},
						1600: {
							slidesPerView: 3.7,
						},
					},
				};
				break;
			case 'newsCardsHome':
				typeOptions = {
					spaceBetween: 24,
					slidesPerView: 1.2,
					breakpoints: {
						768: {
							slidesPerView: 1.8,
						},
						1024: {
							slidesPerView: 2.6,
						},
						1280: {
							spaceBetween: 40,
							slidesPerView: 3,
						},
						1440: {
							spaceBetween: 40,
							slidesPerView: 3,
						},
						1600: {
							spaceBetween: 40,
							slidesPerView: 3,
						},
					},
				};
				break;
			case 'cardsColSpan9':
				typeOptions = {
					spaceBetween: 24,
					slidesPerView: 1.1,
					slidesPerGroup: 1,
					slidesPerGroupSkip: 0,
					loop: false,
					watchOverflow: false,
					breakpoints: {
						768: {
							slidesPerView: 1.8,
						},
						1024: {
							slidesPerView: 2.6,
						},
						1280: {
							slidesPerView: 2.8,
						},
						1440: {
							slidesPerView: 3.4,
						},
						1600: {
							slidesPerView: 3.8,
						},
					},
				};
				break;
		}

		let options = {
			...{
				...defaultOptions,
				...typeOptions,
			},
			...sliderData,
		};

		if (slides.length <= sliderData.minSlides) {
			options = {
				...options,
				...{
					loop: false,
					centeredSlides: false,
				},
			};
		}

		new Swiper(slider, options);

		// TODO: change these when implementing a regular slider component
		// let additionalButtonNext = slider.closest('section')!.querySelectorAll('.mobile-button-next');
		// let additionalButtonPrev = slider.closest('section')!.querySelectorAll('.mobile-button-prev');

		// additionalButtonNext.forEach((button) => {
		//   button.addEventListener('click', () => swiper.slideNext());
		// });

		// additionalButtonPrev.forEach((button) => {
		//   button.addEventListener('click', () => swiper.slidePrev());
		// });
	});
}
