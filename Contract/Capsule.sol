pragma solidity ^0.4.18;

contract Capsule{
    address owner;

    function Capsule() public  {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    modifier isAuthentic(uint id,address from_address,address to_address){
        //checks for the owner of medicine
        require(from_address == medicines[id].medicine_owner);

        //checks wether medicine is prescribed by some authentic doctor or he is a chemist
        require(prescribed[to_address][id] != uint(0x0));

        //expiry date needed to be added here
        _;
    }

    modifier isDoctor(address _address){
        require(status[_address]==1);
        _;
    }

    struct Medicine {
        uint uid;
        string name;
        // (yy\mm\dd) => yymmdd
        uint expiry_date;
        address medicine_owner;
        uint amount;
    }

    struct record{
        string doctor_name;
        uint id;
        string description;
    }

    //returns the address is of a doctor/patient/manufacture/chemist
    // doctor = 1
    // chemist = 2
    // patient = 0
    // manufacture = 3
    mapping (address => uint) status;

    //store the data of all medicines
    mapping (uint => Medicine) medicines;

    //medicines which patient can buy
    mapping (address => uint[]) prescribed;

    //stocks availble for chemist
    mapping (address => uint) stock;

    record[] public patient_history1;
    record[] public patient_history2;
    record[] public patient_history3;
    record[] public patient_history4;


    mapping(uint => uint ) medicine_history;

    mapping(string => uint) diseases;

    uint public block_no=3;


    function setStatus(address _address,uint _status) onlyOwner public {
        status[_address]=_status;
    }

    function getStatus(address _address) view public returns(uint) {
        return status[_address];
    }

    // function sell_medicine(uint id,address to_address) public isAuthentic(id, msg.sender, to_address) returns(bool){
    //     medicines[id].medicine_owner = to_address;

    //     //pay ehter
    //     msg.sender.send(medicines[id].amount);
    // }

    function remove(uint[] array, uint index) internal returns(uint[] value) {
        if (index >= array.length) return;

        uint[] memory arrayNew = new uint[](array.length-1);
        for (uint i = 0; i<arrayNew.length; i++){
            if(i != index && i<index){
                arrayNew[i] = array[i];
            } else {
                arrayNew[i] = array[i+1];
            }
        }
        delete array;
        return arrayNew;
    }

    function buy_medicine(uint id,address from_address) public isAuthentic(id,from_address,msg.sender) returns(bool){

        //pay ehter
        // from_address.transfer(medicines[id].amount);

        //change owwner
        medicines[id].medicine_owner = msg.sender;

        // remove rescribed medicine from list
        //        delete prescribed[msg.sender][id];
        remove(prescribed[msg.sender],id);

        medicine_history[id]+=1;

    }

    // add mediciens by manufacture ==> need to send to chemist
    function addMedicine(address _address, uint _uid, string _name,uint _date,uint _amount) public {
        var MedicineT = medicines[_uid];
        MedicineT.uid = _uid;
        MedicineT.name = _name;
        MedicineT.medicine_owner = _address;
        MedicineT.amount = _amount;
        MedicineT.expiry_date = _date;
        //increase stock by 1
        stock[_address]+=1;
    }

    function re_order(address _address, uint _amount,uint med_id)public {
        stock[_address]+=_amount;
    }


    function compareStrings (string a, string b) view returns (bool){
        return keccak256(a) == keccak256(b);
    }

    //medicine to prescribe by doctor
    function prescrib(address _address,uint id,string _doctor,string _description,uint patien_id) isDoctor(msg.sender) public{
        prescribed[_address].push(id);
        // var pr = patient_history1[];
        var pr =record(_doctor,id,_description);
        if (patien_id==1)
            patient_history1.push(pr);
        if (patien_id==2)
            patient_history2.push(pr);
        if (patien_id==3)
            patient_history3.push(pr);
        if (patien_id==4)
            patient_history4.push(pr);

        diseases[_description]+=1;
        block_no+=1;
    }

    // function get_patient_history(uint id) view public returns(record[]){
    //     if (id==1)
    //       return  patient_history1;
    //     if (id==2)
    //         return patient_history2;
    //     if (id==3)
    //         return patient_history3;
    //     if (id==4)
    //         return patient_history4;
    // }

    function get_total_medicine(address _address) view public returns(uint){
        return stock[_address];
    }

    function challenge(uint id,bool _response) view public returns(bool){
        var ans = false;
        if (id==1 && patient_history1.length > 0)
            ans = true;
        if (id==2 && patient_history2.length > 0)
            ans = true;
        if (id==3 && patient_history3.length > 0)
            ans = true;
        if (id==4 && patient_history4.length > 0)
            ans = true;
        return ans == _response;
    }

    function get_disease_history() view public returns(uint,uint,uint){
        return (diseases["m"],diseases["d"],diseases["t"]);
    }
}
