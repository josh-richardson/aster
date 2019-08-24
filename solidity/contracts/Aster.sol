pragma solidity 0.5.8;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "./Campaign.sol";

contract Aster {
    using SafeMath for uint256;

    Campaign[] private campaigns;

    event CampaignStarted(
        address contractAddress,
        address projectStarter,
        string projectTitle,
        string projectDesc,
        uint256 deadline,
        uint256 successUntil,
        uint256 goalAmount
    );

    function startCampaign(
        string calldata title,
        string calldata description,
        uint stages,
        uint durationInDays,
        uint successInDays,
        uint amountToRaise
    ) external {
        uint raiseUntil = now.add(durationInDays.mul(1 days));
        uint successUntil = now.add(durationInDays.mul(1 days) + successInDays.mul(1 days));
        Campaign newCampaign = new Campaign(msg.sender, title, description, stages, raiseUntil, successUntil, amountToRaise);
        campaigns.push(newCampaign);
        emit CampaignStarted(
            address(newCampaign),
            msg.sender,
            title,
            description,
            raiseUntil,
            successUntil,
            amountToRaise
        );
    }                                                                                                                                   

    function getCampaigns() external view returns(Campaign[] memory){
        return campaigns;
    }
}

