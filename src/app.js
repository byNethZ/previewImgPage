let arrayCanvas = [];

window.addEventListener('DOMContentLoaded', (event) => {
    showImage();

    convertToCanvas();

    sendCanvas();

});
function showImage(){
    let input = document.querySelector('input[type="file"]');
    input.addEventListener('change', function(e){
        filePreview(input.files);
        activeBtn(input.files);
    })
}

function filePreview(files){
    for(let i = 0; i < files.length; i++){
        let file = files[i];
        let fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = function (){
            let image = new Image();
            let capa = new Image();
            let divImage = document.createElement('DIV');
            let divCapa = document.createElement('DIV');
            let divPadre = document.createElement('DIV');
            let divPrincipal = document.querySelector('#preview-content');
            image.src = fileReader.result;
            divImage.appendChild(image);
            divImage.classList.add('uploadImg');
            divPadre.appendChild(divImage);
            capa.src = './src/img/capa2.png';
            divCapa.appendChild(capa);
            divCapa.classList.add('capaImg');
            divPadre.appendChild(divCapa);
            divPadre.classList.add('div-padre')
            divPrincipal.appendChild(divPadre);
        }
    }
}

function activeBtn(input){
    let btn = document.querySelector('#btnCorrecto');
    if(input.length > 0 ){
        btn.classList.remove('inactive');
        btn.classList.add('active');
    }
}

function convertToCanvas(){
    let btn = document.querySelector('#btnCorrecto');
    let form = document.querySelector('#form-content')
    
    btn.addEventListener('click', ()=>{
        let files = document.querySelectorAll('.div-padre')
        let file = Object.keys(files);

        html2canvas(form).then( canvas =>{
            arrayCanvas.push(canvas.toDataURL('image/jpeg', 0.9));
        });

        for(let i = 0; i < file.length; i++){
            html2canvas(files[i]).then( canvas =>{
                arrayCanvas.push(canvas.toDataURL('image/jpeg', 0.9));
            });
        }
    });
}

function sendCanvas(){
    let submit = document.querySelector('input[type="submit"]')
    
    submit.addEventListener('click', (e)=>{
        e.preventDefault();
        let unCanvas = Object.keys(arrayCanvas);
        for(let i = 0; i < unCanvas.length; i++){
            let ajax = new XMLHttpRequest();
            // ajax.open('POST', 'correo.php', true);
            ajax.send();
            console.log(arrayCanvas[i])
        }
    });
}