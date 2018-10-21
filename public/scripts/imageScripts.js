var uploader = document.getElementById('uploader');
var fileButton = document.getElementById('fileButton');
var database = firebase.database();

fileButton.addEventListener('change', function(e) {
  // Get file
  var file = e.target.files[0]
  
  // Create storage ref
  var storageRef = firebase.storage().ref('images/' + file.name)


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


    }
  );
});