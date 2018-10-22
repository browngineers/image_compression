var uploader = document.getElementById('uploader');
var fileButton = document.getElementById('fileButton');
var database = firebase.database();

fileButton.addEventListener('change', function(e) {
  // Get file
  var file = e.target.files[0]

  // Create storage ref
  var storageRef = firebase.storage().ref('images/' + file.name)

console.log('images/' + file.name);


  // Upload file
  var task = storageRef.put(file);


  // Update progress bar
  task.on('state_changed',

    function progress(snapshot) {
      var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      uploader.value = percentage;
    },

    function error(err) {

    },

    function complete() {
        storageRef.getDownloadURL().then(function(url) {
            console.log(url);
            $.ajax({
                type: "POST",
                url: '/filter',
                data: {'url': url, name: file.name},
                success: function(data) {
                    console.log('here we are');
                    $.ajax({
                        type: "GET",
                        url: `/download?name=${file.name}`
                    });
                }
              });
        }).catch(function(error) {
            console.log(error);
        });
    }
 );





  // put something here to send request to get file




});
