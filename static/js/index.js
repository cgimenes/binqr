/** global: XMLHttpRequest */
window.onload = function(){
    var form = document.getElementById("file-form");
    var fileSelect = document.getElementById("file-select");
    var uploadButton = document.getElementById("upload-button");
    var fileName = document.getElementById("file-name");
    var fileHelp = document.getElementById("file-help");
    var fileField = document.getElementById("file");

    fileSelect.onchange = function() {
        if(fileSelect.files.length > 0)
        {
            fileName.classList.remove('is-hidden');
            fileName.innerHTML = fileSelect.files[0].name;
            fileHelp.classList.remove('is-danger');
            fileHelp.innerHTML = 'Tamanho máximo: 10kb';
            fileField.classList.remove('is-danger');
        }
    };


    form.onsubmit = function(event) {
        event.preventDefault();

        // Get the selected files from the input.
        var files = fileSelect.files;

        // Create a new FormData object.
        var formData = new FormData();

        // Loop through each of the selected files.
        for (var i = 0; i < files.length; i++) {
            var file = files[i];

            if (file.size >= 10 * 1024) {
                fileHelp.classList.add('is-danger');
                fileField.classList.add('is-danger');
                fileHelp.innerHTML = 'Arquivo muito grande!';
                return false;
            }

            // Add the file to the request.
            formData.append("file", file, file.name);
        }

        // Set up the request.
        var xhr = new XMLHttpRequest();
        // Open the connection.
        xhr.open("POST", "process", true);
        // Set up a handler for when the request finishes.
        xhr.onload = function () {
            if (this.status === 204) {
                window.location.replace("success");
            } else {
                window.location.replace("error");
            }
            uploadButton.innerHTML = "Upload";
        };

        // Update button text.
        uploadButton.classList.add('is-loading')
        // Send the Data.
        xhr.send(formData);
        return true;
    };
};
