const {createPayment} = require("../functions/siwft_api");
module.exports = {
    name: 'buy',
    /**
     * @param message
     * @returns {void}
     * @constructor
     * @type {{name: string, execute(*): void}}
     */ async execute(message) {
        //console.log(message.content);
        // Split the command into 4 pieces. The indicator is , Do it so that also the space is removed EXCEPT if it is in a "string"
        const args = message.content.slice(process.env.PREFIX.length).trim().split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/g);
        // 1. Command, 2. Item, 3. Username, 4. IWAN, 5. Token
        message.delete();
        args[0] = args[0].replace('buy ', '');
        console.log(args)
        if (!args[0] || !args[1] || !args[2] || !args[3]) {
            return message.channel.sendMessage('You need to provide all the arguments!')
        }
        // /buy Product Namr1, Akama Aka, AT, token_sdsds
        const payment = await createPayment(args[0], process.env.IWAN, 1, null, args[3], args[1]);
        console.log(message.author._id);
        if (payment.success) {
            return message.channel.sendMessage(`You have successfully bought ${args[0]}\nTransaction ID: ${payment.id}`).then((msg) => {
                // Delete the Message after 5 seconds
                setTimeout(() => {
                    msg.delete();
                }, 5000)

            });
        } else {
            return message.channel.sendMessage(`<@${message.author._id}>, an error occurred while buying the product`);
        }
    }
}