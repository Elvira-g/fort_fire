
const contactModal = document.querySelector('.modal-contact-block');
const contactModalWindow = document.querySelector('.modal-contact-window');
const contactModalText = document.querySelector('.modal-contact-text-block');
const contactModalClose = document.querySelector('.modal-contact-close');
const contactBtn = document.querySelectorAll('.call-btn');

const bannerBlock = document.querySelector('.banner');
const bannerClose = document.querySelector('.banner-close');

const callForm = document.querySelector('.call-form');

const inputs = document.querySelectorAll('.tel');

const contactsForm = document.querySelector('.contacts-form');

const menuBtn = document.querySelector('.hamburger');
const menuBlock = document.querySelector('.menu-block');
const menuItem = document.querySelectorAll('.menu-item-link');

const sections = document.querySelectorAll('section');

const licenses = document.querySelectorAll('.license');
const licenseModalBlock = document.querySelector('.modal-license-block');
const licenseModalWindow = document.querySelector('.modal-license-window');
const licenseCloseBtn = document.querySelector('.modal-license-close');
const licenseImg = document.querySelector('.modal-license-img-block');

const smetaBtn = document.querySelector('.smeta-btn');
const smetaCallForm = document.querySelector('.smeta-call-form');



window.addEventListener('load', () => {
    contactBtn.forEach((item) => {
    item.addEventListener('click', () => {
        contactModalWindow.style.animationName = 'modal';
        contactModal.style.display = 'flex';
        showForm();
        })
    })

    if (screen.width <= 414) {
        smetaBtn.innerHTML = 'Отправить';
    } else {
        smetaBtn.innerHTML = 'Получить коммерческое предложение';
    }

    menuBtn.addEventListener('click', function () {
        if(this.classList.contains('is-active')){
            closeMenuBtn(this);
        } else {
            openMenuBtn(this);
        }
    })

    contactModalClose.addEventListener('click', () => {
        contactModalWindow.style.animationName = 'modal-close';
        setTimeout(() => contactModal.style.display = 'none', 400);
    })

    callForm.addEventListener('submit', function(e) {
        const tel = callForm.querySelector('.tel');
        const name = callForm.querySelector('.name');
        const errorField = callForm.querySelector('.error');
        e.preventDefault();
        if (tel.value == '' || tel.value.length < 12) {
            showError(errorField, 'Заполните поле');
        } else {
            contactModalWindow.style.animationName = 'modal';
            contactModal.style.display = 'flex';
            showMassage('Спасибо!'); 
        }
        tel.value = '';
        name.value = '';
    })

    smetaCallForm.addEventListener('submit', function(e) {
        const tel = smetaCallForm.querySelector('.tel');
        const name = smetaCallForm.querySelector('.name');
        const errorField = smetaCallForm.querySelector('.error');
        e.preventDefault();
        if (tel.value == '' || tel.value.length < 12) {
            showError(errorField, 'Заполните поле');
        } else {
            contactModalWindow.style.animationName = 'modal';
            contactModal.style.display = 'flex';
            showMassage('Спасибо!'); 
        }
        tel.value = '';
        name.value = '';
    })

    contactsForm.addEventListener('submit', function(e) {
        const tel = contactsForm.querySelector('.tel');
        const errorField = contactsForm.querySelector('.error');
        e.preventDefault();
        if (tel.value == '' || tel.value.length < 12) {
            showError(errorField, 'Заполните поле');
        } else {
            contactModal.style.display = 'flex';
            showMassage('Спасибо!');
        }
    })

    bannerClose.addEventListener('click', () => {
        bannerBlock.style.display = 'none';
    })

    menuItem.forEach((item) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToBlock(item);
            if (screen.width <= 812) {
                if(menuBtn.classList.contains('is-active')){
                    closeMenuBtn(menuBtn);
                } else {
                    openMenuBtn(menuBtn);
                }  
            }
            
        })
    })

    inputs.forEach((input) => {
        input.addEventListener('input', function(e){
            e.preventDefault;
            removeError(e.target);
        })
    })

    licenses.forEach((item) => {
        item.addEventListener('click', (e) => {
            let target = e.target.dataset.license;
            licenseModalWindow.style.animationName = 'modal';
            licenseModalBlock.style.display = 'flex';
            licenseImg.innerHTML = `
            <img class="modal-license-img" src="./assets/img/licenses/${target}.png">`;
        })
    })

    licenseCloseBtn.addEventListener('click', () => {
        licenseModalWindow.style.animationName = 'modal-close';
        setTimeout(() => licenseModalBlock.style.display = 'none', 400);
    })
})

window.addEventListener('click', (e) => {
    if(e.target == contactModal) {
        contactModal.style.display = 'none';
    }
    if(e.target == licenseModalBlock) {
        licenseModalBlock.style.display = 'none';
    }
})

function scrollToBlock(item) {
    const link = item.attributes.href.value;
    sections.forEach((section) => {
        const id = `#${section.id}`;
        if ( link == id ){ 
            if ( link == '#contacts' ) {
                const height = section.offsetTop - 280;
                window.scroll(0, height);
            } else {
               const height = section.offsetTop - 60;
               window.scroll(0, height);
            }
        }
    })
}

function showForm() {
    contactModalText.innerHTML = `
        <h2 class="modal-contact-title">Мы перезвоним вам!</h2>
        <form class="modal-contact-form">
            <input type="text" name="name" placeholder="Имя" autocomplete="off">
            <input type="tel" name="tel" placeholder="Телефон *" autocomplete="off" class="tel">
            <div class="error"></div>
            <input id="policy-checkbox" type="checkbox" name="checkbox">
            <label for="policy-checkbox" class="contact-checkbox-label">Я принимаю условия обработки персональных данных</label>
            <button type="submit" class="btn-orange modal-contact-btn">Отправить</button>
        </form>
    `;
    const contactModalForm = document.querySelector('.modal-contact-form');
    const phone_inputs = document.querySelectorAll('.tel');
    for (let elem of phone_inputs) {
        for (let ev of ['input', 'blur', 'focus']) {
            elem.addEventListener(ev, eventCalllback);
        }
    }
    contactModalForm.addEventListener('submit', function(e) {
        const tel = contactModalForm.querySelector('.tel');
        const errorField = contactModal.querySelector('.error');
        e.preventDefault();
        if (tel.value == '' || tel.value.length < 12) {
            showError(errorField, 'Заполните поле');
        } else {
           showMassage('Спасибо за заказ!'); 
        }
        
    })
    

}

function showMassage(message) {
    contactModalText.innerHTML = `
    <h2 class="modal-contact-title">${message}</h2>
    <p class="section-text">Мы свяжемся с Вами в ближайшее время.</p>
    <button class="btn-orange modal-contact-back-btn">Вернуться на главную</button>
    `;
    const contactModalBackBtn = document.querySelector('.modal-contact-back-btn');
    contactModalBackBtn.addEventListener('click', () => {
        location.href='index.html';
    })
}

function eventCalllback (e) {
    let el = e.target,
    clearVal = el.dataset.phoneClear,
    pattern = el.dataset.phonePattern,
    matrix_def = "+7(___) ___-__-__",
    matrix = pattern ? pattern : matrix_def,
    i = 0,
    def = matrix.replace(/\D/g, ""),
    val = e.target.value.replace(/\D/g, "");
     
    if (clearVal !== 'false' && e.type === 'blur') {
        if (val.length < matrix.match(/([\_\d])/g).length) {
            e.target.value = '';
            return;
        }
    }
    if (def.length >= val.length) val = def;
    e.target.value = matrix.replace(/./g, function (a) {
        return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
    });
}

function closeMenuBtn(btn) {
    btn.classList.remove('is-active');
    menuBlock.style.opacity = '0';
    setTimeout(() => menuBlock.style.display = 'none', 400);
}

function openMenuBtn(btn) {
    btn.classList.add('is-active');
    menuBlock.style.display = 'block';
    setTimeout(() => menuBlock.style.opacity = '1', 200);
    
}

function showError (field, message) {
    field.innerHTML = message;
}

function removeError () {
    const errors = document.querySelectorAll('.error');
    errors.forEach((item) => {
        item.innerHTML = '';
    })
}

const phone_inputs = document.querySelectorAll('.tel');
for (let elem of phone_inputs) {
    for (let ev of ['input', 'blur', 'focus']) {
        elem.addEventListener(ev, eventCalllback);
    }
}