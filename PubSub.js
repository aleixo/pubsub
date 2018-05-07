module.exports = class PubSub {
    constructor() {    
        this.topics = {};                    
    }

    publish(topic, data) {        
        this.topics[topic].forEach( (element,index) => {
            element(`[MEMBER ID - ${index}] ${data}`);
        });
    }

    subscribe(topic, listner) {
        if (!this.topics[topic]) {
            this.topics[topic] = [];
        }        
        this.topics[topic].push(listner);
        return this.topics[topic].length - 1;
    }

    unsubscribeFromTopic(topic, id) {                
        delete this.topics[topic][id];                
        
        if (!this.topics[topic]) {
            this.killtopic(topic);
        }

        return 0;
    }    

    killtopic(topic) {        
        delete this.topics[topic];            
    }
}