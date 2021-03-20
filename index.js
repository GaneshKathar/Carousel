
async function carousel(id, maxImage=3, src){
    let currentImgIndex = 0;
    const maxImageCount = maxImage-1;
    const res = await fetch(src);
    const images = await res.json();
    const container = document.getElementById(id);
    container.classList = container.classList + " c-container";

    function createNavButton(id, text, classes){
        const  button = document.createElement('button');
        button.innerText = text;
        button.setAttribute('id',id)
        button.classList = `${classes} c-button`;
        return button;
    }
    function createImg(id,src){
        const  img = document.createElement('img');
        img.setAttribute('id',id)
        img.classList = " c-img";
        img.setAttribute('src', src);
        return img;
    }

    function createScroll(){
        const section = document.createElement('section');
        for(let i=0;i< maxImage; i++){
            const dot  = document.createElement('div');
            dot.className = "c-dot",
            dot.setAttribute('data', i);
            section.appendChild(dot);
        }
        section.classList = "c-scroll";
        return section;
    }
    
    
    container.appendChild(createNavButton('leftButton', '<', 'left-c-button'))
    container.appendChild(createNavButton('rightButton', '>',  'right-c-button'))
    container.appendChild(createImg('img', images[currentImgIndex].download_url));
    container.appendChild(createScroll());
    
    const leftButton=document.getElementById('leftButton');
    const rightButton=document.getElementById('rightButton');
    const img = document.getElementById('img')
    const dots = document.querySelectorAll('.c-dot');
    const currentImageDot = dots[currentImgIndex];

    leftButton.setAttribute('disabled','');
    currentImageDot.classList += " c-dot-fill" 
    
    function onClick(event){
        if(event.target.id === 'leftButton'){
            currentImgIndex -= 1
            img.setAttribute('src', images[currentImgIndex].download_url)
            console.log(currentImgIndex);
            if(currentImgIndex === 0){
                leftButton.setAttribute('disabled','');
            }
            if(currentImgIndex < maxImageCount){
                rightButton.removeAttribute('disabled')
            }
        }
        if(event.target.id === 'rightButton'){
            currentImgIndex += 1
            img.setAttribute('src', images[currentImgIndex].download_url)
            console.log(currentImgIndex)
        }
        if(event.target.classList.contains("c-dot")){
            currentImgIndex = Number(event.target.getAttribute('data'));
            img.setAttribute('src', images[currentImgIndex].download_url)
        }
        dots.forEach((dot) => dot.classList = "c-dot");
        const currentImageDot = dots[currentImgIndex];
        currentImageDot.classList += " c-dot-fill" 
        if(currentImgIndex === 0){
            leftButton.setAttribute('disabled','');
        }
        if(currentImgIndex < maxImageCount){
            rightButton.removeAttribute('disabled')
        }
        if(currentImgIndex >=  maxImageCount){
            rightButton.setAttribute('disabled','');
        }
        if(currentImgIndex>0){
            leftButton.removeAttribute('disabled')
        }
    }
    
    leftButton.addEventListener('click',onClick)
    rightButton.addEventListener('click',onClick)
    dots.forEach(dot=>dot.addEventListener('click', onClick));
}

carousel('carousel', 10, 'https://picsum.photos/v2/list?limit=10');