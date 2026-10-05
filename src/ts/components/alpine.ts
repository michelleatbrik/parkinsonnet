import Alpine from 'alpinejs';

declare global {
	interface Window {
		Alpine: typeof Alpine;
	}
}

export default function alpine() {
	loadModules().then(() => {
		window.Alpine = Alpine;
		Alpine.start();
	});
}

async function loadModules() {
	const modules = import.meta.glob('../alpine/*.ts');
	for (const mod of Object.entries(modules)) {
		await mod[1]();
	}
}

Alpine.data('mobileMenu', () => ({
	isOpen: false,

	init() {
		window.addEventListener('mobileMenu:toggle', () => this.toggle());
		window.addEventListener('mobileMenu:open', () => this.open());
	},

	toggle() {
		this.isOpen ? this.close() : this.open();
	},

	open() {
		this.$el.focus({ preventScroll: true });
		this.isOpen = true;
		document.body.classList.add('overflow-hidden');
	},

	close() {
		this.isOpen = false;
		document.body.classList.remove('overflow-hidden');
	},
}));
