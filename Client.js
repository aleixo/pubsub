module.exports = class Client {
    constructor(name, pubSub) {        
        this.name = name;
        this.pubSub = pubSub;        
    }

    enterGroup(groupname) {               
        if (!this[groupname]) {
            this[groupname] = {}
        }
        
        if(this[groupname].subscriptionId) {
            console.log(`[ALREADY REGISTERED IN GROUP] ${this.name} tried to enter groupd ${groupname}.`);
            return
        }
        this[groupname].subscriptionId = this.pubSub.subscribe(groupname, (data) => {
            console.log(data);
        });    
        console.log(`[ENTERED USER WITH ID -> ${this[groupname].subscriptionId}] ${groupname} -> ${this.name} entered group`)
    }

    leaveGroup(groupname, data = 'Leaving group') {
        this[groupname].subscriptionId = this.pubSub.unsubscribeFromTopic(groupname, this[groupname].subscriptionId);
        this.pubSub.publish(groupname, `[LEAVING] ${this.name} ${data}`);
    }

    sendMessage(groupname, message) {            
        if (!this[groupname].subscriptionId) {
            console.log(`[NOT REGISTERED IN GROUP] ${this.name} tried to send message to ${groupname}.`);
            return;
        }
        this.pubSub.publish(groupname, `[NEW MESSAGE] ${message}`);
    }    
}