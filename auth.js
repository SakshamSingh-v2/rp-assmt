import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword ,signOut } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-auth.js"
import { getFirestore,doc, getDoc } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyAE3eAfr8FZa5q9JDl-qJjahPVC5dmYTVk",
    authDomain: "rp-auth-e0208.firebaseapp.com",
    projectId: "rp-auth-e0208",
    storageBucket: "rp-auth-e0208.appspot.com",
    messagingSenderId: "712984703382",
    appId: "1:712984703382:web:8d0c10b9bf4ea42f4a6db7",
    measurementId: "G-58SL61TPNX"
  };

  console.log("auth loaded");
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


async function finduser(email){
console.log("finding user");

const docRef = doc(db, "users", email);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
} else {
  // doc.data() will be undefined in this case
  console.log("No such document!");
}

};


let loginUser = ()=>{
    let email = document.getElementById("email-login").value;
    let password = document.getElementById("password-login").value;

    document.getElementById("login-fail-nouser").style.display = "none"
    document.getElementById("login-fail-password").style.display = "none"

    signInWithEmailAndPassword(auth, email, password).then((data)=>{
        finduser(data.user.email)
        location.assign("./pricing.html")
        document.getElementById("login-success").style.display = "block"
    }).catch(e=>{
        if(e.code == "auth/user-not-found"){
        document.getElementById("login-fail-nouser").style.display = "block"
        }else if(e.code=="auth/wrong-password"){
            document.getElementById("login-fail-password").style.display = "block"
        }})

}

let signUpUser = ()=> {
    document.getElementById("create-used").style.display = "none"
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password).then((data)=>{
        console.log(data);
        document.getElementById("create-success").style.display = "block"
    })
        .catch(e=>{
            if(e.code == "auth/email-already-in-use"){
                document.getElementById("create-used").style.display = "block"
            }
        })
}

document.getElementById("create-used").style.display = "none"
document.getElementById("signUpBtn").addEventListener("click", signUpUser)
document.getElementById("loginBtn").addEventListener("click", loginUser)
document.getElementById("login-success").style.display = "none"
document.getElementById("login-fail-nouser").style.display = "none"
document.getElementById("login-fail-password").style.display = "none"
document.getElementById("create-success").style.display = "none"