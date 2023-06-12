// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.11;

contract Bank {
    mapping(address => bool) Accounts;
    mapping(address => uint256) usersBalance;
    mapping(address => nominee) nomineeInfo;

    struct nominee {
        uint256 _amount;
        address _nominee;
        bool _isAuthorized;
    }

    modifier _isValidOwner() {
        Accounts[msg.sender];
        require(Accounts[msg.sender], "You Don't Have Account");
        _;
    }

    modifier _onlyOwner() {
        require(Accounts[msg.sender], "You'r not owner");
        _;
    }

    function deposit() public payable {
        Accounts[msg.sender] = true;
        usersBalance[msg.sender] += msg.value;
    }

    function getBalance(address _address) public view returns (uint256) {
        return usersBalance[_address];
    }

    function withdrawal(uint256 _amount) public payable _onlyOwner {
        uint256 _balance = usersBalance[msg.sender];
        require(_amount <= _balance, "balance is low");
        payable(msg.sender).transfer(_amount);
        usersBalance[msg.sender] = (_balance - _amount);
    }

    function withdrawalForNominee(
        uint256 _amount,
        address _owner,
        address _nominee
    ) public payable {
        require(_owner != msg.sender, "you are the owner");
        nominee memory nInfo = nomineeInfo[_owner];
        uint256 _balance = usersBalance[_owner];

        require(_nominee == nInfo._nominee, "your are not Nominee");
        require(nInfo._isAuthorized, "you are not authrized");
        require(nInfo._amount >= _amount, "you'r demand is high");
        require(_amount <= _balance, "balance is low");

        payable(msg.sender).transfer(_amount);
        usersBalance[msg.sender] = (_balance - _amount);
    }

    function setNominee(address _nomineeAddress, uint256 _amount)
        public
        _isValidOwner
        returns (address)
    {
        nominee memory _nominee = nominee(_amount, _nomineeAddress, true);
        nomineeInfo[msg.sender] = _nominee;
        return _nomineeAddress;
    }

    function updateNominee(
        address _nomineeAddress,
        uint256 _amount,
        bool _isAuthrized
    ) public _isValidOwner returns (address) {
        nominee memory _nominee = nominee(
            _amount,
            _nomineeAddress,
            _isAuthrized
        );
        nomineeInfo[msg.sender] = _nominee;
        return _nomineeAddress;
    }

    function getNominee() public view returns (nominee memory) {
        return nomineeInfo[msg.sender];
    }
}
