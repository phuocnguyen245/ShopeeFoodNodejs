function handleInterface() {
    setTimeout(() => {
        const $ = document.querySelector.bind(document)
        const $$ = document.querySelectorAll.bind(document)

        const high = $('.content-container-right')
        const containerRightHeight = high.offsetHeight;
        const containerRightWidth = high.offsetWidth

        const unFixed = $('.content-container-left')

        const top = containerRightHeight - screen.availHeight + 50

        const scrollTop = $('.scroll-to-top')
        document.onscroll = () => {
            const scroll = document.documentElement.scrollTop
            if (scroll > top) {
                unFixed.classList.add('absolute')
                unFixed.style.top = top + 'px'
            } else {
                unFixed.classList.remove('absolute')
                unFixed.style.top = '60px'
            }
            if (scroll > screen.availHeight) {
                scrollTop.classList.add('block')
            } else {
                scrollTop.classList.remove('block')
            }
        }

        ///////////////////////////

        const navMobileItems = $$('.mobile-nav__item')
        const navMobileIcons = $$('.mobile-nav__item a i')

        for (let i = 0; i < navMobileItems.length; i++) {
            let navItem = navMobileItems[i]
            // console.log(navItem);
            let icon = navMobileIcons[i]
            navItem.onclick = () => {
                $('.mobile-nav__item a i.primary-color').classList.remove('primary-color')
                icon.classList.add('primary-color')
            }
        }

        ////////////////////////////
        const navItems = $$('.nav-item')

        window.onscroll = () => {
            for (let i = 0; i < navItems.length; i++) {
                let navItem = navItems[i]
                navItem.onclick = () => {
                    if (containerRightWidth > 738) {
                        $('.nav-item.active-color').classList.remove('active-color')
                        navItem.classList.add('active-color')
                    } else {

                    }
                }
            }
        }
    }, 500)
    const closeModalCart = document.querySelector('.close__cart')
    closeModalCart.onclick = () => {
        document.querySelector('.cart').classList.remove('open')
    }
}
handleInterface()

