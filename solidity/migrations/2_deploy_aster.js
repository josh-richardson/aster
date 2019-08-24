const Aster = artifacts.require('./Aster.sol')


module.exports = (deployer) => {
    deployer.deploy(Aster);
}