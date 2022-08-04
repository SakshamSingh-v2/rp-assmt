import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
import { getFirestore, doc,addDoc, collection, getDoc, } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyAE3eAfr8FZa5q9JDl-qJjahPVC5dmYTVk",
    authDomain: "rp-auth-e0208.firebaseapp.com",
    projectId: "rp-auth-e0208",
    storageBucket: "rp-auth-e0208.appspot.com",
    messagingSenderId: "712984703382",
    appId: "1:712984703382:web:8d0c10b9bf4ea42f4a6db7",
    measurementId: "G-58SL61TPNX"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const docRef = doc(db, "plans", "plans");
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
} else {
  console.log("No such document!");
}

document.getElementById("innerTable").innerHTML = `

<thead>
<tr class="price-row ">
    <th scope="col">
        
    <div class="row text-center">    
    
    <div class="col-md-4 text-center align-middle">
    <p>Monthly</p>
    </div>    
    
    <div class="col-md-4 d-flex justify-content-center">
    <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" id="plan-switch">
    </div>
    </div> 
    
    <div class="col-md-4 d-flex justify-content-center">
    <p>Yearly</p>
    </div>
            
    </div>    
    </th>
    <th scope="col" class="text-center align-middle">Basic</th>
    <th scope="col" class="text-center align-middle">Standard</th>
    <th scope="col" class="text-center align-middle">Regular</th>
    <th scope="col" class="text-center align-middle">Premium</th>
</tr>
</thead>
<tbody>
<tr id="pricing"></tr>
<div id="dynamicData">
    <tr>
        <th scope="row">Video Quality</th>
        <td>${docSnap.data()['basic'].video}</td>
        <td>${docSnap.data()['standard'].video}</td>
        <td>${docSnap.data()['regular'].video}</td>
        <td>${docSnap.data()['premium'].video}</td>
        </tr>
        <tr>
        <th scope="row">Resolution</th>
        <td>${docSnap.data()['basic'].resolution}</td>
        <td>${docSnap.data()['standard'].resolution}</td>
        <td>${docSnap.data()['regular'].resolution}</td>
        <td>${docSnap.data()['premium'].resolution}</td>
        </tr>
        <tr>
        <th scope="row">Devices you can watch on</th>
        <td>
        
            <ul style="list-style: none; margin: 0; padding: 0">
                <li>${docSnap.data()['basic'].devices[0]}</li>
            </ul>
        
        </td>
        <td>
            <ul style="list-style: none; margin: 0; padding: 0">
            <li>${docSnap.data()['standard'].devices[0]}</li>
            <li>${docSnap.data()['standard'].devices[1]}</li>
            </ul>
        </td>
        <td>
            <ul style="list-style: none; margin: 0; padding: 0">
            <li>${docSnap.data()['regular'].devices[0]}</li>
            <li>${docSnap.data()['regular'].devices[1]}</li>
            <li>${docSnap.data()['regular'].devices[2]}</li>
            </ul>
        </td>
        <td>
            <ul style="list-style: none; margin: 0; padding: 0">
            <li>${docSnap.data()['premium'].devices[0]}</li>
            <li>${docSnap.data()['premium'].devices[1]}</li>
            <li>${docSnap.data()['premium'].devices[2]}</li>
            </ul>
        </td>
        </tr>
        <tr>

        <tr id="links"></tr>

</div>
</tbody>

`

document.getElementById('links').innerHTML = `
<th scope="row"></th>
<td><button onclick=" window.open('${docSnap.data()['basic']['link']['monthly']}','_blank'); " class="plan-button">Buy Now</button></td>
<td><button onclick=" window.open('${docSnap.data()['standard']['link']['monthly']}','_blank'); " class="plan-button">Buy Now</button></td>
<td><button onclick=" window.open('${docSnap.data()['regular']['link']['monthly']}','_blank'); " class="plan-button">Buy Now</button></td>
<td><button onclick=" window.open('${docSnap.data()['premium']['link']['monthly']}','_blank'); " class="plan-button">Buy Now</button></td>

`;

document.getElementById("pricing").innerHTML = `
<th scope="row">Monthly Price</th>
<td>₹${docSnap.data()['basic'].monthly_price}</td>
<td>₹${docSnap.data()['standard'].monthly_price}</td>
<td>₹${docSnap.data()['regular'].monthly_price}</td>
<td>₹${docSnap.data()['premium'].monthly_price}</td>
</tr>
`;


let changePlan = () => {

if(document.getElementById("plan-switch").value == 'on'){
    document.getElementById("plan-switch").value = 'off'
    document.getElementById("pricing").innerHTML = `
<th scope="row">Yearly Price</th>
<td>₹${docSnap.data()['basic'].yearly_price}</td>
<td>₹${docSnap.data()['standard'].yearly_price}</td>
<td>₹${docSnap.data()['regular'].yearly_price}</td>
<td>₹${docSnap.data()['premium'].yearly_price}</td>
</tr>
`;

document.getElementById('links').innerHTML = `
<th scope="row"></th>
<td><button onclick=" window.open('${docSnap.data()['basic']['link']['yearly']}','_blank'); " class="plan-button">Buy Now</button></td>
<td><button onclick=" window.open('${docSnap.data()['standard']['link']['yearly']}','_blank'); " class="plan-button">Buy Now</button></td>
<td><button onclick=" window.open('${docSnap.data()['regular']['link']['yearly']}','_blank'); " class="plan-button">Buy Now</button></td>
<td><button onclick=" window.open('${docSnap.data()['premium']['link']['yearly']}','_blank'); " class="plan-button">Buy Now</button></td>

`;

}else{
    document.getElementById("plan-switch").value = 'on'
    document.getElementById("pricing").innerHTML = `
    <th scope="row">Monthly Price</th>
    <td>₹${docSnap.data()['basic'].monthly_price}</td>
    <td>₹${docSnap.data()['standard'].monthly_price}</td>
    <td>₹${docSnap.data()['regular'].monthly_price}</td>
    <td>₹${docSnap.data()['premium'].monthly_price}</td>
    </tr>
    `;

    document.getElementById('links').innerHTML = `

    <th scope="row"></th>
    <td><button onclick=" window.open('${docSnap.data()['basic']['link']['monthly']}','_blank'); " class="plan-button">Buy Now</button></td>
    <td><button onclick=" window.open('${docSnap.data()['standard']['link']['monthly']}','_blank'); " class="plan-button">Buy Now</button></td>
    <td><button onclick=" window.open('${docSnap.data()['regular']['link']['monthly']}','_blank'); " class="plan-button">Buy Now</button></td>
    <td><button onclick=" window.open('${docSnap.data()['premium']['link']['monthly']}','_blank'); " class="plan-button">Buy Now</button></td>
    
    
    `;

}
};

document.getElementById("plan-switch").addEventListener("click", changePlan)
