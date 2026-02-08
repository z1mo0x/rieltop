document.addEventListener('DOMContentLoaded', () => {

    const selected = document.getElementById('choiseSelected')


    async function loadLang(lang = "ru") {
        const res = await fetch(`/config/config-${lang.toLocaleLowerCase()}.json`);
        const config = await res.json();

        document.querySelectorAll('[data-key]').forEach(el => {
            const key = el.dataset.key;
            if (config[key]) el.textContent = config[key];
        });

        document.documentElement.lang = lang;
        localStorage.setItem('lang', lang);
    }

    function choiceLang() {
        const buttons = document.querySelectorAll('.choise');

        buttons.forEach((button) => {
            button.addEventListener('click', () => {
                const language = button.getAttribute('data-lang')
                selected.textContent = language
                localStorage.setItem('lang', language)
                loadLang(language)
            })
        })
    }

    choiceLang()

    function openChoises() {
        const choises = document.querySelector('.choises');

        choises.addEventListener('click', () => {

            const items = document.querySelector('.choise__items')

            choises.classList.toggle('active')

            if (choises.classList.contains('active')) {
                items.style.height = items.scrollHeight + 'px'
            } else {
                items.style.height = 0 + 'px'
            }


        })
    }
    openChoises()

    const savedLang = localStorage.getItem('lang') || 'ru';
    selected.textContent = savedLang
    loadLang(savedLang);

    document.addEventListener('DOMContentLoaded', choiceLang);


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

})

