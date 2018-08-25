class connection {
    constructor(computerConnection, mobileConnection) {
        // should be a computer connction
        this.computer = computerConnection;
        
        // should be a mobile connection
        this.mobile = mobileConnection;

        this.user = "";
    }

    newComputerConnect(newComp) {
        this.computer = newComp;
    }

    newMobileConnect(newMobile) {
        this.mobile = newMobile;
    }

    dropComputer() {
        this.computer = null;
    }

    dropMobile() {
        this.mobile = null;
    }

}

module.exports = connection;