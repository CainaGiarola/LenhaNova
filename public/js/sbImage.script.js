// import { initializeApp } from "firebase/app";
// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyAYpQUk1SDs4dxdsW_HIwybiM0thFdwpaM",
  authDomain: "lenhanova.firebaseapp.com",
  databaseURL: "https://lenhanova-default-rtdb.firebaseio.com",
  projectId: "lenhanova",
  storageBucket: "lenhanova.appspot.com",
  messagingSenderId: "99692343858",
  appId: "1:99692343858:web:271d58a1b6a19d8686022b",
  measurementId: "G-19YG6E8RVG"
};

const firebase = initializeApp(firebaseConfig);
console.log(firebase)

var fileText = document.querySelector(".fileText");
var uploadPercentage = document.querySelector(".uploadPercentage");
var progress = document.querySelector(".progress");
var percentVal;
var fileItem;
var fileName;
var img = document.querySelector(".img");

export function getFile(e) {
    fileItem = e.target.files[0];
    fileName = fileItem.name;
    fileText.innerHTML = fileName;
}

export function uploadImage() {
    const storage = getStorage(firebase);
    let storageRef = ref(storage, "images/" + fileName);
    let uploadTask = uploadBytesResumable(storageRef, fileItem);

    uploadTask.on('state_changed', (snapshot) => {
        // Seu código para lidar com o progresso
        console.log(snapshot);
        percentVal = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        console.log(percentVal);
        uploadPercentage.innerHTML = percentVal + "%";
        progress.style.width = percentVal + "%";
    }, (error) => {
        // Seu código para lidar com erro
        console.log("Error is ", error);
    }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            // Seu código para lidar com a URL de download
            if (downloadURL != "") {
                img.setAttribute("src", downloadURL);
                img.style.display = "block";
            }
        });
    });
}

// function uploadImage() {
//     let storageRef = firebase.storage().ref("images/" + filename);
//     let uploadTask = storageRef.put(fileName);

//     uploadTask.on("state_changed", (snapshot) => {
//         console.log(snapshot);
//         percentVal = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
//         console.log(percentVal);
//         uploadPercentage.innerHTML = percentVal + "%";
//         progress.style.width = percentVal + "%";

//     }, (error) => {
//         console.log("Error is ", error);
//     }, () => {
//         uploadTask.snapshot.ref.getDownloadURL().then((url) => {
//             console.log("URL", url);

            
//         })
//     })
// }