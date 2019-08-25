pragma solidity 0.5.8;
import "@openzeppelin/contracts/math/SafeMath.sol";

contract Campaign {
    using SafeMath for uint256;
    
    enum State {
        Fundraising,
        Funded,
        Failed,
        Successful
    }

    address payable public creator;
    string public title;
    string public description;
    uint256 public currentBalance;
    uint public goal;
    uint public completeAt;

    uint public raiseBy;
    uint public successBy;
    State public state = State.Fundraising;


    uint public totalContributions = 0;
    uint public stages;
    uint256 public balancePerStage;
    mapping (address => uint) public contributions;
    mapping (address => uint) public votes;
    uint public agrees = 0;
    uint public currentStage = 1;

    event FundingReceived(address contributor, uint amount, uint currentTotal);
    event CreatorPaidStage(address recipient);

    modifier inState(State _state) {
        require(state == _state);
        _;
    }

    modifier isCreator() {
        require(msg.sender == creator);
        _;
    }

    constructor
    (
        address payable _creator,
        string memory _title,
        string memory _description,
        uint _stages,
        uint _raiseBy,
        uint _successBy,
        uint _goal
    ) public {
        creator = _creator;
        title = _title;
        description = _description;
        stages = _stages;
        goal = _goal;
        successBy = _successBy;
        raiseBy = _raiseBy;
        agrees = 0;
    }

    function contribute() external inState(State.Fundraising) payable {
        require(msg.sender != creator);
        require(msg.value >= goal / 100);
        if (contributions[msg.sender] == 0) {
            totalContributions += 1;
        }
        contributions[msg.sender] = contributions[msg.sender].add(msg.value);
        currentBalance = currentBalance.add(msg.value);
        emit FundingReceived(msg.sender, msg.value, currentBalance);
        checkFunded();
    }

    function checkFunded() public {
        if (currentBalance >= goal) {
            balancePerStage = currentBalance.div(stages);
            state = State.Funded;
        } else if (now > raiseBy)  {
            state = State.Failed;
        }
        completeAt = now;
    }


    function vote() external inState(State.Funded) {
        if (now > successBy) {
            state = State.Failed;
            revert();
        }
        require(msg.sender != creator);
        require(contributions[msg.sender] > 0);
        require(votes[msg.sender] != currentStage);

        votes[msg.sender] = currentStage;
        agrees += 1;
        if (agrees >= totalContributions / 2) {
            agrees = 0;
            payStage();
            if (currentStage == stages) {
                state = State.Successful;
            } else {
                currentStage += 1;
            }
        }
    }

    function payStage() internal inState(State.Funded) returns (bool) {
        uint256 totalRaised = currentBalance;
        currentBalance = currentBalance.sub(balancePerStage);
        if (creator.send(balancePerStage)) {
            emit CreatorPaidStage(creator);
            return true;
        } else {
            currentBalance = totalRaised;
            state = State.Successful;
        }
        return false;
    }

    function getRefund() public inState(State.Failed) returns (bool) {
        require(contributions[msg.sender] > 0);
        uint256 amountToRefund;
        if (currentStage == 1) {
            amountToRefund = contributions[msg.sender];
        } else {
            amountToRefund = contributions[msg.sender] - (stages / currentStage * contributions[msg.sender]);
        }

        contributions[msg.sender] = 0;
        if (!msg.sender.send(amountToRefund)) {
            contributions[msg.sender] = amountToRefund;
            return false;
        } else {
            currentBalance = currentBalance.sub(amountToRefund);
        }

        return true;
    }



    function getProperties() external view returns
    (
        address payable _creator,
        string memory _title,
        string memory _description,
        uint256 _stages,
        uint256 _currentStage,
        uint256 _raiseBy,
        uint256 _successBy,
        State _state,
        uint256 _currentBalance,
        uint256 _goal
    ) {
        _creator = creator;
        _title = title;
        _description = description;
        _stages = stages;
        _currentStage = currentStage;
        _raiseBy = raiseBy;
        _successBy = successBy;
        _state = state;
        _currentBalance = currentBalance;
        _goal = goal;
    }
}
