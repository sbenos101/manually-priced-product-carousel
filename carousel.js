const productsMap = {
    "products": {
        "name": "Products",
        "categories": [
            { "name": "MiFires Derwent 5Kw Multi-Fuel Eco Design Stove", "img": "/media/catalog/product/m/i/mifires-derwent-5kw-multifuel-stove-eco-design-stove.jpg", "href": "/mifires-derwent-5kw-multifuel-stove-eco-design-stove", "basePrice": 494.98, "freeItems": true },
            { "name": "MiFires Derwent 5Kw Multi-Fuel Eco Design Stove inc. Flue Pack", "img": "/media/catalog/product/m/i/mifires-derwent-5kw-multi-fuel-stove-inc-flue-pack-550-x-550.jpg", "href": "/mifires-derwent-5kw-multi-fuel-stove-inc-flue-pack", "basePrice": 694.69, "freeItems": true },
            { "name": "Kartell Kompact Type 11 Single Panel Single Convector Radiator", "img": "/media/catalog/product/k/a/kartel-type-11-convector-radiator_1.jpg", "href": "/kartell-kompact-type-11-single-panel-single-convector-radiator", "basePrice": 14.15, "fromPrice": true, "discount": true },
            { "name": "Kartell Kompact Type 21 Double Panel Single Convector Radiator", "img": "/media/catalog/product/k/a/kartell-kompact-type-21-convector-radiator.jpg", "href": "/kartell-kompact-type-21-double-panel-single-convector-radiator", "basePrice": 28.49, "fromPrice": true, "discount": true },
            { "name": "Kartell Kompact Type 22 Double Panel Double Convector Radiator", "img": "/media/catalog/product/k/a/kartell-kompact-type-22-double-panel-double-convector-radiator_1.jpg", "href": "/kartell-type-22-compact-double-panel-double-convector-radiator", "basePrice": 26.72, "fromPrice": true, "discount": true },
            { "name": "Wyndam Anthracite 22mm Straight Towel Warmer", "img": "/media/catalog/product/w/y/wyndam-anthracite-22mm-straight-towel-warmer.jpg", "href": "/wyndam-anthracite-22mm-straight-towel-warmer", "basePrice": 25.20, "fromPrice": true, "discount": true },
            { "name": "Wyndam Black 22mm Straight Towel Warmer", "img": "/media/catalog/product/w/y/wyndam-black-22mm-straight-towel-warmer.jpg", "href": "/wyndam-black-22mm-straight-towel-warmer", "basePrice": 25.20, "fromPrice": true, "discount": true },
            { "name": "Wyndam Chrome 22mm Straight Towel Warmer", "img": "/media/catalog/product/w/y/wyndam-chrome-22mm-straight-towel-warmer-1.jpg", "href": "/wyndam-chrome-22mm-straight-towel-warmer", "basePrice": 31.50, "fromPrice": true, "discount": true },
            { "name": "Worcester Greenstar 1000 24Kw Combi Boiler inc. Worcester Standard Horizontal Flue Kit", "img": "/media/catalog/product/b/8/b8080754-worcester-greenstar-1000-24kw-combi-boiler-inc-worcester-standard-horizontal-flue-kit.jpg", "href": "/worcester-greenstar-1000-24kw-combi-boiler-inc-worcester-standard-horizontal-flue-kit", "basePrice": 680.00, "freeItems": true },
            { "name": "Worcester Greenstar 1000 30Kw Combi Boiler inc. Worcester Standard Horizontal Flue Kit", "img": "/media/catalog/product/b/8/b8080755-worcester-greenstar-1000-30kw-combi-boiler-inc-worcester-standard-horizontal-flue-kit.jpg", "href": "/worcester-greenstar-1000-30kw-combi-boiler-inc-worcester-standard-horizontal-flue-kit", "basePrice": 740.00, "freeItems": true },
            { "name": "Worcester Greenstar 4000 25Kw Combi Boiler inc. Worcester Standard Horizontal Flue Kit", "img": "/media/catalog/product/b/8/b8080756-worcester-greenstar-4000-25kw-combi-boiler-inc-worcester-standard-horizontal-flue-kit.jpg", "href": "/worcester-greenstar-4000-25kw-combi-boiler-inc-worcester-standard-horizontal-flue-kit", "basePrice": 1120.00, "freeItems": true },
            { "name": "Worcester Greenstar 4000 30Kw Combi Boiler inc. Worcester Standard Horizontal Flue Kit", "img": "/media/catalog/product/b/8/b8080757-worcester-greenstar-4000-30kw-combi-boiler-inc-worcester-standard-horizontal-flue-kit.jpg", "href": "/worcester-greenstar-4000-30kw-combi-boiler-inc-worcester-standard-horizontal-flue-kit", "basePrice": 1250.00, "freeItems": true },
            { "name": "Sime 8116690B Giulia 30Kw Combi Boiler with Horizontal Flue & Clock", "img": "/media/catalog/product/b/8/b8080758-sime-8116690b-giulia-30kw-combi-boiler-flue-clock-500ml-wyndam-inhibitor-and-system-cleanser.jpg", "href": "/sime-8116690b-giulia-30kw-combi-boiler-flue-clock-500ml-wyndam-inhibitor-system-cleanser", "basePrice": 624.00, "freeItems": true },
        ]
    }
};

function initializeCarousel() {
    let products = ["products"];
    const carousels = [];
    const prevButtons = [];
    const nextButtons = [];
    const carouselContainers = [];
    const carouselIndexMap = {};

    products = products.filter(material => {
        const exists = productsMap[material] && document.getElementById(`product-carousel`);
        if (!exists) console.warn(`Carousel for ${material} not found or missing in productsMap`);
        return exists;
    });

    products.forEach((material, index) => {
        const section = document.getElementById(`product-carousel`);
        if (!section) return;

        const carousel = section.querySelector('.product-carousel');
        const prevBtn = section.querySelector('.prevBtn');
        const nextBtn = section.querySelector('.nextBtn');
        const container = section.querySelector('.product-carousel-container');

        if (!carousel || !prevBtn || !nextBtn || !container) return;

        carousels.push(carousel);
        prevButtons.push(prevBtn);
        nextButtons.push(nextBtn);
        carouselContainers.push(container);
        carouselIndexMap[material] = 0;

        carousel.innerHTML = '';

        const category = productsMap[material];
        const uniqueProducts = category.categories.filter(
            (product, idx, self) => idx === self.findIndex(p => p.href === product.href)
        );

        uniqueProducts.forEach(product => {
            const item = document.createElement('div');
            item.className = 'product-carousel-item';
            
            const discountHtml = product.discount ? `
                <div class="discount-circle">
                    <div class="dicount-text discount-header-text">
                        <span class="discount">10%</span>
                        <span class="off">OFF</span>
                    </div>
                </div>
            ` : '';

            const freeItemsHtml = product.freeItems ? `
                <div class="free-items-circle free-items-circle">
                    <div class="free-items-text free-items-header-price-text">
                        <span class="free-items">FREE<br>ITEMS</span>
                    </div>
                </div>
            ` : '';
            
            const fromText = product.fromPrice ? 'From ' : '';
            const priceHtml = `
                <div x-data="{ basePrice: ${product.basePrice} }">
                    <p class="mx-auto text-center text-sm">
                        ${fromText}Only £<span x-text="(basePrice * ($store.vatSwitch.state ? 1.20 : 1)).toFixed(2)"></span> 
                        <span x-text="$store.vatSwitch.state ? 'Inc VAT' : 'Ex VAT'"></span>
                    </p>
                </div>
            `;
            
            item.innerHTML = `
<form class="product-carousel-item-content w-full" style="position: relative;">
    ${discountHtml}
    ${freeItemsHtml}
    <img src="${product.img}" alt="${product.name}" title="${product.name}" class="product-carousel-item-image">
    <div class="product-carousel-item-details w-full">
        <div class="flex flex-row items-center gap-4 justify-start" style="padding: 8px; padding-left: 0px; min-height: 50px;">
            <p class="truncate-2-lines text-base font-semibold pb-2 mx-auto text-center w-4/5">
                ${product.name}
            </p>
        </div>
        
        ${priceHtml}

        <div class="pt-2 pb-2 flex z-50 shop-now-button-width" style="margin: 0 auto;">
            <a href="${product.href}" class="py-2 w-full btn btn-primary justify-center text-sm rounded uppercase font-bold focus:border-primary focus:outline-none focus:ring-0 mr-auto" aria-label="SHOP NOW">
                <svg class="w-6 h-auto flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 328.8"><path style="fill:#fff" d="M387.61,142.63h-116.59l-27.11-61.22c3.52-3.46,4.83-8.84,2.9-13.69l-21.21-53.51c-5.22-11.89-17.75-17.11-26.2-12.32l-1.1-.44c-10.5-4.17-20.52,1.02-24.69,11.53l-21.21,53.5c-1.9,4.8-.64,10.1,2.77,13.55l-.26,.18-27.57,62.42H12.45c-.26,0-.52,0-.77,.02-6.5,.29-11.68,4.32-11.68,9.19v6.79c0,5.07,5.99,9.49,12.83,9.49h3.52l52.04,148.59c2.54,7.25,9.38,12.11,17.07,12.11h220.59c7.4,0,14.06-4.52,16.8-11.4l59.16-148.73h5.64c.29,0,.58,0,.86-.03,6.45-.39,11.49-5.17,11.49-10.02v-6.79c0-5.05-5.57-9.19-12.39-9.2Zm-122.93,60.13h-55.65v-34.72h61.02l-5.38,34.72Zm-7.75,50.05h-47.9v-32.17h52.88l-4.98,32.17Zm-119.42-32.17h53.04l-.06,32.17h-48.18l-4.81-32.17Zm33.86-132.76l.09-.5c5.78,1.02,11.72-2.13,13.97-7.79l13.92-35.1,14.41,36.34c2.13,5.36,7.57,8.47,13.06,7.91h0s.06,.17,.09,.28c0,.03,.02,.06,.02,.08,0,0,0,.02,0,.02l24.7,53.53h-104.82l24.55-54.76Zm19.28,80.16l-.06,34.72h-55.76l-5.2-34.72h61.01Zm-146.03,0H111.83l5.05,34.72H56.87l-12.25-34.72Zm19.4,52.6h55.46l4.69,32.17h-49.17l-10.98-32.17Zm29.87,84.25l-12.26-34.21h45.13l4.98,34.21h-37.84Zm56.22,0l-5.12-34.21h45.46l-.06,34.21h-40.28Zm58.91,0v-34.21h45.13l-5.3,34.21h-39.83Zm90.13,0h-32.17l5.39-34.21h39.54l-12.76,34.21Zm20.42-52.08h-44.38l5.08-32.17h52.59l-13.28,32.17Zm21.45-50.05h-57.94l5.47-34.72h66.76l-14.29,34.72Z"></path></svg>
                <span class="ml-2 inline text-nowrap">SHOP NOW</span>
            </a>
        </div>
    </div>
</form>`;
            carousel.appendChild(item);
        });

        if (uniqueProducts.length <= 1) {
            prevBtn.classList.add('hidden');
            nextBtn.classList.add('hidden');
        }
    });

    function getVisibleItems() {
        if (window.innerWidth <= 880) return 1;
        if (window.innerWidth <= 1280) return 3;
        return 4;
    }

    function getMaxIndex(material) {
        const uniqueCount = productsMap[material].categories.filter(
            (product, idx, self) => idx === self.findIndex(p => p.href === product.href)
        ).length;
        return Math.max(uniqueCount - getVisibleItems(), 0);
    }

    function updateCarousel(material) {
        const idx = products.indexOf(material);
        const carousel = carousels[idx];
        if (!carousel) return;
        const visibleItems = getVisibleItems();
        const maxIndex = getMaxIndex(material);
        carouselIndexMap[material] = Math.min(carouselIndexMap[material], maxIndex);
        const itemWidth = 100 / visibleItems;
        carousel.style.transform = `translateX(-${carouselIndexMap[material] * itemWidth}%)`;
    }

    function nextProduct(material) {
        const maxIndex = getMaxIndex(material);
        if (carouselIndexMap[material] < maxIndex) {
            carouselIndexMap[material]++;
            updateCarousel(material);
        }
    }

    function prevProduct(material) {
        if (carouselIndexMap[material] > 0) {
            carouselIndexMap[material]--;
            updateCarousel(material);
        }
    }

    products.forEach((material, index) => {
        const prevBtn = prevButtons[index];
        const nextBtn = nextButtons[index];
        const carouselContainer = carouselContainers[index];

        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => prevProduct(material));
            nextBtn.addEventListener('click', () => nextProduct(material));
        }

        if (carouselContainer) {
            let touchStartX = 0;
            let isSwiping = false;

            carouselContainer.addEventListener('touchstart', e => {
                touchStartX = e.touches[0].clientX;
                isSwiping = false;
            });
            carouselContainer.addEventListener('touchmove', e => {
                if (isSwiping) return;
                const touchMoveX = e.touches[0].clientX;
                const swipeDistance = touchStartX - touchMoveX;
                const swipeThreshold = window.innerWidth * 0.25;
                if (Math.abs(swipeDistance) > swipeThreshold) {
                    isSwiping = true;
                    swipeDistance > 0 ? nextProduct(material) : prevProduct(material);
                }
            });
            carouselContainer.addEventListener('touchend', () => { isSwiping = false; });
        }
    });

    function updateCarousels() {
        products.forEach(material => updateCarousel(material));
    }

    window.addEventListener('resize', updateCarousels);
    updateCarousels();
}

document.addEventListener('DOMContentLoaded', () => {
    initializeCarousel();
});
