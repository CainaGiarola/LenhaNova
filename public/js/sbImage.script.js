var firebaseConfig = {
    apiKey: "AIzaSyAYpQUk1SDs4dxdsW_HIwybiM0thFdwpaM",
    authDomain: "lenhanova.firebaseapp.com",
    databaseURL: "https://lenhanova-default-rtdb.firebaseio.com",
    projectId: "lenhanova",
    storageBucket: "lenhanova.appspot.com",
    messagingSenderId: "99692343858",
    appId: "1:99692343858:web:271d58a1b6a19d8686022b",
    measurementId: "G-19YG6E8RVG"
  };

  // Initialize Firebase
var firebase = initializeApp(firebaseConfig);

var fileText = document.querySelector(".fileText");
var uploadPercentage = document.querySelector(".uploadPercentage");
var progress = document.querySelector(".progress");
var percentVal;
var fileItem;
var fileName;
var img = document.querySelector(".img");
function getFile(e) {
    fileItem = e.target.files[0];
    fileName = fileItem.name;
    fileText.innerHTML = fileName;
}

function uploadImage() {
    let storageRef = firebase.storage().ref("images/" + filename);
    let uploadTask = storageRef.put(fileName);

    uploadTask.on("state_changed", (snapshot) => {
        console.log(snapshot);
        percentVal = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        console.log(percentVal);
        uploadPercentage.innerHTML = percentVal + "%";
        progress.style.width = percentVal + "%";

    }, (error) => {
        console.log("Error is ", error);
    }, () => {
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            console.log("URL", url);

            if (url != "") {
                img.setAttribute("src", url);
                img.style.display = "block";
            }
        })
    })
}