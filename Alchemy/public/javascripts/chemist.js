document.getElementById("total_medicines").innerHTML = Capsule.get_total_medicine(web3.eth.accounts[1]);

$(".buy-medicine-button").click(function () {

    var medicineType = document.getElementById("medicineType").value;
    var quantity = parseInt(document.getElementById("medicineQuantity").value);
    console.log(quantity);
    Capsule.re_order(web3.eth.accounts[1],quantity,parseInt(medicineType));

    $("#buyMedicineModal").modal("hide");
})

//add re_order function to inventry and expired medicines
