module.exports = (sequelize, Sequelize) => {
    const Message = sequelize.define('message', {
        userId: {
            type: Sequelize.INTEGER
        },
        text: {
            type: Sequelize.STRING
        }
	});

	return Message;
}