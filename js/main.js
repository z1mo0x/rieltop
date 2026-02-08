let selected;
let selectedMob;

async function loadLang(lang) {
    try {
        const res = await fetch(`/config/config-${lang}.json`);
        const config = await res.json();

        document.querySelectorAll('[data-key]').forEach(el => {
            const key = el.dataset.key;
            if (config[key]) el.textContent = config[key];
        });

        document.documentElement.lang = lang;
        localStorage.setItem('lang', lang);

        if (selected) selected.textContent = lang.toUpperCase();

        redirectUrl(lang);

    } catch (error) {
        console.error('Ошибка загрузки:', error);
        if (selected) selected.textContent = 'RU';
    }
}

function redirectUrl(lang) {
    const currentPath = window.location.pathname;

    if (lang === 'ru' && currentPath.startsWith('/en/')) {
        window.location.href = '/';
    }
    else if (lang === 'en' && !currentPath.startsWith('/en/')) {
        window.location.href = '/en/';
    }
}

function choiceLang() {
    document.querySelectorAll('.choise').forEach(button => {
        button.addEventListener('click', () => {
            const language = button.getAttribute('data-lang').toLowerCase();
            loadLang(language);
        });
    });
}

function getLangFromUrl() {
    const pathname = window.location.pathname;
    return pathname.startsWith('/en/') ? 'en' : 'ru';
}

function getBrowserLang() {
    const lang = navigator.language || navigator.languages[0] || 'ru';
    return lang.startsWith('en') ? 'en' : 'ru';
}

document.addEventListener('DOMContentLoaded', () => {
    selected = document.getElementById('choiseSelected');
    selectedMob = document.getElementById('choiseSelectedMob');

    choiceLang();

    const urlLang = getLangFromUrl();
    const savedLang = localStorage.getItem('lang') || 'ru';
    const browserLang = getBrowserLang();
    const finalLang = urlLang || savedLang || browserLang || 'ru';

    if (selected) selected.textContent = finalLang.toUpperCase();
    if (selected) selectedMob.textContent = finalLang.toUpperCase();
    loadLang(finalLang);
});

document.addEventListener('DOMContentLoaded', () => {


    function openChoises() {
        const choises = document.querySelectorAll('.choises');

        choises.forEach((choise, index) => {
            choise.addEventListener('click', () => {

                const items = document.querySelectorAll('.choise__items')

                choise.classList.toggle('active')

                if (choise.classList.contains('active')) {
                    items[index].style.height = items[index].scrollHeight + 'px'
                } else {
                    items[index].style.height = 0 + 'px'
                }


            })
        })
    }
    openChoises()



    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            const target = document.querySelector(href);

            if (target) {
                const offsetTop = target.getBoundingClientRect().top + window.pageYOffset;

                // Ручная плавная анимация
                const start = window.pageYOffset;
                const distance = offsetTop - start;
                const duration = 800;
                let startTime = null;

                function animation(currentTime) {
                    if (startTime === null) startTime = currentTime;
                    const timeElapsed = currentTime - startTime;
                    const progress = Math.min(timeElapsed / duration, 1);
                    const easeProgress = 0.5 - 0.5 * Math.cos(progress * Math.PI);

                    window.scrollTo(0, start + distance * easeProgress);

                    if (timeElapsed < duration) {
                        requestAnimationFrame(animation);
                    }
                }

                requestAnimationFrame(animation);
            }
        });
    });


    function questionsItems() {
        const questions = document.querySelectorAll('.question');

        questions.forEach((item) => {
            const name = item.querySelector('.question__name');
            const answer = item.querySelector('.question__answer');

            name.addEventListener('click', () => {
                item.classList.toggle('active')
                answer.classList.toggle('active')

                if (item.classList.contains('active')) {
                    answer.style.height = answer.scrollHeight + 20 + 'px';
                }
                else {
                    answer.style.height = 0 + 'px';
                }
            })

        })
    }

    questionsItems()



    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible')
            }
        })
    }, { threshold: .5 })



    const items = document.querySelectorAll('.animation')

    items.forEach((item) => {
        observer.observe(item)
    })


    const inputs = document.querySelectorAll("input,textarea");

    inputs.forEach((input) => {
        input.addEventListener('change', () => {
            if (input.value.trim() !== '') {
                input.classList.add('no-empty');
                console.log(input.name);

            } else {
                input.classList.remove('no-empty');
            }
        })
    })


    // маска телефона

    var inputElements = document.querySelectorAll(".maskphone");

    for (let inputElement of inputElements) {
        console.log(inputElement);

        inputElement.addEventListener("input", mask);
        inputElement.addEventListener("focus", mask);
        inputElement.addEventListener("blur", mask);

        function mask(event) {
            var blank = "+_ (___) ___-__-__";

            var i = 0;
            var val = this.value.replace(/\D/g, "").replace(/^8/, "7");
            // <---

            this.value = blank.replace(/./g, function (char) {
                if (/[_\d]/.test(char) && i < val.length)
                    return val.charAt(i++);

                return i >= val.length ? "" : char;
            });

            if (event.type == "blur") {
                if (this.value.length == 2)
                    this.value = "";
            } else {
                setCursorPosition(this, this.value.length);
            }
        }
        ;
        function setCursorPosition(elem, pos) {
            elem.focus();

            if (elem.setSelectionRange) {
                elem.setSelectionRange(pos, pos);
                return;
            }

            if (elem.createTextRange) {
                var range = elem.createTextRange();
                range.collapse(true);
                range.moveEnd("character", pos);
                range.moveStart("character", pos);
                range.select();
                return;
            }
        }
    }

    // маска телефона

    function burgerMenu() {
        const button = document.querySelector('.header__burger');
        const menu = document.querySelector('.header__mobile-drop');

        button.addEventListener(('click'), () => {
            menu.classList.toggle('active')

            const links = menu.querySelectorAll('a[href^="#"]')
            links.forEach((link) => {
                link.addEventListener('click', () => {
                    menu.classList.remove('active')
                })
            })
            console.log(links);

            window.addEventListener('scroll', () => {
                menu.classList.remove('active')
            })


        })
    }

    if (window.screen.width < 992) {
        burgerMenu()
    }

})

