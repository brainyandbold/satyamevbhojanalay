const items = [];
function costumizeSelect(itemName)
{   
    if(itemName=='bottle'){

        const selectQuantity=document.getElementById(`${itemName}`);
        selectQuantity.style.display = "block";
        const quantity=document.getElementById(`${itemName}-quantity`);
        quantity.value=1;
        const addBtn=document.getElementById(`${itemName}-select`);
        addBtn.style.display='none';
    }
    else{
        showcustomizationModal(itemName);
    }
}
function showcustomizationModal(itemName){
    const customizationModal =document.getElementById('customizationModal');
    customizationModal.style.display='block';
    if(itemName=="half-rice-plate" || itemName=="full-rice-plate"){

        customizationModal.innerHTML=`<div class="modal-content">
        <span class="close" onclick="closecustomizationModal()">&times;</span>
        <h2>Customize Your Item</h2>
        <form id="customizationForm-${itemName}">
        <label>
        <input type="radio" name="${itemName}-option" value="bengan"> Bengan
        </label>
        <br>
        <label>
        <input type="radio" name="${itemName}-option" value="matar"> Matar
        </label>
        <br>
        <button type="button" onclick="applycustomizationModal('${itemName}')">Save</button>
        </form>
        </div>`;
       
    }
    else if(itemName=='chapati'){
        
        customizationModal.innerHTML=`<div class="modal-content">
        <span class="close" onclick="closecustomizationModal()">&times;</span>
        <h2>Customize Your Item</h2>
        <form id="customizationForm-${itemName}">
        <label>
        <input type="radio" name="${itemName}-option" value="oil"> Oil
        </label>
        <br>
        <label>
        <input type="radio" name="${itemName}-option" value="without-oil"> Without Oil
        </label>
        <br>
        <button type="button" onclick="applycustomizationModal('${itemName}')">Save</button>
        </form>
        </div>`
    }
    else{
        return none;
    }
}
function closecustomizationModal(){
    const customizationModal =document.getElementById('customizationModal');
    customizationModal.style.display='none';
    
}
function applycustomizationModal(itemName){
    
    var selectedOption = document.querySelector(`input[name="${itemName}-option"]:checked`);
    if(selectedOption){

        const full_subji=document.getElementById(`${itemName}-selected`);
        full_subji.innerHTML=`${selectedOption.value}`;
        closecustomizationModal();
        
        const selectQuantity=document.getElementById(`${itemName}`);
        selectQuantity.style.display = "block";
        const quantity=document.getElementById(`${itemName}-quantity`);
        quantity.value=1;
        const addBtn=document.getElementById(`${itemName}-select`);
        addBtn.style.display='none';
    }
    else{
        alert("please Select option!")
    }

}
function increaseQuantity(itemName){
    const quantity = document.getElementById(`${itemName}-quantity`)
    if (quantity) {
        let currentValue = parseInt(quantity.value, 10);
        quantity.value = currentValue + 1;
    }
}
function decreaseQuantity(itemName) {
    const quantity = document.getElementById(`${itemName}-quantity`);
    if (quantity) {
        let currentValue = parseInt(quantity.value, 10);
        if (currentValue > 0) {
            quantity.value = currentValue - 1;
        }
    }
}


function placeOrder() {
    // Gather selected items, quantities, and customizations
    
   
    // Full Rice Plate
    const fullRicePlateQuantity = document.getElementById('full-rice-plate-quantity').value;
    const fullRicePlateSubji = document.getElementById('full-rice-plate-selected').innerHTML;
    if(fullRicePlateQuantity>0){

        items.push({
            name: 'Full Rice Plate',
            quantity: fullRicePlateQuantity,
            subji: fullRicePlateSubji
        });
    }

    // Half Rice Plate
    const halfRicePlateQuantity = document.getElementById('half-rice-plate-quantity').value;
    const halfRicePlateSubji = document.getElementById('half-rice-plate-selected').innerHTML;
    if(halfRicePlateQuantity>0){

        items.push({
            name: 'Half Rice Plate',
            quantity: halfRicePlateQuantity,
            subji: halfRicePlateSubji
        });
    }
        
    // Chapati
    const chapatiQuantity = document.getElementById('chapati-quantity').value;
    const chapatiCustomization = document.getElementById('chapati-selected').innerHTML;
    if(chapatiQuantity>0){

        items.push({
            name: 'Chapati',
            quantity: chapatiQuantity,
            customization: chapatiCustomization
        });
    }

    // Water Bottle
    const bottleQuantity = document.getElementById('bottle-quantity').value;
    if(bottleQuantity>0){

        items.push({
            name: 'Water Bottle',
            quantity: bottleQuantity
        });
    }
        // Display confirmation modal
    showConfirmationModal(items);
}

function showConfirmationModal(items) {
    if (items.length>0) {
        
        const confirmationModal = document.getElementById('confirmationModal');
        const modalContent = document.getElementById('modalContent');
        
        // Clear previous content
         modalContent.innerHTML = '';
    
        // Populate modal with order details
        items.forEach(item => {
            modalContent.innerHTML += `<p>${item.quantity}x ${item.name} ${item.subji ? `- ${item.subji}` : ''} ${item.customization ? `- ${item.customization}` : ''}</p>`;
        });
    
        // Add buttons to confirm or cancel the order
        modalContent.innerHTML += `
        <button onclick="confirmOrder()">Confirm</button>
        <button onclick="cancelOrder()">Cancel</button>
        `;
    
        // Show the confirmation modal
        confirmationModal.style.display = 'block';
    } 
    else {
        alert("select something before placing the order")
    }
}
const savedUserInfo = localStorage.getItem('userDetails');
if (savedUserInfo) {
    const userInfo = JSON.parse(savedUserInfo);
    document.getElementById('initialName').value = userInfo.name;
    document.getElementById('initialNumber').value = userInfo.number;
    document.getElementById('initialAddress').value = userInfo.address;
    document.getElementById('initialBuilding').value = userInfo.building;
    document.getElementById('initialFlat').value = userInfo.flat;
}
function confirmOrder() {
    // Handle the confirmed order (you can send the order to a server, store in a database, etc.)
    // For now, let's just log the order to the console
    console.log('Order confirmed:', items);

    
    const name = document.getElementById('initialName').value;
    const number = document.getElementById('initialNumber').value;
    const address = document.getElementById('initialAddress').value;
    const building = document.getElementById('initialBuilding').value;
    const flatNumber = document.getElementById('initialFlat').value;
    const orderDetails = items;

    const userInfo = {
        name: name,
        number: number,
        address: address,
        building: building,
        flatNumber: flatNumber,
    };
    console.log(userInfo);
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    const orderData = {
        name: name,
        number: number,
        address: address,
        building: building,
        flatNumber: flatNumber,
        order: orderDetails,
    };

    fetch('/place_order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
    })
    .then(response => response.json())
    .then(data => {
        alert("Order placed successfully!");
    })
    .catch(error => {
        console.error('Error placing order:', error);
        alert("Error placing order. Please try again.");
    });
    // Reset the quantity inputs
    document.getElementById('full-rice-plate-quantity').value = 0;
    document.getElementById('half-rice-plate-quantity').value = 0;
    document.getElementById('chapati-quantity').value = 0;
    document.getElementById('bottle-quantity').value = 0;

    // Reset the selected item display
    document.getElementById('full-rice-plate-selected').innerHTML = '';
    document.getElementById('half-rice-plate-selected').innerHTML = '';
    document.getElementById('chapati-selected').innerHTML = '';

    // Show the add buttons and hide the quantity inputs
    showAddButtons();
    // Reset the order array for the next order
    items.length = 0;

    // Close the confirmation modal
    closeConfirmationModal();
}

function showAddButtons() {
    const items = ['full-rice-plate', 'half-rice-plate', 'chapati', 'bottle'];

    items.forEach(item => {
        const quantityInput = document.getElementById(`${item}`);
        const addBtn = document.getElementById(`${item}-select`);

        if (quantityInput && addBtn) {
            quantityInput.style.display = 'none';
            addBtn.style.display = 'block';
        }
    });
}
function cancelOrder() {
    // Reset the order array
    // Reset the quantity inputs
    document.getElementById('full-rice-plate-quantity').value = 0;
    document.getElementById('half-rice-plate-quantity').value = 0;
    document.getElementById('chapati-quantity').value = 0;
    document.getElementById('bottle-quantity').value = 0;

    // Reset the selected item display
    document.getElementById('full-rice-plate-selected').innerHTML = '';
    document.getElementById('half-rice-plate-selected').innerHTML = '';
    document.getElementById('chapati-selected').innerHTML = '';

    // Show the add buttons and hide the quantity inputs
    showAddButtons();
    items.length = 0;

    // Close the confirmation modal
    closeConfirmationModal();
}

function closeConfirmationModal() {
    const confirmationModal = document.getElementById('confirmationModal');
    confirmationModal.style.display = 'none';
}

// Add a function to show the initial form when the page loads
window.onload = function () {
    const savedDetails = getSavedDetails();
    console.log(savedDetails);
    if (!savedDetails) {
        showInitialFormModal();
    }
};

function showInitialFormModal() {
    const initialFormModal = document.getElementById('initialFormModal');
    initialFormModal.style.display = 'block';
}

// Add a function to save the initial details to local storage
function saveInitialDetails() {
    const name = document.getElementById('initialName').value;
    const number = document.getElementById('initialNumber').value;
    const address = document.getElementById('initialAddress').value;
    const flat = document.getElementById('initialFlat').value;
    const building = document.getElementById('initialBuilding').value;

    // Save the details to local storage
    const details = {
        name: name,
        number: number,
        address: address,
        flat: flat,
        building: building,
    };

    localStorage.setItem('userDetails', JSON.stringify(details));

    // Close the initial form modal
    closeInitialFormModal();
}

function getSavedDetails() {
    const savedDetails = localStorage.getItem('userDetails');
    return savedDetails ? JSON.parse(savedDetails) : null;
}

function closeInitialFormModal() {
    const initialFormModal = document.getElementById('initialFormModal');
    initialFormModal.style.display = 'none';
}
