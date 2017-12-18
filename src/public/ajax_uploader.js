document.querySelector('#fileUploads').addEventListener('change', function(e) {
    const event = e || window.event;
    const target = event.srcElement || event.target;
    if (target.files && target.files.length > 0) {
        const formData = new FormData();
        for (let index = 0; index < target.files.length; index++) {
            formData.append(index, target.files[index]);
        }
        const request = new XMLHttpRequest();
        request.open('POST', 'ajaxUpload');
        request.onreadystatechange = function() {
            //Call a function when the state changes.
            if (request.readyState == 4) {
                if (request.status == 200) {
                    console.log(request.responseText);
                } else {
                    console.error('ERROR!!');
                    console.error(request.responseText);
                }
            } else {
                console.log('Non 200 response');
            }
        };
        request.send(formData);
    }
});