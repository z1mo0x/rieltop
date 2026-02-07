document.addEventListener('DOMContentLoaded', () => {

    const selected = document.getElementById('choiseSelected')


    async function loadLang(lang = "ru") {
        const res = await fetch(`/config/config-${lang}.json`);
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

})

