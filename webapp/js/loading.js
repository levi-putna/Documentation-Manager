
function load(progress,message){
    var bar = document.getElementById('bar');
    var message_box = document.getElementById('message');
    bar.style.width= progress + "%";
    message.innerHTML = message;
}