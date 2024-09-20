
document.addEventListener('DOMContentLoaded', () => {

    // if (document.referrer.includes("freelancer") || document.referrer.includes("fiverr") || document.referrer.includes("upwork")) {
    //     document.getElementsByClassName('direct-access')[0].style.display = 'block'
    // } else {
    //     document.getElementById('btn-hire-me').style.display = 'block'
    // }

    // document.getElementsByClassName('direct-access')[0].style.display = 'block'

    const copyright_date = document.querySelector('.copyright > div > div:last-child p')
    const current_year = new Date().getFullYear()
    copyright_date.textContent = `Copyright © ${current_year} IshaqKhan.com`

    const current_tab_url = window.location.href

    var all_tabs = document.querySelectorAll(".parallax")
    all_tabs = Array.from(all_tabs)

    const hire_form_user = document.querySelector('.hire-form input[type=text]')
    hire_form_user.addEventListener('focus', () => {
        document.getElementById('email-icon').style.color = 'white'
        document.getElementById('user-icon').style.color = '#6bcefb'
    })
    hire_form_user.addEventListener('blur', () => {
        document.getElementById('email-icon').style.color = 'white'
        document.getElementById('user-icon').style.color = 'white'
    })
    const hire_form_email = document.querySelector('.hire-form input[type=email]')
    hire_form_email.addEventListener('focus', () => {
        document.getElementById('email-icon').style.color = '#6bcefb'
        document.getElementById('user-icon').style.color = 'white'
    })
    hire_form_email.addEventListener('blur', () => {
        document.getElementById('email-icon').style.color = 'white'
        document.getElementById('user-icon').style.color = 'white'
    })

    autoTyping()

    var scrollLinks = document.querySelectorAll('.smooth-scroll')

    scrollLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault()

            var targetId = this.getAttribute('href').substr(1)
            var targetElement = document.getElementById(targetId)

            if (targetElement) {

                var targetOffset = targetElement.offsetTop;
                var currentOffset = window.pageYOffset;
                var distance = (targetOffset - currentOffset) - 60;
                var duration = 300; // Animation duration in milliseconds
                var start;

                function step(timestamp) {
                    if (!start) start = timestamp;
                    var progress = timestamp - start;
                    var percentage = Math.min(progress / duration, 1);
                    window.scrollTo(0, currentOffset + distance * percentage);
                    if (progress < duration) {
                        window.requestAnimationFrame(step);
                    }

                }

            }
            window.requestAnimationFrame(step);
        })
    })

    window.addEventListener('scroll', handleNavbar)




    if (current_tab_url.includes("testimonials.html")) {
        const btn_testimonial = document.querySelector('.testimonials-all a')
        const btn_testimonial_arrow = document.querySelector('.testimonials-all .header button:last-child')
        buttonAnimation(btn_testimonial, btn_testimonial_arrow, 'previous')
    }

    if (current_tab_url.includes("portfolio.html")) {

        window.addEventListener('hashchange', () => {
            var hash = window.location.hash.substring(1)
            if (hash) {


                const icos = Array.from(document.querySelectorAll('.select-all-icon'))
                const deselect_icons = Array.from(document.querySelectorAll('.deselect-all-icon'))
                if (hash.toLowerCase().trim() === 'data-manipulation') {
                    deselect_icons.forEach(i => { i.click() })
                    icos[0].click()
                } else if (hash.toLowerCase().trim() === 'pdf-manipulation') {
                    deselect_icons.forEach(i => { i.click() })
                    icos[1].click()
                } else if (hash.toLowerCase().trim() === 'media-files-manipulation') {
                    deselect_icons.forEach(i => { i.click() })
                    icos[2].click()
                }

            }
        })

        const btn_port = document.querySelector('.portfolio-items-all a')
        const btn_port_arrow = document.querySelector('.portfolio-items-all .header button:last-child')

        buttonAnimation(btn_port, btn_port_arrow, 'previous')

        const all_tags = Array.from(document.querySelectorAll('.tags-selector > div:nth-child(2) span'))
        all_tags.forEach(t => {
            t.addEventListener('click', () => {
                if (t.classList.contains('tag-selected')) {
                    t.classList.remove('tag-selected')
                    togglePortfolioImages(t.textContent, 'hide')
                    const p = t.parentNode.previousElementSibling.querySelector('div i:nth-child(2)')
                    p.classList.remove('select-all-tags-icon')
                } else {

                    t.classList.add('tag-selected')

                    const tags = Array.from(t.parentNode.querySelectorAll('span'))
                    const res = tags.every(v => {
                        return v.classList.contains('tag-selected')
                    })

                    if (res === true) {
                        const p = t.parentNode.previousElementSibling.querySelector('div i:nth-child(2)')
                        p.classList.add('select-all-tags-icon')
                    }

                    togglePortfolioImages(t.textContent, 'show')
                }

            })
        })

        const select_all_icons = Array.from(document.querySelectorAll('.tags-selector > div > div i:nth-child(2)'))
        select_all_icons.forEach(i => {
            i.addEventListener('click', () => {
                i.classList.add('select-all-tags-icon')

                const temp = Array.from(i.parentNode.parentNode.nextElementSibling.querySelectorAll('span'))
                console.log(temp)
                temp.forEach(t => {
                    t.classList.add('tag-selected')
                    togglePortfolioImages(t.textContent, 'show')
                })
            })
        })

        const deselect_all_icons = Array.from(document.querySelectorAll('.tags-selector > div > div i:last-child'))
        deselect_all_icons.forEach(i => {
            i.addEventListener('click', () => {

                const temp = Array.from(i.parentNode.parentNode.nextElementSibling.querySelectorAll('span'))
                temp.forEach(t => {
                    t.classList.remove('tag-selected')
                    togglePortfolioImages(t.textContent, 'hide')
                })

                i.previousElementSibling.classList.remove('select-all-tags-icon')
            })
        })

        const desc_all_icons = Array.from(document.querySelectorAll('.tags-selector > div > div i:first-child'))
        desc_all_icons.forEach(icon => {

            icon.addEventListener('click', () => {
                alert('INFO BUTTON IS WORKING!!!')
                const associated_div = icon.parentNode.parentNode.nextElementSibling.nextElementSibling


                const is_visible = associated_div.style.display === 'block'

                desc_all_icons.forEach(other_icon => {
                    const other_div = other_icon.parentNode.parentNode.nextElementSibling.nextElementSibling
                    if (other_div !== associated_div) {
                        other_div.style.opacity = '0'
                        setTimeout(() => {
                            other_div.style.display = 'none'
                        }, 300)
                    }
                })

                if (!is_visible) {
                    associated_div.style.opacity = '0'
                    associated_div.style.display = 'block'
                    setTimeout(() => {
                        associated_div.style.opacity = '1'
                    }, 50)
                } else {
                    associated_div.style.opacity = '0'
                    setTimeout(() => {
                        associated_div.style.display = 'none'
                    }, 300)
                }
            })
        })


    }

    if (current_tab_url.includes("commercial-software.html")) {
        const btn_com_soft = document.querySelector('.com-soft-all a')
        const btn_com_soft_arrow = document.querySelector('.com-soft-all .header button:last-child')
        buttonAnimation(btn_com_soft, btn_com_soft_arrow, 'previous')
    }

    if (current_tab_url.includes("top-clients.html")) {
        const btn_top_clients = document.querySelector('.top-clients-all a')
        const btn_top_clients_arrow = document.querySelector('.top-clients-all .header button:last-child')
        buttonAnimation(btn_top_clients, btn_top_clients_arrow, 'previous')
    }

    if (current_tab_url.includes("index.html")) {

        window.addEventListener('scroll', aboutVideo)

        checkVisibility()
        window.addEventListener('scroll', checkVisibility)

        const testimonials = document.querySelectorAll('.testimonial-txt')
        switchContent(testimonials)

        const clients = document.querySelectorAll('.top-client-info')
        switchContent(clients)

        const portfolio_items = document.querySelectorAll('.portfolio-items-list > div')
        const portfolio_items_dots = Array.from(document.querySelectorAll('.portfolio-pagination span'))
        portfolio_items_dots.forEach(d => {
            d.addEventListener('click', changePortfolioDot)
        })

        const soft_items = document.querySelectorAll('.com-soft-list > div')
        const soft_items_dots = Array.from(document.querySelectorAll('.soft-pagination span'))
        soft_items_dots.forEach(d => {
            d.addEventListener('click', changeSoftwareDot)
        })

        switchContentPortfolio(portfolio_items)
        switchContentSoftware(soft_items)

        const btn_testimonial = document.querySelector('.testimonials a')
        const btn_testimonial_arrow = document.querySelector('.testimonials button:last-child')

        const btn_clients = document.querySelector('.top-clients a')
        const btn_clients_arrow = document.querySelector('.top-clients button:last-child')

        const btn_portfolio = document.querySelector('.portfolio-items a')
        const btn_portfolio_arrow = document.querySelector('.portfolio-items button:last-child')

        const btn_soft = document.querySelector('.com-soft a')
        const btn_soft_arrow = document.querySelector('.com-soft button:last-child')

        var scrollLinks = document.querySelectorAll('.smooth-scroll')

        scrollLinks.forEach(function (link) {
            link.addEventListener('click', function (e) {
                e.preventDefault()

                var targetId = this.getAttribute('href').substr(1)
                var targetElement = document.getElementById(targetId)

                if (targetElement) {

                    var targetOffset = targetElement.offsetTop;
                    var currentOffset = window.pageYOffset;
                    var distance = (targetOffset - currentOffset) - 60;
                    var duration = 300; // Animation duration in milliseconds
                    var start;

                    function step(timestamp) {
                        if (!start) start = timestamp;
                        var progress = timestamp - start;
                        var percentage = Math.min(progress / duration, 1);
                        window.scrollTo(0, currentOffset + distance * percentage);
                        if (progress < duration) {
                            window.requestAnimationFrame(step);
                        }

                    }

                }
                window.requestAnimationFrame(step);
            })
        })

        window.addEventListener('scroll', handleNavbar)

        buttonAnimation(btn_testimonial, btn_testimonial_arrow, 'next')
        buttonAnimation(btn_clients, btn_clients_arrow, 'next')
        buttonAnimation(btn_portfolio, btn_portfolio_arrow, 'next')
        buttonAnimation(btn_soft, btn_soft_arrow, 'next')
    }

})

var portfolio_dot = 0
var switch_portfolio = true
var portfolio_interval;

var soft_dot = 0
var switch_soft = true
var soft_interval;

var tot_portfolio_items_loaded = 0

const autoTyping = () => {
    //set animation timing
    var animationDelay = 2500,
        //loading bar effect
        barAnimationDelay = 3800,
        barWaiting = barAnimationDelay - 3000, //3000 is the duration of the transition on the loading bar - set in the scss/css file
        //letters effect
        lettersDelay = 50,
        //type effect
        typeLettersDelay = 150,
        selectionDuration = 500,
        typeAnimationDelay = selectionDuration + 800,
        //clip effect
        revealDuration = 2500,
        revealAnimationDelay = 1800;

    initHeadline();

    function initHeadline() {
        //insert <i> element for each letter of a changing word
        singleLetters($(".cd-headline.letters").find("b"));
        //initialise headline animation
        animateHeadline($(".cd-headline"));
    }

    function singleLetters($words) {
        $words.each(function () {
            var word = $(this),
                letters = word.text().split(""),
                selected = word.hasClass("is-visible");
            for (i in letters) {
                if (word.parents(".rotate-2").length > 0)
                    letters[i] = "<em>" + letters[i] + "</em>";
                letters[i] = selected
                    ? '<i class="in">' + letters[i] + "</i>"
                    : "<i>" + letters[i] + "</i>";
            }
            var newLetters = letters.join("");
            word.html(newLetters).css("opacity", 1);
        });
    }

    function animateHeadline($headlines) {
        var duration = animationDelay;
        $headlines.each(function () {
            var headline = $(this);

            if (headline.hasClass("loading-bar")) {
                duration = barAnimationDelay;
                setTimeout(function () {
                    headline.find(".cd-words-wrapper").addClass("is-loading");
                }, barWaiting);
            } else if (headline.hasClass("clip")) {
                var spanWrapper = headline.find(".cd-words-wrapper"),
                    newWidth = spanWrapper.width() + 10;
                spanWrapper.css("width", newWidth);
            } else if (!headline.hasClass("type")) {
                //assign to .cd-words-wrapper the width of its longest word
                var words = headline.find(".cd-words-wrapper b"),
                    width = 0;
                words.each(function () {
                    var wordWidth = $(this).width();
                    if (wordWidth > width) width = wordWidth;
                });
                headline.find(".cd-words-wrapper").css("width", width);
            }

            //trigger animation
            setTimeout(function () {
                hideWord(headline.find(".is-visible").eq(0));
            }, duration);
        });
    }

    function hideWord($word) {
        $(".cursor").removeClass("blinking");
        var nextWord = takeNext($word);

        if ($word.parents(".cd-headline").hasClass("type")) {
            var parentSpan = $word.parent(".cd-words-wrapper");
            parentSpan.addClass("selected").removeClass("waiting");
            setTimeout(function () {
                parentSpan.removeClass("selected");
                $word
                    .removeClass("is-visible")
                    .addClass("is-hidden")
                    .children("i")
                    .removeClass("in")
                    .addClass("out");
            }, selectionDuration);
            setTimeout(function () {
                showWord(nextWord, typeLettersDelay);
            }, typeAnimationDelay);
        } else if ($word.parents(".cd-headline").hasClass("letters")) {
            var bool =
                $word.children("i").length >= nextWord.children("i").length
                    ? true
                    : false;
            hideLetter($word.find("i").eq(0), $word, bool, lettersDelay);
            showLetter(nextWord.find("i").eq(0), nextWord, bool, lettersDelay);
        } else if ($word.parents(".cd-headline").hasClass("clip")) {
            $word.parents(".cd-words-wrapper").animate(
                {
                    width: "2px",
                },
                revealDuration,
                function () {
                    switchWord($word, nextWord);
                    showWord(nextWord);
                }
            );
        } else if ($word.parents(".cd-headline").hasClass("loading-bar")) {
            $word.parents(".cd-words-wrapper").removeClass("is-loading");
            switchWord($word, nextWord);
            setTimeout(function () {
                hideWord(nextWord);
            }, barAnimationDelay);
            setTimeout(function () {
                $word.parents(".cd-words-wrapper").addClass("is-loading");
            }, barWaiting);
        } else {
            switchWord($word, nextWord);
            setTimeout(function () {
                hideWord(nextWord);
            }, animationDelay);
        }
    }

    function showWord($word, $duration) {
        // $(".cursor").removeClass("blinking");
        if ($word.parents(".cd-headline").hasClass("type")) {
            showLetter($word.find("i").eq(0), $word, false, $duration);
            $word.addClass("is-visible").removeClass("is-hidden");
        } else if ($word.parents(".cd-headline").hasClass("clip")) {
            $word.parents(".cd-words-wrapper").animate(
                {
                    width: $word.width() + 10,
                },
                revealDuration,
                function () {
                    $(".cursor").addClass("blinking");
                    setTimeout(function () {
                        hideWord($word);
                    }, revealAnimationDelay);
                }
            );
        }
    }

    function hideLetter($letter, $word, $bool, $duration) {
        $letter.removeClass("in").addClass("out");

        if (!$letter.is(":last-child")) {
            setTimeout(function () {
                hideLetter($letter.next(), $word, $bool, $duration);
            }, $duration);
        } else if ($bool) {
            setTimeout(function () {
                hideWord(takeNext($word));
            }, animationDelay);
        }

        if ($letter.is(":last-child") && $("html").hasClass("no-csstransitions")) {
            var nextWord = takeNext($word);
            switchWord($word, nextWord);
        }
    }

    function showLetter($letter, $word, $bool, $duration) {
        $letter.addClass("in").removeClass("out");

        if (!$letter.is(":last-child")) {
            setTimeout(function () {
                showLetter($letter.next(), $word, $bool, $duration);
            }, $duration);
        } else {
            if ($word.parents(".cd-headline").hasClass("type")) {
                setTimeout(function () {
                    $word.parents(".cd-words-wrapper").addClass("waiting");
                }, 200);
            }
            if (!$bool) {
                setTimeout(function () {
                    hideWord($word);
                }, animationDelay);
            }
        }
    }

    function takeNext($word) {
        return !$word.is(":last-child")
            ? $word.next()
            : $word.parent().children().eq(0);
    }

    function takePrev($word) {
        return !$word.is(":first-child")
            ? $word.prev()
            : $word.parent().children().last();
    }

    function switchWord($oldWord, $newWord) {
        $oldWord.removeClass("is-visible").addClass("is-hidden");
        $newWord.removeClass("is-hidden").addClass("is-visible");
    }
}

const buttonAnimation = (btn, btn_arrow, t_b) => {
    const target_element = t_b === 'next' ? btn.nextElementSibling : btn.previousElementSibling

    const applyAnimation = () => {
        $(target_element).css('transform', `translate(${t_b === 'next' ? '6' : '-6'}px, 0)`)
    }

    const resetAnimation = () => {
        $(target_element).css('transform', 'translate(0, 0)')
    }

    $(btn).add(btn_arrow).on({
        mouseenter: applyAnimation,
        mouseleave: resetAnimation
    })
}


const switchContent = (d) => {
    const data = Array.from(d)
    let current_index = 0

    const switchToNext = () => {
        const active_t = data[current_index]
        data.forEach(t => {
            $(t).removeClass('data-active').css('z-index', '0')
        })
        $(active_t).addClass('data-active')
        current_index = (current_index + 1) % data.length
    }

    switchToNext()
    portfolio_interval = setInterval(switchToNext, 5000)
}

let intervalId
let current_index_global = 0

const switchContentPortfolio = (d) => {
    const data = Array.from(d)
    const length = data.length

    const switchToNext = () => {
        const active_t = data[current_index_global]

        const active_t_h = active_t.offsetHeight

        const holder = $('.portfolio-items')
        holder.css('height', `${active_t_h + 150}px`)

        data.forEach((t) => {
            t.classList.remove('data-active')
        })

        active_t.classList.add('data-active')
        current_index_global = (current_index_global + 1) % length
    }

    // Initial switch
    switchToNext()

    // Set interval to switch every 5000 milliseconds
    intervalId = setInterval(switchToNext, 5000)
}

const changePortfolioDot = (event) => {
    const clicked_dot = $(event.target)
    const parent = clicked_dot.parent()
    const index = parent.children().index(clicked_dot)

    const data = $('.portfolio-items-list > div')
    const active_t = data.eq(index)

    data.removeClass('data-active').css('z-index', '0')
    active_t.addClass('data-active')

    current_index_global = index

    clearInterval(intervalId)
    switchContentPortfolio(data)
}

let intervalId_2
let current_index_global_2 = 0

const switchContentSoftware = (d) => {

    const data = $(d)
    const length = data.length

    const switchToNext = () => {
        const active_t = data.eq(current_index_global_2)

        const active_t_h = active_t.outerHeight()
        const holder = $('.com-soft')
        holder.css('height', active_t_h + 150 + 'px')

        data.removeClass('data-active').css('z-index', '0')
        active_t.addClass('data-active')
        current_index_global_2 = (current_index_global_2 + 1) % length
    }

    // Initial switch
    switchToNext()

    // Set interval to switch every 5000 milliseconds
    intervalId_2 = setInterval(switchToNext, 5000)
}


const changeSoftwareDot = (event) => {
    const clicked_dot = $(event.target)
    const index = $(clicked_dot).index()

    const data = $('.com-soft-list > div')
    const active_t = data.eq(index)

    data.removeClass('data-active')
    active_t.addClass('data-active')

    current_index_global_2 = index

    clearInterval(intervalId_2)
    switchContentSoftware(data)
}


const handleNavbar = () => {
    const scroll_position = $(window).scrollTop()
    const n = $('nav')
    n.css('backgroundColor', scroll_position > 1 ? 'black' : 'transparent')
        .css('boxShadow', scroll_position > 1 ? '0 4px 8px rgba(0, 0, 0, 0.7)' : 'none')
}

const getElementVisibleHeight = (element) => {
    const elementRect = $(element).get(0).getBoundingClientRect()
    const viewport_height = $(window).height()

    const top = Math.max(elementRect.top, 0)
    const bottom = Math.min(elementRect.bottom, viewport_height)

    const visible_height = bottom - top;
    return (visible_height / $(element).height()) * 100
}


const checkVisibility = () => {

    const all_tabs = Array.from(document.querySelectorAll('.parallax'))
    const all_tabs_nav = Array.from(document.querySelectorAll('nav a'))
    const all_tabs_icons = Array.from(document.querySelectorAll('.nav-icons i'))

    for (let i = 0; i < all_tabs.length; i++) {

        if (getElementVisibleHeight(all_tabs[i]) >= 30) {
            let page = all_tabs[i].getAttribute("id")
            if (page === "services") {
                const active_tab = document.getElementById("services-tab")
                const active_tab_icon_skill = document.querySelector("#services-tab i")
                all_tabs_nav.forEach(t => {
                    t.style.color = 'white'
                })

                all_tabs_icons.forEach(i => {
                    i.style.color = 'white'
                })

                active_tab.style.color = '#5ac9f9'
                active_tab_icon_skill.style.color = '#5ac9f9'
                break;

            }
            else if (page === "testimonials") {
                const active_tab = document.getElementById("testimonials-tab")
                const active_tab_icon_test = document.querySelector("#testimonials-tab i")
                all_tabs_nav.forEach(t => {
                    t.style.color = 'white'
                })

                all_tabs_icons.forEach(i => {
                    i.style.color = 'white'
                })

                active_tab.style.color = '#5ac9f9'
                active_tab_icon_test.style.color = '#5ac9f9'
                break;

            }
            else if (page === "top-clients") {
                const active_tab = document.getElementById("top-clients-tab")
                const active_tab_i_clients = document.querySelector("#top-clients-tab i")
                all_tabs_nav.forEach(t => {
                    t.style.color = 'white'
                })

                all_tabs_icons.forEach(i => {
                    i.style.color = 'white'
                })

                active_tab.style.color = '#5ac9f9'
                active_tab_i_clients.style.color = '#5ac9f9'
                break;

            }
            else if (page === "portfolio-items") {
                const active_tab = document.getElementById("portfolio-items-tab")
                const active_tab_i_port = document.querySelector("#portfolio-items-tab i")
                all_tabs_nav.forEach(t => {
                    t.style.color = 'white'
                })

                all_tabs_icons.forEach(i => {
                    i.style.color = 'white'
                })

                active_tab.style.color = '#5ac9f9'
                active_tab_i_port.style.color = '#5ac9f9'
                break;
            }
            else if (page === "commercial-software") {
                const active_tab = document.getElementById("com-soft-tab")
                const active_tab_i_com = document.querySelector("#com-soft-tab i")
                all_tabs_nav.forEach(t => {
                    t.style.color = 'white'
                })

                all_tabs_icons.forEach(i => {
                    i.style.color = 'white'
                })

                active_tab.style.color = '#5ac9f9'
                active_tab_i_com.style.color = '#5ac9f9'
                break;
            }
            else if (page === "about-me") {
                const active_tab = document.getElementById("about-me-tab")
                const active_tab_i_about = document.querySelector("#about-me-tab i")
                all_tabs_nav.forEach(t => {
                    t.style.color = 'white'
                })

                all_tabs_icons.forEach(i => {
                    i.style.color = 'white'
                })

                active_tab.style.color = '#5ac9f9'
                active_tab_i_about.style.color = '#5ac9f9'
                break;
            }
        }
    }

}

const showForm = (t_b) => {

    const hire_form = document.querySelector('.hire-form')
    hire_form.style.display = 'block'
    const all_secs = Array.from(document.querySelectorAll('body > div'))
    for (let i = 1; i < all_secs.length - 1; i++) {
        all_secs[i].style.filter = 'brightness(30%)'
        all_secs[i].addEventListener('click', hideForm)
    }

    if (t_b === 'index') {
        document.querySelector('nav').style.filter = 'brightness(30%)'
        document.querySelector('.services').style.filter = 'brightness(30%)'
        document.querySelector('.services').addEventListener('click', hideForm)
        document.querySelector('.hire-form input[type=text]').focus()
    } else if (t_b === 'testimonials') {
        document.querySelector('nav').style.filter = 'brightness(30%)'
        document.querySelector('.testimonials-holder').style.filter = 'brightness(30%)'
        document.querySelector('.testimonials-holder').addEventListener('click', hideForm)
        document.querySelector('h1').style.filter = 'brightness(30%)'
        document.querySelector('h1').addEventListener('click', hideForm)
        document.querySelector('.services').style.filter = 'brightness(30%)'
        document.querySelector('.services').addEventListener('click', hideForm)
        document.querySelector('.hire-form input[type=text]').focus()
    } else if (t_b === 'top-clients') {
        document.querySelector('nav').style.filter = 'brightness(30%)'
        document.querySelector('.top-clients-holder').style.filter = 'brightness(30%)'
        document.querySelector('.top-clients-holder').addEventListener('click', hideForm)
        document.querySelector('h1').style.filter = 'brightness(30%)'
        document.querySelector('h1').addEventListener('click', hideForm)
        document.querySelector('.services').style.filter = 'brightness(30%)'
        document.querySelector('.services').addEventListener('click', hideForm)
        document.querySelector('.hire-form input[type=text]').focus()
    } else if (t_b === 'com-soft') {
        document.querySelector('nav').style.filter = 'brightness(30%)'
        document.querySelector('.com-soft-holder').style.filter = 'brightness(30%)'
        document.querySelector('.com-soft-holder').addEventListener('click', hideForm)
        document.querySelector('h1').style.filter = 'brightness(30%)'
        document.querySelector('h1').addEventListener('click', hideForm)
        document.querySelector('.services').style.filter = 'brightness(30%)'
        document.querySelector('.services').addEventListener('click', hideForm)
        document.querySelector('.hire-form input[type=text]').focus()
    } else {
        document.querySelector('nav').style.filter = 'brightness(30%)'
        document.querySelector('.portfolio-items-holder').style.filter = 'brightness(30%)'
        document.querySelector('.portfolio-items-holder').addEventListener('click', hideForm)
        document.querySelector('h1').style.filter = 'brightness(30%)'
        document.querySelector('h1').addEventListener('click', hideForm)
        document.querySelector('.services').style.filter = 'brightness(30%)'
        document.querySelector('.services').addEventListener('click', hideForm)
        document.querySelector('.hire-form input[type=text]').focus()
    }

}

const hideForm = () => {

    const hire_form = document.querySelector('.hire-form')
    hire_form.style.display = 'none'
    const all_secs = Array.from(document.querySelectorAll('body > div'))
    for (let i = 1; i < all_secs.length - 1; i++) {
        all_secs[i].style.filter = 'brightness(100%)'
    }
    document.querySelector('nav').style.filter = 'brightness(100%)'
    document.querySelector('.services').style.filter = 'brightness(100%)'

    document.querySelector('h1').style.filter = 'brightness(100%)'
    if (document.querySelector('.testimonials-holder')) {
        document.querySelector('.testimonials-holder').style.filter = 'brightness(100%)'
    }

    if (document.querySelector('.top-clients-holder')) {
        document.querySelector('.top-clients-holder').style.filter = 'brightness(100%)'
    }

    if (document.querySelector('.com-soft-holder')) {
        document.querySelector('.com-soft-holder').style.filter = 'brightness(100%)'
    }

    if (document.querySelector('.portfolio-items-holder')) {
        document.querySelector('.portfolio-items-holder').style.filter = 'brightness(100%)'
    }

}

const togglePortfolioImages = (t, flag) => {
    const all_ports = database
    
    const tag = t.toLowerCase().replaceAll(' ', '-').replaceAll('/', '-')

    const all_tags_names = []

    if (flag === 'show') {
        
        let html = ''
        all_ports.forEach(p => {
            console.log(p)
            all_tags_names.push(...p.tags)
            if (p.tags.includes(tag)) {
                
                 html += `

                    <div class="${p.tags.join(' ')}">
                        <div><img src="${p.img}" onclick="window.open('${p.img}', '_blank')" alt=""></div>
                        <div onclick="window.open('${p.img}', '_blank')"><p>${p.name}</p></div>
                    </div>
                `

            }
        })

        document.querySelector('.portfolio-items-holder').innerHTML += html

        const all_available_tags = Array.from(new Set(all_tags_names))

        all_available_tags.forEach(t_g => {

            removeDuplicates(document.querySelectorAll(`.${t_g} > div:last-child > p`))
    

        })




    } else {
        const all_ports_del = $('.portfolio-items-holder > div')
        all_ports_del.each((_, p) => {
            if ($(p).hasClass(tag)) {
                const temp = $('.sec-tags > span.tag-selected')
                const res = temp.toArray().every(ele => !$(p).hasClass($(ele).text().toLowerCase().replaceAll(' ', '-').replaceAll('/', '-')))
                if (res) $(p).remove()
            }
        })
    }

    tot_portfolio_items_loaded = document.querySelector('.portfolio-items-holder').children.length;
    document.querySelector('#portfolio_count_lbl').innerHTML = `Total ${tot_portfolio_items_loaded} item${tot_portfolio_items_loaded == 1 ? '' : 's'} loaded${tot_portfolio_items_loaded == 0 ? ' — please select at least one tag' : ''}`
}

const removeDuplicates = e => {
    const uniqueContents = new Set()
    $(e).each((i, p) => {
        const content = $(p).text().trim()
        console.log(content)
        uniqueContents.has(content) ? $(p).parent().parent().remove() : uniqueContents.add(content)
    })
}

const aboutVideo = () => {
    const $element = $('#about-me-pic')
    const isFullyVisible = ($elem) => {
        const rect = $elem[0].getBoundingClientRect()
        return rect.top >= 0 && rect.bottom <= $(window).height()
    }
    const $vid = $('#about-me-pic video')
    isFullyVisible($element) ? $vid[0].play() : $vid[0].pause()
}

const database = [
    {'img': 'portfolio_items/001_hke.png', 'name': 'Experiment Data Organizer', 'tags': ['csv-xlsx']},
    {'img': 'portfolio_items/002_lig.png', 'name': 'Database Updater', 'tags': ['csv-xlsx']},
    {'img': 'portfolio_items/003_khd.png', 'name': 'Price Reporting Tool', 'tags': ['csv-xlsx']},
    {'img': 'portfolio_items/004_jxn.png', 'name': 'Triads/Pairs Generator', 'tags': ['text-data']},
    {'img': 'portfolio_items/005_qix.png', 'name': 'Text Cleanup Tool', 'tags': ['text-data']},
    {'img': 'portfolio_items/006_qhb.png', 'name': 'Qualys Data Retriever', 'tags': ['csv-xlsx', 'xml', 'api']},
    {'img': 'portfolio_items/007_anm.png', 'name': 'QCToCombined', 'tags': ['csv-xlsx']},
    {'img': 'portfolio_items/008_jhc.png', 'name': 'Reflight Guide Creator', 'tags': ['csv-xlsx']},
    {'img': 'portfolio_items/009_ldv.png', 'name': 'FilteredToQC', 'tags': ['csv-xlsx', 'intensive-guis']},
    {'img': 'portfolio_items/010_kfx.png', 'name': 'Batch Excel Filter', 'tags': ['csv-xlsx']},
    {'img': 'portfolio_items/011_nys.png', 'name': 'Non-disclosure (Random name: TTR456)', 'tags': ['csv-xlsx', 'generate-pdf', 'pdf-merge']},
    {'img': 'portfolio_items/011_nys_2.png', 'name': 'TTR456 Output', 'tags': ['csv-xlsx', 'generate-pdf', 'pdf-merge']},
    {'img': 'portfolio_items/012_sub.png', 'name': 'CSV Splitter', 'tags': ['csv-xlsx']},
    {'img': 'portfolio_items/013_lvt.png', 'name': 'Non-disclosure (Random name: HYV398)', 'tags': ['generate-pdf']},
    {'img': 'portfolio_items/013_lvt_2.png', 'name': 'HYV398 Output', 'tags': ['generate-pdf']},
    {'img': 'portfolio_items/014_ogd.png', 'name': 'Pick List Summary', 'tags': ['csv-xlsx', 'html']},
    {'img': 'portfolio_items/015_jhq.png', 'name': 'Ship Label Marker (OCR)', 'tags': ['ocr']},
    {'img': 'portfolio_items/016_nuc.png', 'name': 'Reports Generator', 'tags': ['csv-xlsx']},
    {'img': 'portfolio_items/017_ncp.png', 'name': 'BatchExcelReplace', 'tags': ['csv-xlsx']},
    {'img': 'portfolio_items/018_nqb.png', 'name': 'Allan Grid Maker', 'tags': ['csv-xlsx']},
    {'img': 'portfolio_items/019_ftc.png', 'name': 'Batch Excel Changer', 'tags': ['csv-xlsx']},
    {'img': 'portfolio_items/020_gdm.png', 'name': 'Data Appender', 'tags': ['csv-xlsx']},
    {'img': 'portfolio_items/021_zns.png', 'name': 'Count Sorter - output screenshot', 'tags': ['csv-xlsx']},
    {'img': 'portfolio_items/022_tzu.png', 'name': 'Count Sorter - output screenshot 2', 'tags': ['csv-xlsx']},
    {'img': 'portfolio_items/023_wav.png', 'name': 'CSV Mapping Tool', 'tags': ['csv-xlsx']},
    {'img': 'portfolio_items/024_ztf.png', 'name': 'Raw Data to Template', 'tags': ['csv-xlsx']},
    {'img': 'portfolio_items/025_zpf.png', 'name': 'JSON Reformat', 'tags': ['json']},
    {'img': 'portfolio_items/026_bxj.png', 'name': 'Charts - output', 'tags': ['charts']},
    {'img': 'portfolio_items/027_dgx.png', 'name': 'Data Filter + Merge', 'tags': ['csv-xlsx']},
    {'img': 'portfolio_items/028_ajc.png', 'name': 'Code Lines Filter', 'tags': ['csv-xlsx']},
    {'img': 'portfolio_items/029_mla.png', 'name': 'Raji Combinations', 'tags': ['text-data']},
    {'img': 'portfolio_items/030_cup.png', 'name': 'Raji Combinations - screenshot 2', 'tags': ['text-data']},
    {'img': 'portfolio_items/031_skr.png', 'name': 'Text Replacer', 'tags': ['csv-xlsx']},
    {'img': 'portfolio_items/032_gbj.png', 'name': 'Charts - output 2', 'tags': ['charts']},
    {'img': 'portfolio_items/033_zgk.png', 'name': 'Charts - output 3', 'tags': ['charts']},
    {'img': 'portfolio_items/034_oxs.png', 'name': 'Charts - output 4', 'tags': ['charts']},
    {'img': 'portfolio_items/035_svq.png', 'name': 'Product Fuzzy Matcher', 'tags': ['csv-xlsx']},
    {'img': 'portfolio_items/036_zuk.png', 'name': 'Batch XML Replace', 'tags': ['xml']},
    {'img': 'portfolio_items/037_mvi.png', 'name': 'DOCX to Excel', 'tags': ['csv-xlsx', 'docx']},
    {'img': 'portfolio_items/038_xdh.png', 'name': 'Ottoinvoicer', 'tags': ['csv-xlsx']},
    {'img': 'portfolio_items/039_rfe.png', 'name': 'USD Raise Counter', 'tags': ['text-data']},
    {'img': 'portfolio_items/040_wpn.png', 'name': 'IcyLeads CSVs Refiner', 'tags': ['csv-xlsx']},
    {'img': 'portfolio_items/041_ruo.png', 'name': 'Nabil DBExcel Converter', 'tags': ['csv-xlsx', 'sqlite-database']},
    {'img': 'portfolio_items/042_cdp.png', 'name': 'Flick Shots Organizer - output', 'tags': ['csv-xlsx']},
    {'img': 'portfolio_items/043_fbu.png', 'name': 'DM Scraper', 'tags': ['csv-xlsx', 'html']},
    {'img': 'portfolio_items/044_onc.png', 'name': 'HTML Advert Tool', 'tags': ['html']},
    {'img': 'portfolio_items/045_ovk.png', 'name': 'Nabil Quran Searcher', 'tags': ['csv-xlsx', 'text-data']},
    {'img': 'portfolio_items/046_cfa.png', 'name': 'Nabil Quran Searcher - output', 'tags': ['csv-xlsx', 'text-data']},
    {'img': 'portfolio_items/047_yvj.png', 'name': 'Nabil Quran Searcher - output 2', 'tags': ['csv-xlsx', 'text-data']},
    {'img': 'portfolio_items/048_mgk.png', 'name': 'Poker Report Generator', 'tags': ['csv-xlsx']},
    {'img': 'portfolio_items/049_bxw.png', 'name': 'Poker Report Generator - screenshot 2', 'tags': ['csv-xlsx']},
    {'img': 'portfolio_items/050_cpf.png', 'name': 'Poker Report Generator - output', 'tags': ['csv-xlsx']},
    {'img': 'portfolio_items/051_foy.png', 'name': 'Poker Report Generator - output 2', 'tags': ['csv-xlsx']},
    {'img': 'portfolio_items/052_mex.png', 'name': 'Image Record Generator', 'tags': ['csv-xlsx', 'html', 'generate-pdf']},
    {'img': 'portfolio_items/053_qab.png', 'name': 'GPS Re-Matcher', 'tags': ['text-data', 'csv-xlsx']},
    {'img': 'portfolio_items/053_qab_2.png', 'name': 'GPS Re-Matcher - output', 'tags': ['text-data', 'csv-xlsx']},
    {'img': 'portfolio_items/054_gxk.png', 'name': 'CMX EDLs Merger', 'tags': ['edl']},
    {'img': 'portfolio_items/055_atw.png', 'name': 'Output screenshot (Random name: UIO038)', 'tags': ['csv-xlsx']},
    {'img': 'portfolio_items/056_ymk.png', 'name': 'Mahmud Email Suite', 'tags': ['text-data']},
    {'img': 'portfolio_items/057_xku.png', 'name': 'Mahmud Email Suite - screenshot 2', 'tags': ['text-data']},
    {'img': 'portfolio_items/058_xpr.png', 'name': 'Mahmud Email Suite - screenshot 3', 'tags': ['text-data']},
    {'img': 'portfolio_items/059_zsn.png', 'name': 'Mahmud Email Suite - screenshot 4', 'tags': ['text-data']},
    {'img': 'portfolio_items/060_arm.png', 'name': 'Keywords Matching Tool', 'tags': ['csv-xlsx']},
    {'img': 'portfolio_items/061_zga.png', 'name': 'Tim Amazon Summary', 'tags': ['csv-xlsx', 'html']},
    {'img': 'portfolio_items/062_ext.png', 'name': 'CSV Conversion Tool', 'tags': ['csv-xlsx', 'merge-pdfs', 'download', 'convert-image', 'edit-image', 'generate-pdf']},
    {'img': 'portfolio_items/062_ext_2.png', 'name': 'CSV Conversion Tool - output', 'tags': ['csv-xlsx', 'merge-pdfs', 'download', 'convert-image', 'edit-image', 'generate-pdf']},
    {'img': 'portfolio_items/062_ext_3.png', 'name': 'CSV Conversion Tool - output 2', 'tags': ['csv-xlsx', 'merge-pdfs', 'download', 'convert-image', 'edit-image', 'generate-pdf']},
    {'img': 'portfolio_items/063_yde.png', 'name': 'Bundle Unpack Tool', 'tags': ['csv-xlsx']},
    {'img': 'portfolio_items/064_nob.png', 'name': 'Regex Match Info', 'tags': ['csv-xlsx', 'text-data']},
    {'img': 'portfolio_items/065_frk.png', 'name': 'Beta Visualizer', 'tags': ['csv-xlsx']},
    {'img': 'portfolio_items/065_frk_2.png', 'name': 'Beta Visualizer - screenshot 2', 'tags': ['csv-xlsx']},
    {'img': 'portfolio_items/066_ypa.png', 'name': 'Charts - output 5', 'tags': ['charts']},
    {'img': 'portfolio_items/067_olk.png', 'name': 'Data Aggregator', 'tags': ['csv-xlsx']},
    {'img': 'portfolio_items/068_qri.png', 'name': 'LidarFinalizer', 'tags': ['text-data']},
    {'img': 'portfolio_items/069_sgz.png', 'name': 'BRHM', 'tags': ['csv-xlsx']},
    {'img': 'portfolio_items/069_sgz_2.png', 'name': 'BRHM - output', 'tags': ['csv-xlsx']},
    {'img': 'portfolio_items/070_xhr.png', 'name': 'Output screenshot (Random name: YUR481)', 'tags': ['csv-xlsx']},
    {'img': 'portfolio_items/071_ojr.png', 'name': 'Excel File Merge (EFM)', 'tags': ['csv-xlsx']},
    {'img': 'portfolio_items/072_zxr.png', 'name': 'Image PickerGo', 'tags': ['csv-xlsx']},
    {'img': 'portfolio_items/073_nxu.png', 'name': 'SQLite DB to CSV Chunks', 'tags': ['csv-xlsx', 'sqlite-database']},
    {'img': 'portfolio_items/074_sun.png', 'name': 'Datacenter Report Extend', 'tags': ['csv-xlsx']},
    {'img': 'portfolio_items/075_jva.png', 'name': 'Charts - output 6', 'tags': ['charts']},
    {'img': 'portfolio_items/076_puk.png', 'name': 'Quote Formatter', 'tags': ['text-data', 'clipboard']},
    {'img': 'portfolio_items/077_tvd.png', 'name': 'Sun Angle Spec Checker', 'tags': ['csv-xlsx']},
    {'img': 'portfolio_items/078_sjt.png', 'name': 'Template Transcript Merger', 'tags': ['watch-folder', 'docx', 'text-data', 'move']},
    {'img': 'portfolio_items/079_bzn.png', 'name': 'M Docs', 'tags': ['docx', 'csv-xlsx', 'watch-folder', 'delete']},
    {'img': 'portfolio_items/080_jfk.png', 'name': 'Sheets Merge + Pick Fields', 'tags': ['csv-xlsx']},
    {'img': 'portfolio_items/081_gvt.png', 'name': 'Salary Compare', 'tags': ['csv-xlsx']},
    {'img': 'portfolio_items/082_lyk.png', 'name': 'Salary Compare - output', 'tags': ['csv-xlsx']},
    {'img': 'portfolio_items/083_due.png', 'name': 'McRib', 'tags': ['watch-folder', 'csv-xlsx', 'copy', 'delete']},
    {'img': 'portfolio_items/084_ujn.png', 'name': 'ETH Trades Daily Summarize', 'tags': ['csv-xlsx']},
    {'img': 'portfolio_items/085_ben.png', 'name': 'Normalize CSV for WooCommerce', 'tags': ['csv-xlsx']},
    {'img': 'portfolio_items/086_dxc.png', 'name': 'Crypto Trades Daily Summarize', 'tags': ['csv-xlsx']},
    {'img': 'portfolio_items/087_hyv.png', 'name': 'Crypto Trades Daily Summarize - output', 'tags': ['csv-xlsx']},
    {'img': 'portfolio_items/088_ksj.png', 'name': 'Code Tool', 'tags': ['text-data']},
    {'img': 'portfolio_items/089_yut.png', 'name': 'Stocks Time Aligner', 'tags': ['csv-xlsx']},
    {'img': 'portfolio_items/090_hpv.png', 'name': 'Records Adder', 'tags': ['csv-xlsx']},
    {'img': 'portfolio_items/091_jqf.png', 'name': 'My Cheque Book', 'tags': ['csv-xlsx', 'utility-app']},
    {'img': 'portfolio_items/092_dyg.png', 'name': 'Chris Excel Tool', 'tags': ['csv-xlsx']},
    {'img': 'portfolio_items/093_cvw.png', 'name': 'Relevant model names finder - output', 'tags': ['csv-xlsx']},
    {'img': 'portfolio_items/094_exs.png', 'name': 'Output screenshot (Random name: FIE391)', 'tags': ['csv-xlsx', 'text-data']},
    {'img': 'portfolio_items/095_icy.png', 'name': 'Orders Review', 'tags': ['csv-xlsx']},
    {'img': 'portfolio_items/096_qeh.png', 'name': 'Webcam Download Utility', 'tags': ['download', 'csv-xlsx']},
    {'img': 'portfolio_items/097_oyx.png', 'name': 'Images Renaming Tool', 'tags': ['rename']},
    {'img': 'portfolio_items/098_dvo.png', 'name': 'Andrew Auto Archiver', 'tags': ['archive']},
    {'img': 'portfolio_items/099_akh.png', 'name': 'DAMN Automatic RAR and PAR', 'tags': ['archive']},
    {'img': 'portfolio_items/100_zyt.png', 'name': 'Needles Conversion', 'tags': ['csv-xlsx', 'copy', 'rename', 'delete']},
    {'img': 'portfolio_items/101_qxi.png', 'name': 'Folders Compare Tool', 'tags': ['move']},
    {'img': 'portfolio_items/102_vpn.png', 'name': 'Folder to Excel', 'tags': ['csv-xlsx']},
    {'img': 'portfolio_items/103_pfh.png', 'name': 'Excel to Folder', 'tags': ['csv-xlsx']},
    {'img': 'portfolio_items/104_cgw.png', 'name': 'James Folder Manipulate', 'tags': ['delete', 'copy']},
    {'img': 'portfolio_items/105_mfa.png', 'name': 'Accdb File Archive', 'tags': ['archive']},
    {'img': 'portfolio_items/106_thb.png', 'name': 'Ryan File Renamer', 'tags': ['rename']},
    {'img': 'portfolio_items/107_igc.png', 'name': 'Batch File Remover', 'tags': ['delete']},
    {'img': 'portfolio_items/108_hlv.png', 'name': 'Files and Folders Prefix Tool', 'tags': ['rename']},
    {'img': 'portfolio_items/109_irc.png', 'name': 'Folder Tree Builder', 'tags': ['docx']},
    {'img': 'portfolio_items/110_hvg.png', 'name': 'JPGs Packer', 'tags': ['csv-xlsx', 'copy']},
    {'img': 'portfolio_items/111_smj.png', 'name': 'Proposal Creator', 'tags': ['rename', 'copy', 'delete']},
    {'img': 'portfolio_items/112_djy.png', 'name': 'Topoflight Assistant', 'tags': ['clipboard', 'text-data']},
    {'img': 'portfolio_items/113_aen.png', 'name': 'Video and Image Downloader', 'tags': ['download', 'api']},
    {'img': 'portfolio_items/114_nkp.png', 'name': 'Bulk XML File Renamer', 'tags': ['rename']},
    {'img': 'portfolio_items/115_cld.png', 'name': 'Pexels Videos Downloader', 'tags': ['download', 'api']},
    {'img': 'portfolio_items/116_myt.png', 'name': 'Bulk Torrent Generator', 'tags': ['torrent']},
    {'img': 'portfolio_items/117_vjy.png', 'name': 'SDS Uploader', 'tags': ['upload']},
    {'img': 'portfolio_items/118_gjd.png', 'name': 'Smartmed - Suremed to Automed Converter', 'tags': ['text-data', 'watch-folder', 'copy', 'move', 'delete']},
    {'img': 'portfolio_items/119_qws.png', 'name': 'Suremed to ATP Extended Converter', 'tags': ['text-data', 'copy', 'move', 'delete', 'watch-folder']},
    {'img': 'portfolio_items/120_okb.png', 'name': 'Richard AutoDeleter', 'tags': ['delete']},
    {'img': 'portfolio_items/121_djm.png', 'name': 'VAR Files Organizer', 'tags': ['move']},
    {'img': 'portfolio_items/122_zcd.png', 'name': 'Andy JPG <-> Video Converter (lossless)', 'tags': ['convert-image', 'convert-video']},
    {'img': 'portfolio_items/123_ajq.png', 'name': 'Image Creation Tools', 'tags': ['edit-image']},
    {'img': 'portfolio_items/124_prw.png', 'name': 'Batch Video Tools', 'tags': ['concatenate-videos', 'watermark-video', 'trim-video']},
    {'img': 'portfolio_items/125_vzn.png', 'name': '3 Level Password System', 'tags': ['edit-image']},
    {'img': 'portfolio_items/126_gbi.png', 'name': 'Ovvy Image Convertor', 'tags': ['edit-image', 'compress-image', 'convert-image']},
    {'img': 'portfolio_items/127_xse.png', 'name': 'MP3 Louder', 'tags': ['audio']},
    {'img': 'portfolio_items/128_fhz.png', 'name': 'Video Files Merge', 'tags': ['concatenate-videos']},
    {'img': 'portfolio_items/129_nke.png', 'name': 'Batch Image Resizer', 'tags': ['edit-image']},
    {'img': 'portfolio_items/130_dtj.png', 'name': 'MULTICONVERTER', 'tags': ['audio', 'convert-image', 'convert-video', 'text-data', 'csv-xlsx', 'docx', 'rtf']},
    {'img': 'portfolio_items/131_ypu.png', 'name': 'MULTICONVERTER - screenshot 2', 'tags': ['audio', 'convert-image', 'convert-video', 'text-data', 'csv-xlsx', 'docx', 'rtf']},
    {'img': 'portfolio_items/132_pxh.png', 'name': 'MULTICONVERTER - screenshot 3', 'tags': ['audio', 'convert-image', 'convert-video', 'text-data', 'csv-xlsx', 'docx', 'rtf']},
    {'img': 'portfolio_items/133_plv.png', 'name': 'MULTICONVERTER - screenshot 4', 'tags': ['audio', 'convert-image', 'convert-video', 'text-data', 'csv-xlsx', 'docx', 'rtf']},
    {'img': 'portfolio_items/134_kzi.png', 'name': 'Video Shutter Removal', 'tags': ['edit-video']},
    {'img': 'portfolio_items/135_jix.png', 'name': 'Bulk Video Randomizer', 'tags': ['csv-xlsx', 'edit-video', 'concatenate-videos']},
    {'img': 'portfolio_items/136_cjk.png', 'name': 'Batch Videos Rotate', 'tags': ['edit-video']},
    {'img': 'portfolio_items/137_jkc.png', 'name': 'Audio Merger', 'tags': ['audio']},
    {'img': 'portfolio_items/138_nib.png', 'name': 'Image Modifier', 'tags': ['edit-image', 'text-data']},
    {'img': 'portfolio_items/139_bvo.png', 'name': 'SVG to PNG Converter', 'tags': ['convert-image']},
    {'img': 'portfolio_items/140_gkf.png', 'name': 'Jovan Screen Scanner', 'tags': ['ocr']},
    {'img': 'portfolio_items/141_rhk.png', 'name': 'Batch Trim + Scale', 'tags': ['edit-video']},
    {'img': 'portfolio_items/142_ebt.png', 'name': 'Image Searcher', 'tags': ['copy']},
    {'img': 'portfolio_items/143_jft.png', 'name': 'Batch OCR Tool', 'tags': ['ocr', 'copy', 'edit-image', 'api']},
    {'img': 'portfolio_items/144_vey.png', 'name': 'Voiceover Downmixer', 'tags': ['edit-video']},
    {'img': 'portfolio_items/145_ugf.png', 'name': 'Detail and Model Merger', 'tags': ['text-data', 'concatenate-videos']},
    {'img': 'portfolio_items/146_eou.png', 'name': 'VideoFromText', 'tags': ['text-data', 'concatenate-videos', 'convert-image']},
    {'img': 'portfolio_items/147_ojz.png', 'name': 'VideoFromText - screenshot 2', 'tags': ['text-data', 'concatenate-videos', 'convert-image']},
    {'img': 'portfolio_items/148_sqx.png', 'name': 'Image Dimensions Report', 'tags': ['csv-xlsx']},
    {'img': 'portfolio_items/148_sqx_2.png', 'name': 'Image Dimensions Report - output screenshot', 'tags': ['csv-xlsx']},
    {'img': 'portfolio_items/149_tuk.png', 'name': 'Image Resizer', 'tags': ['edit-image']},
    {'img': 'portfolio_items/150_cjl.png', 'name': 'JPG to PNG Converter', 'tags': ['convert-image']},
    {'img': 'portfolio_items/151_ajv.png', 'name': 'Batch PNG Compressor', 'tags': ['compress-image']},
    {'img': 'portfolio_items/152_tus.png', 'name': 'Image BG Type Seperator', 'tags': ['copy']},
    {'img': 'portfolio_items/153_sdz.png', 'name': 'VO Merge Tool', 'tags': ['audio', 'csv-xlsx', 'edit-video']},
    {'img': 'portfolio_items/154_quz.png', 'name': 'Batch Stencil to Silhouette Converter', 'tags': ['edit-image']},
    {'img': 'portfolio_items/155_fnt.png', 'name': 'Batch Random Video Generator', 'tags': ['edit-video', 'watermark-video']},
    {'img': 'portfolio_items/156_wsi.png', 'name': 'Audio Video Merger', 'tags': ['convert-image']},
    {'img': 'portfolio_items/157_nra.png', 'name': 'Audio Volume Normalizer', 'tags': ['audio']},
    {'img': 'portfolio_items/158_ydv.png', 'name': 'Cap Maker', 'tags': ['convert-video']},
    {'img': 'portfolio_items/159_crs.png', 'name': 'Dome Club Doctor', 'tags': ['csv-xlsx', 'text-data']},
    {'img': 'portfolio_items/160_pju.png', 'name': 'Batch Image Labeler', 'tags': ['csv-xlsx', 'watermark-image']},
    {'img': 'portfolio_items/161_axf.png', 'name': 'Random Image Modifier', 'tags': ['edit-image']},
    {'img': 'portfolio_items/162_wrz.png', 'name': 'Random Video Commentator', 'tags': ['text-data', 'watermark-video']},
    {'img': 'portfolio_items/163_gka.png', 'name': 'Batch OCR Tool', 'tags': ['ocr', 'copy', 'api']},
    {'img': 'portfolio_items/164_jch.png', 'name': 'Silence Based Splitter', 'tags': ['audio', 'text-data']},
    {'img': 'portfolio_items/165_rye.png', 'name': 'Batch Clips Randomize', 'tags': ['concatenate-videos', 'edit-video']},
    {'img': 'portfolio_items/166_dqn.png', 'name': 'FreezeFrame', 'tags': ['edit-video', 'text-data']},
    {'img': 'portfolio_items/167_cdn.png', 'name': 'Malte MP3 Splitter', 'tags': ['audio']},
    {'img': 'portfolio_items/168_vtd.png', 'name': 'Lap Finish Clipper', 'tags': ['csv-xlsx', 'edit-video']},
    {'img': 'portfolio_items/169_cgs.png', 'name': 'Batch Video and Subtitles Trimmer', 'tags': ['edit-image', 'text-data']},
    {'img': 'portfolio_items/170_tga.png', 'name': 'PScan Steuerung Dual', 'tags': ['extensive-gui']},
    {'img': 'portfolio_items/171_mtx.png', 'name': 'Word Find Log Viewer', 'tags': ['json']},
    {'img': 'portfolio_items/172_bvc.png', 'name': 'Breeze Kiosk', 'tags': ['extensive-gui']},
    {'img': 'portfolio_items/173_jyv.png', 'name': 'Random number generator', 'tags': ['keyboard', 'mouse']},
    {'img': 'portfolio_items/174_tvo.png', 'name': 'Random number generator - screenshot 2', 'tags': ['keyboard', 'mouse']},
    {'img': 'portfolio_items/175_ohk.png', 'name': 'Aleksandar ToDo Manager', 'tags': ['text-data']},
    {'img': 'portfolio_items/176_qtn.png', 'name': 'Aleksandar ToDo Manager - screenshot 2', 'tags': ['text-data']},
    {'img': 'portfolio_items/177_fdp.png', 'name': 'SEMCO Crossing Tool (GUI only)', 'tags': ['csv-xlsx']},
    {'img': 'portfolio_items/178_qiw.png', 'name': 'Budget Planner', 'tags': ['text-data']},
    {'img': 'portfolio_items/179_qrt.png', 'name': 'Excel Image Extractor', 'tags': ['text-data', 'csv-xlsx']},
    {'img': 'portfolio_items/180_mot.png', 'name': 'GUI Replica (Random name: ZIU852)', 'tags': ['extensive-gui']},
    {'img': 'portfolio_items/181_ydq.png', 'name': 'GUI Replica (Random name: YEL391)', 'tags': ['extensive-gui']},
    {'img': 'portfolio_items/182_axw.png', 'name': 'Pixelated View Screen', 'tags': ['extensive-gui']},
    {'img': 'portfolio_items/183_ntb.png', 'name': 'GUI Replica (Random name: RYS581)', 'tags': ['extensive-gui']},
    {'img': 'portfolio_items/184_lpk.png', 'name': 'GUI Replica (Random name: YQI231)', 'tags': ['extensive-gui']},
    {'img': 'portfolio_items/185_lvm.png', 'name': 'GUI Replica (Random name: AIX250)', 'tags': ['extensive-gui']},
    {'img': 'portfolio_items/186_gvp.png', 'name': 'GUI Replica (Random name: TVB093)', 'tags': ['extensive-gui']},
    {'img': 'portfolio_items/187_qvp.png', 'name': 'GUI Replica (Random name: RTH385)', 'tags': ['extensive-gui']},
    {'img': 'portfolio_items/188_ngb.png', 'name': 'GUI Replica (Random name: FDK489)', 'tags': ['extensive-gui']},
    {'img': 'portfolio_items/189_zog.png', 'name': 'Tic-tac-toe', 'tags': ['text-data']},
    {'img': 'portfolio_items/190_tmf.png', 'name': 'Gregor Timer', 'tags': ['extensive-gui']},
    {'img': 'portfolio_items/191_jpn.png', 'name': 'GBH Event Adder', 'tags': ['text-data']},
    {'img': 'portfolio_items/192_qdl.png', 'name': 'GLB Animate Tool', 'tags': ['convert-image']},
    {'img': 'portfolio_items/193_ugb.png', 'name': 'M Content Re-Writer', 'tags': ['extensive-gui']},
    {'img': 'portfolio_items/194_hnw.png', 'name': 'Student Caller', 'tags': ['api']},
    {'img': 'portfolio_items/195_rap.png', 'name': 'Non-disclosure (Random name: AOH964)', 'tags': ['api']},
    {'img': 'portfolio_items/196_sry.png', 'name': 'Thermal Drone Ground Station', 'tags': ['wi-fi']},
    {'img': 'portfolio_items/197_fen.png', 'name': 'GUI Replica (Random name: RTJ481)', 'tags': ['extensive-gui']},
    {'img': 'portfolio_items/198_nzg.png', 'name': 'Mouse Trail', 'tags': ['mouse']},
    {'img': 'portfolio_items/199_lpr.png', 'name': 'Mouse Trail - screenshot 2', 'tags': ['mouse']},
    {'img': 'portfolio_items/200_xmg.png', 'name': 'DataTable', 'tags': ['text-data']},
    {'img': 'portfolio_items/201_vdo.png', 'name': 'Random name: HIS569', 'tags': ['extensive-gui']},
    {'img': 'portfolio_items/202_wyh.png', 'name': 'PDF Pages Modify And Sort', 'tags': ['modify-layout', 'insert-text-in-pdf']},
    {'img': 'portfolio_items/203_nva.png', 'name': 'Non-disclosure (Random name: JCL047)', 'tags': ['extensive-gui']},
    {'img': 'portfolio_items/204_scz.png', 'name': 'English Placement Test', 'tags': ['extensive-gui']},
    {'img': 'portfolio_items/205_xka.png', 'name': 'English Placement Test - screenshot 2', 'tags': ['extensive-gui']},
    {'img': 'portfolio_items/206_mzo.png', 'name': 'Letter Selector', 'tags': ['extensive-gui']},
    {'img': 'portfolio_items/207_qzb.png', 'name': 'Letter Selector - screenshot 2', 'tags': ['extensive-gui']},
    {'img': 'portfolio_items/208_fdz.png', 'name': 'Letter Selector - screenshot 3', 'tags': ['extensive-gui']},
    {'img': 'portfolio_items/209_mwu.png', 'name': 'Non-disclosure (Random name: KAD059) (GUI only)', 'tags': ['extensive-gui']},
    {'img': 'portfolio_items/210_mcx.png', 'name': 'Unreal Graphics Patcher', 'tags': ['json', 'extensive-gui']},
    {'img': 'portfolio_items/211_dcl.png', 'name': 'Keys4Me', 'tags': ['extensive-gui']},
    {'img': 'portfolio_items/212_dox.png', 'name': 'Digital Clock', 'tags': ['extensive-gui']},
    {'img': 'portfolio_items/213_pgu.png', 'name': 'Moaz ChatBot (GUI only)', 'tags': ['extensive-gui']},
    {'img': 'portfolio_items/214_noa.png', 'name': 'Robbins Nest (GUI only)', 'tags': ['extensive-gui']},
    {'img': 'portfolio_items/214_noa_2.png', 'name': 'Robbins Nest (GUI only) - screenshot 2', 'tags': ['extensive-gui']},
    {'img': 'portfolio_items/214_noa_3.png', 'name': 'Robbins Nest (GUI only) - screenshot 3', 'tags': ['extensive-gui']},
    {'img': 'portfolio_items/214_noa_4.png', 'name': 'Robbins Nest (GUI only) - screenshot 4', 'tags': ['extensive-gui']},
    {'img': 'portfolio_items/215_khd.png', 'name': 'PDF Tables Extract', 'tags': ['table-extract']},
    {'img': 'portfolio_items/216_jbn.png', 'name': 'PDF Autofill Tool', 'tags': ['insert-image', 'merge-pdfs', 'fill-form', 'json']},
    {'img': 'portfolio_items/217_ijz.png', 'name': 'Tutorial Machine PDF Version', 'tags': ['extensive-gui', 'csv-xlsx', 'generate-pdf']},
    {'img': 'portfolio_items/218_pbs.png', 'name': 'PDF Watermark Removal', 'tags': ['remove-watermark']},
    {'img': 'portfolio_items/219_bga.png', 'name': 'Non-disclosure (Random name: SEK336)', 'tags': ['generate-pdf', 'text-extract']},
    {'img': 'portfolio_items/220_fkm.png', 'name': 'PDF Pages Distributor', 'tags': ['split-pdf']},
    {'img': 'portfolio_items/221_ehg.png', 'name': 'GIP Document Signing Tool', 'tags': ['insert-image', 'archive']},
    {'img': 'portfolio_items/222_kai.png', 'name': 'PDFs Categorizer', 'tags': ['copy', 'ocr']},
    {'img': 'portfolio_items/223_tgk.png', 'name': 'Bulk Invoice Generator', 'tags': ['generate-pdf']},
    {'img': 'portfolio_items/223_tgk_2.png', 'name': 'Bulk Invoice Generator - output screenshot', 'tags': ['generate-pdf']},
    {'img': 'portfolio_items/224_gkt.png', 'name': 'Packing Slips Generator', 'tags': ['json', 'generate-pdf']},
    {'img': 'portfolio_items/224_gkt_2.png', 'name': 'Packing Slips Generator - output screenshot', 'tags': ['json', 'generate-pdf']},
    {'img': 'portfolio_items/225_fkn.png', 'name': 'ACM Prix', 'tags': ['json', 'csv-xlsx', 'extract-table']},
    {'img': 'portfolio_items/226_tlo.png', 'name': 'Invoice Sorter', 'tags': ['modify-layout']},
    {'img': 'portfolio_items/227_vuh.png', 'name': 'PDF Merger', 'tags': ['merge-pdfs']},
    {'img': 'portfolio_items/228_fms.png', 'name': 'Therese CSV Manipulate', 'tags': ['csv-xlsx', 'generate-pdf', 'extensive-gui']},
    {'img': 'portfolio_items/229_qax.png', 'name': 'Therese CSV Manipulate - output screenshot', 'tags': ['csv-xlsx', 'generate-pdf', 'extensive-gui']},
    {'img': 'portfolio_items/230_fon.png', 'name': 'Therese CSV Manipulate - output screenshot 2', 'tags': ['csv-xlsx', 'generate-pdf', 'extensive-gui']},
    {'img': 'portfolio_items/231_zgl.png', 'name': 'Therese CSV Manipulate - output screenshot 3', 'tags': ['csv-xlsx', 'generate-pdf', 'extensive-gui']},
    {'img': 'portfolio_items/232_bwk.png', 'name': 'Therese CSV Manipulate - output screenshot 4', 'tags': ['csv-xlsx', 'generate-pdf', 'extensive-gui']},
    {'img': 'portfolio_items/233_vbn.png', 'name': 'Therese CSV Manipulate - output screenshot 5', 'tags': ['csv-xlsx', 'generate-pdf', 'extensive-gui']},
    {'img': 'portfolio_items/234_rkp.png', 'name': 'ASTRO.client', 'tags': ['api', 'keyboard', 'text-data']},
    {'img': 'portfolio_items/235_kry.png', 'name': 'PDF Text Highlighter', 'tags': ['text-highlight']},
    {'img': 'portfolio_items/236_nkj.png', 'name': 'QSM Movetifpdf', 'tags': ['edit-image', 'modify-layout']},
    {'img': 'portfolio_items/237_pty.png', 'name': 'Airway Bills Sorter', 'tags': ['csv-xlsx', 'insert-text-in-pdf', 'modify-layout']},
    {'img': 'portfolio_items/237_pty_2.png', 'name': 'Airway Bills Sorter - output screenshot', 'tags': ['csv-xlsx', 'insert-text-in-pdf', 'modify-layout']},
    {'img': 'portfolio_items/238_tca.png', 'name': 'Patients Data Extract', 'tags': ['table-extract']},
    {'img': 'portfolio_items/238_tca_2.png', 'name': 'Patients Data Extract - output screenshot', 'tags': ['table-extract']},
    {'img': 'portfolio_items/239_spr.png', 'name': 'Key Combination Simulator', 'tags': ['keyboard']},
    {'img': 'portfolio_items/240_okq.png', 'name': 'Non-disclosure (Random name: LGJ395)', 'tags': ['generate-pdf', 'extensive-gui', 'csv-xlsx', 'xml']},
    {'img': 'portfolio_items/241_lia.png', 'name': 'LGJ395 Output', 'tags': ['generate-pdf', 'extensive-gui', 'csv-xlsx', 'xml']},
    {'img': 'portfolio_items/242_myl.png', 'name': 'PDF Footer Removal Tool', 'tags': ['copy', 'redaction']},
    {'img': 'portfolio_items/242_myl_2.png', 'name': 'PDF Footer Removal Tool - output screenshot', 'tags': ['copy', 'redaction']},
    {'img': 'portfolio_items/243_bvh.png', 'name': 'Non-disclosure (Random name: DLR057)', 'tags': ['merge-pdfs']},
    {'img': 'portfolio_items/244_ixp.png', 'name': 'Classic Holidays Cruise Voucher Generator', 'tags': ['redaction', 'modify-layout', 'insert-image']},
    {'img': 'portfolio_items/244_ixp_2.png', 'name': 'Classic Holidays Cruise Voucher Generator - output screenshot', 'tags': ['redaction', 'modify-layout', 'insert-image']},
    {'img': 'portfolio_items/244_ixp_3.png', 'name': 'Classic Holidays Cruise Voucher Generator - output screenshot 2', 'tags': ['redaction', 'modify-layout', 'insert-image']},
    {'img': 'portfolio_items/245_nyt.png', 'name': 'Erkan PDF Extract', 'tags': ['text-data', 'table-extract']},
    {'img': 'portfolio_items/245_nyt_2.png', 'name': 'Erkan PDF Extract - output screenshot', 'tags': ['text-data', 'table-extract']},
    {'img': 'portfolio_items/246_hdz.png', 'name': 'Output screenshot (Random name: DKU483)', 'tags': ['image-extract', 'table-extract']},
    {'img': 'portfolio_items/247_uvh.png', 'name': 'Batch Product PDFs to JSON', 'tags': ['table-extract', 'image-extract', 'json']},
    {'img': 'portfolio_items/247_uvh_2.png', 'name': 'Batch Product PDFs to JSON - output screenshot', 'tags': ['table-extract', 'image-extract', 'json']},
    {'img': 'portfolio_items/248_gfa.png', 'name': 'Output screenshot (Random name: SDI459)', 'tags': ['fill-form']},
    {'img': 'portfolio_items/249_auk.png', 'name': 'Output screenshot (Random name: XDJ394)', 'tags': ['fill-form']},
    {'img': 'portfolio_items/250_mrc.png', 'name': 'Output screenshot (Random name: SEG438)', 'tags': ['fill-form']},
    {'img': 'portfolio_items/251_sqb.png', 'name': 'Waterpipes Document Extract', 'tags': ['text-extract']},
    {'img': 'portfolio_items/251_sqb_2.png', 'name': 'Waterpipes Document Extract - output screenshot', 'tags': ['text-extract']},
    {'img': 'portfolio_items/252_rpg.png', 'name': 'Waterpipes Document Update', 'tags': ['redaction', 'insert-image']},
    {'img': 'portfolio_items/252_rpg_2.png', 'name': 'Waterpipes Document Update - output screenshot', 'tags': ['redaction', 'insert-image']},
    {'img': 'portfolio_items/253_udp.png', 'name': 'Output screenshot (Random name: LSE903)', 'tags': ['fill-form']},
    {'img': 'portfolio_items/254_lfi.png', 'name': 'Output screenshot (Random name: FOG942)', 'tags': ['redaction']},
    {'img': 'portfolio_items/255_ywv.png', 'name': 'Output screenshot (Random name: LXD903)', 'tags': ['generate-pdf']},
    {'img': 'portfolio_items/256_zwe.png', 'name': 'Output screenshot (Random name: TYO234)', 'tags': ['generate-pdf']},
    {'img': 'portfolio_items/257_rnu.png', 'name': 'Output screenshot (Random name: GKY432)', 'tags': ['generate-pdf']},
    {'img': 'portfolio_items/258_wqg.png', 'name': 'Report Findings Redact', 'tags': ['redaction']},
    {'img': 'portfolio_items/258_wqg_2.png', 'name': 'Report Findings Redact - output screenshot', 'tags': ['redaction']},
    {'img': 'portfolio_items/258_wqg_3.png', 'name': 'Report Findings Redact - output screenshot 2', 'tags': ['redaction']},
    {'img': 'portfolio_items/259_gkm.png', 'name': 'Fungo-Buying Software', 'tags': ['generate-pdf', 'csv-xlsx']},
    {'img': 'portfolio_items/259_gkm_2.png', 'name': 'Fungo-Buying Software - output screenshot', 'tags': ['generate-pdf', 'csv-xlsx']},
    {'img': 'portfolio_items/260_upe.png', 'name': 'Output screenshot (Random name: IDS328)', 'tags': ['fill-form']},
    {'img': 'portfolio_items/261_wsf.png', 'name': 'Output screenshot (Random name: DOR394)', 'tags': ['text-extract']},
    {'img': 'portfolio_items/262_pcv.png', 'name': 'Output screenshot (Random name: DFO439)', 'tags': ['table-extract']},
    {'img': 'portfolio_items/263_cfd.png', 'name': 'PDF to Image Utility', 'tags': ['convert-pdf']},
    {'img': 'portfolio_items/264_dln.png', 'name': 'Bobby No Watermark', 'tags': ['redaction']},
    {'img': 'portfolio_items/265_zxn.png', 'name': 'Tenant Data Extract', 'tags': ['table-extract']},
    {'img': 'portfolio_items/265_zxn_2.png', 'name': 'Tenant Data Extract - output screenshot', 'tags': ['table-extract']},
    {'img': 'portfolio_items/265_zxn_3.png', 'name': 'Tenant Data Extract - output screenshot 2', 'tags': ['table-extract']},
    {'img': 'portfolio_items/266_ckf.png', 'name': 'PDF Pages Count Report', 'tags': ['pdf-metadata', 'csv-xlsx']},
    {'img': 'portfolio_items/267_nhe.png', 'name': 'PDF Dates Replace', 'tags': ['insert-text-in-pdf']},
    {'img': 'portfolio_items/268_vtq.png', 'name': 'Roulette autoBot', 'tags': ['mouse']},
    {'img': 'portfolio_items/269_rok.png', 'name': 'Machinified Sensitive Data Redact', 'tags': ['redaction', 'extensive-gui']},
    {'img': 'portfolio_items/270_xhy.png', 'name': 'Adam Hotkeys', 'tags': ['keyboard']},
    {'img': 'portfolio_items/271_zxp.png', 'name': 'YT Auto Comment', 'tags': ['csv-xlsx', 'keyboard', 'text-extract']},
    {'img': 'portfolio_items/272_sxj.png', 'name': 'YT Auto Comment - screenshot 2', 'tags': ['csv-xlsx', 'keyboard', 'text-extract']},
    {'img': 'portfolio_items/273_mpc.png', 'name': 'Non-disclosure (Random name: LEI340)', 'tags': ['keyboard', 'csv-xlsx']}
]
